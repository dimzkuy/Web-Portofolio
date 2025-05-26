/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import AOS from "aos";
import "aos/dist/aos.css";

export default function Portfolio() {
  const texts = useMemo(() => ["Dimas Cahyo Margono", "a Student", "a Software Engineer"], []);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Inisialisasi AOS
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] font-poppins">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20" data-aos="fade-down">
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
        <div className="w-full max-w-4xl" data-aos="fade-up">
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
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] text-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          <h2 className="text-4xl font-bold mb-8 text-center" data-aos="fade-up">
            About Me
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6" data-aos="fade-up" data-aos-delay="200">
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
            <div className="lg:w-1/2 flex justify-center" data-aos="fade-up" data-aos-delay="400">
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-full shadow-lg flex items-center justify-center">
                <img
                  src="/assets/img/PDD_Dimas Cahyo Margono.jpg"
                  alt="Profile Photo"
                  className="w-80 h- lg:w-100 lg:h-100 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Styles */}
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
  );
}
