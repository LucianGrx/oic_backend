const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const Subscriber = require("./models/Subscriber");
const fs = require("fs");
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.TOKEN_SECRET;



const corsOptions = (req, callback) => {
  const allowedOrigins = [process.env.APP_API_URL || "https://mern-oic-app.onrender.com"];
  const origin = req.header('Origin');
  const corsOptions = {
    origin: allowedOrigins.includes(origin) ? origin : false,
    credentials: true,
  };
  callback(null, corsOptions);
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.APP_API_URL || "https://mern-oic-app.onrender.com");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Conectat cu succes la serverul MongoDB");
});

db.on("error", (error) => {
  console.error("Eroare la conectarea la serverul MongoDB:", error);
});

db.on("disconnected", () => {
  console.log("Deconectat de la serverul MongoDB");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });

  // Verifică dacă userDoc nu este null
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // Utilizatorul este autentificat
      jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  } else {
    // Niciun utilizator găsit
    res.status(400).json("user not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findById(info.id);
    res.json({ ...info, isApproved: user.isApproved });
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json({ success: true });
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;

    const user = await User.findById(info.id);
    if (!user.isApproved) {
      return res.status(403).json("User not approved");
    }

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("Nu esti autorul postarii!");
    }

      // Update the fields
  postDoc.title = title;
  postDoc.summary = summary;
  postDoc.content = content;
  postDoc.cover = newPath ? newPath : postDoc.cover;

  // Save the changes
  await postDoc.save();

  res.json(postDoc);
});
});

app.get("/post", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;

  const postsQuery = Post.find()
    .populate("author", "username")
    .sort({ createdAt: -1 });

  if (limit > 0) {
    postsQuery.limit(limit);
  }

  const posts = await postsQuery.exec();

  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res
        .status(400)
        .json({ message: "E-mailul este deja înregistrat." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).json({ message: "Te-ai abonat cu succes la newsletter!" });
  } catch (error) {
    console.error("Eroare la abonare:", error);
    res
      .status(500)
      .json({ message: "A apărut o eroare. Te rugăm să încerci din nou." });
  }
});

app.listen(4000, console.log("This server is hosted on port 4000"));
