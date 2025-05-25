/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#141548]">
      {/* Navigation dengan Glassmorphism */}
      <nav className="bg-white/20 backdrop-blur-md border-b border-white/0 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              My Portofolio
            </div>
            <div className="hidden md:flex space-x-12">
              <Link href="#home" className="font-semibold transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
                Home
              </Link>
              <Link href="#about" className="font-semibold transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
                About
              </Link>
              <Link href="#projects" className="font-semibold transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
                My Projects
              </Link>
              <Link href="#contact" className="font-semibold transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Fade Up Animation */}
      <section id="home" className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-16 py-16">
          {/* Foto Profil dengan animasi */}
          <div 
            className="flex-shrink-0 lg:w-1/3 flex justify-center animate-fadeUp"
            style={{ 
              animationDuration: '1s',
              animationFillMode: 'both'
            }}
          >
            <div className="rounded-full overflow-hidden border-4 border-white w-64 h-64 bg-[#EFEFEF] flex items-center justify-center">
              <img
                src="assets/img/PDD_Dimas Cahyo Margono.JPG"
                alt="Dimas Cahyo Margono"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Konten dengan animasi delay */}
          <div 
            className="flex-1 text-center lg:text-left lg:w-2/3 animate-fadeUp" 
            style={{ 
              animationDuration: '1s',
              animationDelay: '0.3s',
              animationFillMode: 'both'
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Hi! Welcome to My <br />
              Personal Portfolio
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 max-w-2xl">
              My Name is Dimas Cahyo Margono. I&apos;m a student majoring in Software Engineering at Telkom University Purwokerto. My hobby is playing games and listening to music.
            </p>
          </div>
        </div>
      </section>
      {/* Section lainnya tetap seperti sebelumnya */}

      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation-name: fadeUp;
        }
      `}</style>
    </div>
  )
}
