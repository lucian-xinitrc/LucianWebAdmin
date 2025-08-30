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
    <section className="dark:bg-gray-950 bg-white h-screen content-center justify-center py-20">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">{!isLoggedIn ? "Lucian Web Services Admin" : ""}</h2>
      <div className="bg-transparent px-5 py-10 mx-5 sm:mx-[30%] sm:w-auto  rounded-lg">
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">{!isLoggedIn ? "Login" : "DashBoard"}</h2>
      <div>
        
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="mb-5 flex justify-center font-bold">

            <input type="password"
              placeholder="Introdu parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"aria-describedby="helper-text-explanation" class="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 p-6 sm:px-5 sm:w-auto text-[20px] sm:w-2xl w-[150px] focus:outline-none" placeholder="key" />
            <button type="submit" className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 p-6 sm:px-5 w-auto sm:w-2xl md:w-[158px] mx-2 text-[20px]">
              Login
            </button>
          </form>
        ) : (
          <div className="bg-transparent sm:flex sm:justify-center mx-0 p-0 h-full sm:h-full sm:mx-[10%] text-white rounded-lg sm:no-scrollbar">
            <div class="max-w-sm p-10 mx-10 h-auto bg-white content-center  border border-solid border-black/[.20] dark:border-white/[.100] rounded-lg dark:bg-transparent dark:border-gray-700">
                <a>
                    <h5 class="text-2xl font-bold text-gray-900 dark:text-white">Traffic Analytics for lucianws.com and mebhevy.com</h5>
                </a>
                <p class="font-normal text-gray-700 dark:text-gray-400">Here will appear here</p>
            </div>

            <div className="">
                <h5 class="mb-2 pt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Latest Requests</h5>

                {selectedIdx === null && (
                  <div className="flex flex-col gap-5 mb-2 py-5 sm:w-2xl mx-5 my-2 sm:my-2 overflow-scroll h-60 sm:h-40 no-scrollbar">

                    {requests.map((req, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className="py-2 bg-transparent text-center bg-black transition duration-700 ease-in-out hover:bg-gray-900 hover:text-white text-black dark:text-white rounded-full border border-solid border-black/[.20] dark:border-white/[.100]"
                      >
                        {req.subject || `Request ${idx + 1}`}

                      </button>
                    ))}
                  </div>
                )}
                {selectedIdx !== null && (
                  <div className="w-full sm:w-2xl md:w-2xs lg:w-2xl p-5 border border-solid border-black/[.20] dark:border-white/[.145] shadow-sm dark:bg-transparent dark:border-gray-700 sm:no-scrollbar rounded-lg">
                      <a>
                          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">{requests[selectedIdx].subject}</h5>
                      </a>
                      <div className="flex justify-center">
                        <span class="bg-blue-100 text-blue-800 shadow-xl/10 text-sm font-medium px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300 p-5 m-5 pb-0">{requests[selectedIdx].created}</span>
                      </div>
                      <textarea className="h-auto dark:bg-gray-900 mt-0 mb-5 p-5 rounded-lg shadow-xl/10 dark:shadow-xl/10 font-normal text-gray-700 dark:text-gray-400 w-full sm:no-scrollbar focus:outline-none" disabled>{requests[selectedIdx].message}</textarea>
                      
                      <div className="flex justify-center">
                        <button
                          onClick={() => setSelectedIdx(null)}
                          className="md:mx-5 sm:mx-3 rounded-full px-10 text-black hover:text-white hover:bg-black shadow-xl/10 border border-solid border-black/[.07] dark:border-white/[.145] transition duration-700 ease-in-out dark:hover:bg-white dark:hover:text-black transition-colors dark:text-white flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-auto sm:w-2xl md:w-[158px]"
                          >Close</button>
                      </div>

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
