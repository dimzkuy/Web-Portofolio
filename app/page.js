/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"

export default function Portfolio() {
  const texts = useMemo(() => ["Dimas Cahyo Margono", "a Student", "a Software Engineer"], [])
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const typingSpeed = 100
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex]
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1))

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 800)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }
    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, textIndex, texts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] font-poppins">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
            My Portofolio
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="font-regular transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
              Home
            </Link>
            <Link href="#about" className="font-regular transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
              About
            </Link>
            <Link href="#projects" className="font-regular transition-colors hover:text-[#1518C6]" style={{ color: "#FFFFFF" }}>
              My Projects
            </Link>
            <Link
              href="#contact"
              className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Contact Me
            </Link>
          </div>

          {/* Mobile Menu (Hamburger Icon) */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Links (Mobile) */}
        {isMenuOpen && (
          <div className="flex flex-col items-center text-center space-y-4 md:hidden mt-2 slideDown">
            <Link
              href="#home"
              className="font-regular transition-colors hover:text-[#1518C6] text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="font-regular transition-colors hover:text-[#1518C6] text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#projects"
              className="font-regular transition-colors hover:text-[#1518C6] text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              My Projects
            </Link>
            {/* Ubah ke gaya sama dengan menu lain */}
            <Link
              href="#contact"
              className="font-regular transition-colors hover:text-[#1518C6] text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Me
            </Link>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Hi, I&apos;m{" "}
            <span className="text-white">{texts[textIndex].substring(0, charIndex)}</span>
            <span className="typeCursor" />
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            I&apos;m a Software Engineering student passionate about creating modern, functional, and user-centered digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="flex items-center justify-center bg-white text-[#1518C6] px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              View Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <a
              href="https://instagram.com/dmzmrgno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition hover:text-[#6A5ACD] instagram-link"
            >
              <img
                src="/assets/icons/instagram-white-icon.svg"
                alt="Instagram"
                className="h-6 w-6 transition-all duration-300 instagram-img"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/dimascahyomargono/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6A5ACD] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0H5C2.25 0 0 2.25 0 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5V5c0-2.75-2.25-5-5-5zM7.5 20.5H4V9h3.5v11.5zM5.75 7.5c-1.05 0-1.75-.7-1.75-1.75S4.7 4 5.75 4s1.75.7 1.75 1.75S6.8 7.5 5.75 7.5zM20.5 20.5h-3.5V14c0-1.55-.55-2.6-1.95-2.6-1.05 0-1.65.7-1.9 1.35-.1.25-.1.6-.1.95v6.8H10V9h3.35v1.55c.45-.7 1.25-1.7 3.05-1.7 2.2 0 3.85 1.45 3.85 4.55v7.1z" />
              </svg>
            </a>
            <a
              href="https://github.com/dimzkuy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6A5ACD] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.263.793-.587v-2.17c-3.338.725-4.037-1.613-4.037-1.613-.547-1.387-1.338-1.75-1.338-1.75-1.087-.75.087-.725.087-.725 1.2.087 1.837 1.238 1.837 1.238 1.075 1.837 2.812 1.3 3.5.987.113-.775.425-1.3.775-1.6-2.662-.3-5.462-1.337-5.462-5.962 0-1.312.462-2.387 1.2-3.237-.113-.3-.525-1.5.113-3.112 0 0 1-.325 3.3 1.237.95-.263 1.975-.387 3-.387s2.05.125 3 .387c2.3-1.562 3.3-1.237 3.3-1.237.637 1.612.225 2.812.113 3.112.75.85 1.2 1.925 1.2 3.237 0 4.637-2.8 5.662-5.462 5.962.437.375.825 1.112.825 2.237v3.312c0 .325.187.7.8.587C20.562 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com/dimzkuyy_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#6A5ACD] transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] text-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>

          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2 space-y-6">
              <p>
                I&apos;m a passionate full-stack developer with over 5 years of experience building web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.
              </p>
              <p>
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying the great outdoors. I believe in continuous learning and staying up-to-date with the latest industry trends.
              </p>
              <p>
                My expertise spans across modern JavaScript frameworks, backend technologies, and cloud platforms. I&apos;m particularly passionate about creating performant, accessible, and user-friendly applications.
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-full shadow-lg flex items-center justify-center">
                <img
                  src="/assets/img/PDD_Dimas Cahyo Margono.jpg"
                  alt="Profile Photo"
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Projects */}
            <div>
              <div className="text-4xl font-bold text-[#E0E7FF]">50+</div>
              <div className="text-white/80">Projects</div>
            </div>
            {/* Years Experience */}
            <div>
              <div className="text-4xl font-bold text-[#C7D2FE]">5+</div>
              <div className="text-white/80">Years Experience</div>
            </div>
            {/* Responsive */}
            <div>
              <div className="text-4xl font-bold text-green-400">100%</div>
              <div className="text-white/80">Responsive</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }

        .typeCursor {
          display: inline-block;
          width: 1px;
          height: 1.2em;
          margin-left: 3px;
          background-color: #fff;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Tambahkan animasi turun */
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        /* Efek hover khusus untuk ikon Instagram (gambar) */
        .instagram-link:hover .instagram-img {
          filter: invert(47%) sepia(70%) saturate(534%) hue-rotate(219deg) brightness(95%) contrast(92%);
        }
      `}</style>
    </div>
  )
}
