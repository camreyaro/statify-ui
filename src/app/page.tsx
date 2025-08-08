'use client'

import Image from "next/image";

export default function Home() {
  function handleLogin() {
    console.log("logging into spotify...")
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative w-full h-[300px]">
          <Image
            className="dark:invert rounded-xl"
            src="/logo.png"
            alt="Statify logo"
            fill
            priority
          /> 
        </div>
        <button onClick={handleLogin} className="px-40 py-4 bg-stone-600 flex flex-wrap gap-2 text-white rounded-xl hover:bg-stone-700">
          Login with Spotify <Image
          className="dark:invert"
          src="/spotify.png"
          alt="Statify logo"
          width={25}
          height={20}
          priority
        />
        </button>
      </main>
      <footer className="row-start-3 flex flex-wrap gap-1 items-center justify-center">
        Made with 💜 by <a
          className="hover:underline hover:underline-offset-4"
          href="https://github.com/camreyaro"
          target="_blank"
          rel="noopener noreferrer"
        >@camreyaro
         </a>
      </footer>
    </div>
  );
}
