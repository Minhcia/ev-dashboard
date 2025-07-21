import React from "react";

export default function LoginMain() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181A20] via-[#23262F] to-[#1DE782]">
      <div className="bg-[#181A20]/80 rounded-3xl shadow-2xl flex w-[900px] max-w-full overflow-hidden">
        {/* Left: Content */}
        <div className="flex-1 flex flex-col justify-center p-12 gap-8">
          <div className="text-4xl font-bold text-white mb-2">Connect and collaborate!</div>
          <div className="text-[#B0B3B8] mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
          <button className="bg-gradient-to-r from-[#1DE782] to-[#23262F] text-[#181A20] font-semibold rounded-xl px-8 py-3 shadow-lg hover:from-[#23262F] hover:to-[#1DE782] transition">Get Started</button>
        </div>
        {/* Right: Illustration & Form */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#23262F]/80 p-10 relative">
          {/* Placeholder for illustration */}
          <div className="w-72 h-72 rounded-full bg-gradient-to-br from-[#1DE782]/40 to-[#23262F]/60 absolute -top-20 left-1/2 -translate-x-1/2 blur-2xl opacity-60" />
          <div className="w-60 h-60 flex items-center justify-center mb-8 z-10">
            {/* Bạn có thể thay thế bằng hình ảnh minh họa thực tế nếu có */}
            <span className="text-7xl">📱</span>
          </div>
          {/* Login Form */}
          <form className="w-full max-w-xs flex flex-col gap-4 z-10">
            <input className="bg-[#181A20] rounded-lg px-4 py-3 text-white placeholder:text-[#B0B3B8] focus:outline-none focus:ring-2 focus:ring-[#1DE782]" placeholder="Email" type="email" />
            <input className="bg-[#181A20] rounded-lg px-4 py-3 text-white placeholder:text-[#B0B3B8] focus:outline-none focus:ring-2 focus:ring-[#1DE782]" placeholder="Password" type="password" />
            <button type="submit" className="bg-gradient-to-r from-[#1DE782] to-[#23262F] text-[#181A20] font-semibold rounded-xl px-8 py-3 mt-2 shadow-lg hover:from-[#23262F] hover:to-[#1DE782] transition">Login</button>
            <div className="text-center text-[#B0B3B8] text-sm mt-2">Don't have an account? <a href="#" className="text-[#1DE782] hover:underline">Register</a></div>
          </form>
        </div>
      </div>
    </div>
  );
} 