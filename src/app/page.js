'use client'
import Image from "next/image";
import { useState,useEffect } from 'react';
import './globals.css';

export default function Home() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expanded, setExpanded] = useState({});

  const toggleCard = (idx) => {
    setExpanded(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };
  const secretKey = "12021908";

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === secretKey) {
      setIsLoggedIn(true);
    } else {
      alert("Wrong key");
    }
  };

  const [requests, setRequests] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null); // indexul cardului selectat

  const fetchRequests = async () => {
    const res = await fetch("/api/requests");
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-950 h-screen content-center justify-center">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">Lucian Web Services Admin App</h2>
      <div className="bg-transparent rounded-none p-5 mx-5 shadow-xl/30 rounded-lg ">
      <div>
        
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="mb-5 flex justify-center font-bold">

            <input type="password"
              placeholder="Introdu parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"aria-describedby="helper-text-explanation" class="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto sm:w-2xl w-[150px] focus:outline-none" placeholder="key" />
            <button type="submit" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-auto sm:w-2xl md:w-[158px] mx-5">
              Login
            </button>
          </form>
        ) : (
          <div className="bg-transparent mx-0 p-0 h-full sm:mx-[20%] shadow-xl/30 text-white rounded-none sm:no-scrollbar">
            <div>
          
                {selectedIdx === null && (
                  <div className="flex flex-col gap-5 mb-2 overflow-scroll h-40 no-scrollbar">
                  
                    {requests.map((req, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className="text-left px-4 py-2 bg-transparent hover:bg-transparent text-white rounded-none border border-solid border-black/[.08] dark:border-white/[.145]"
                      >
                        {req.subject || `Request ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                )}
                {selectedIdx !== null && (
                  <div className="w-auto p-6 border border-solid border-black/[.08] dark:border-white/[.145] shadow-sm dark:bg-transparent dark:border-gray-700 sm:no-scrollbar">
                      <a>
                          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{requests[selectedIdx].subject}</h5>
                      </a>
                      <textarea className="mb-3 h-auto m-2 font-normal text-gray-700 dark:text-gray-400 sm:no-scrollbar">{requests[selectedIdx].message}</textarea>
                      <textarea class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 w-48 h-5 overflow-scroll no-scrollbar">{requests[selectedIdx].created}</textarea>
                      <button
                        onClick={() => setSelectedIdx(null)}
                        className="md:mx-5 sm:mx-3 rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-auto sm:w-2xl md:w-[158px]"
                        >Close</button>

                  </div>
         
                )}
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
  );
}
