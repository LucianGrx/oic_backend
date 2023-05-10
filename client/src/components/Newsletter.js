import { useState } from "react";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/subscribe", { email });
      setMessage(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("A apărut o eroare. Te rugăm să încerci mai tarziu.");
      }
    }
  };

  return (
    <section className="mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative bg-purple-600 py-10 px-8 md:py-16 md:px-12">
          <div
            className="absolute right-0 top-0 -ml-40 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              width="238"
              height="110"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="illustration-04"
                  x1="369.483"
                  y1="-84.633"
                  x2="139.954"
                  y2="-199.798"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" stopOpacity=".01" />
                  <stop offset="1" stopColor="#fff" stopOpacity=".24" />
                </linearGradient>
              </defs>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="1"
                fill="url(#illustration-04)"
              />
            </svg>
          </div>

          <div className="relative flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-1/2">
              <h3 className="text-3xl font-bold text-white mb-2">
                Rămâneți la curent
              </h3>
              <p className="text-purple-200 text-lg">
                Înscrieți-vă la newsletter-ul nostru pentru a primi știri de top
                înaintea tuturor celorlalți
              </p>
            </div>

            <form className="w-full lg:w-1/2" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                <input
                  type="email"
                  className="w-full appearance-none bg-purple-700 border border-purple-500 focus:border-purple-300 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-purple-400"
                  placeholder="Your best email…"
                  aria-label="Your best email…"
                  value={email}
                  onChange={handleChange}
                />
                <button
                  className="btn text-purple-600 p-3 bg-purple-100 hover:bg-white shadow"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-white">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
