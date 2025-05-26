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
          I am a software engineering student with a passion for cybersecurity and network system administration.
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
              href="https://github.com/dimzkuy"
              className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              data-aos="fade-up"
              data-aos-delay="400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="mr-2"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-[80vh] py-16 bg-white text-[#1518C6] scroll-mt-[80px]" // Atur tinggi minimum dan scroll margin
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#1518C6] to-[#6A5ACD]"
            data-aos="fade-up"
          >
            About Me
          </h2>

          {/* Content */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Text Content */}
            <div
              className="lg:w-1/2 space-y-4 text-sm md:text-base"
              data-aos="fade-up"
              data-aos-delay="200"
            >
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
            <div
              className="lg:w-1/2 flex justify-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-full shadow-lg flex items-center justify-center">
                <img
                  src="/assets/img/PDD_Dimas Cahyo Margono.jpg"
                  alt="Profile Photo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-16 bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] text-white"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          {/* Heading */}
          <h2
            className="text-4xl font-bold mb-8 text-center"
            data-aos="fade-up"
          >
            Tools
          </h2>

          {/* Scrolling Logos */}
          <div className="overflow-hidden">
            <div
              className="flex items-center gap-12 animate-scroll"
              style={{ whiteSpace: "nowrap" }}
            >
              {/* Logo Items */}
              <img src="/assets/icons/HTML.svg" alt="HTML" className="h-16 w-16" />
              <img src="/assets/icons/CSS.svg" alt="CSS" className="h-16 w-16" />
              <img src="/assets/icons/JavaScript.svg" alt="JavaScript" className="h-16 w-16" />
              <img src="/assets/icons/NodeJS-Dark.svg" alt="Node.js" className="h-16 w-16" />
              <img src="/assets/icons/Python-Dark.svg" alt="Python" className="h-16 w-16" />
              <img src="/assets/icons/Git.svg" alt="Git" className="h-16 w-16" />
              <img src="/assets/icons/NextJS-Dark.svg" alt="Next.js" className="h-16 w-16" />
              <img src="/assets/icons/Flutter-Dark.svg" alt="Flutter" className="h-16 w-16" />
              <img src="/assets/icons/Figma-Dark.svg" alt="Figma" className="h-16 w-16" />
              <img src="/assets/icons/Postman.svg" alt="Postman" className="h-16 w-16" />
              <img src="/assets/icons/VSCode-Dark.svg" alt="VS Code" className="h-16 w-16" />
              <img src="/assets/icons/Bootstrap.svg" alt="Bootstrap" className="h-16 w-16" />
              <img src="/assets/icons/PHP-Dark.svg" alt="PHP" className="h-16 w-16" />
              <img src="/assets/icons/Dart-Dark.svg" alt="Dart" className="h-16 w-16" />
              <img src="/assets/icons/GCP-Dark.svg" alt="Google Cloud Platform" className="h-16 w-16" />
              <img src="/assets/icons/Debian-Dark.svg" alt="Debian" className="h-16 w-16" />
              {/* Repeat Logos for Infinite Scroll */}
              <img src="/assets/icons/HTML.svg" alt="HTML" className="h-16 w-16" />
              <img src="/assets/icons/CSS.svg" alt="CSS" className="h-16 w-16" />
              <img src="/assets/icons/JavaScript.svg" alt="JavaScript" className="h-16 w-16" />
              <img src="/assets/icons/NodeJS-Dark.svg" alt="Node.js" className="h-16 w-16" />
              <img src="/assets/icons/Python-Dark.svg" alt="Python" className="h-16 w-16" />
              <img src="/assets/icons/Git.svg" alt="Git" className="h-16 w-16" />
              <img src="/assets/icons/NextJS-Dark.svg" alt="Next.js" className="h-16 w-16" />
              <img src="/assets/icons/Flutter-Dark.svg" alt="Flutter" className="h-16 w-16" />
              <img src="/assets/icons/Figma-Dark.svg" alt="Figma" className="h-16 w-16" />
              <img src="/assets/icons/Postman.svg" alt="Postman" className="h-16 w-16" />
              <img src="/assets/icons/VSCode-Dark.svg" alt="VS Code" className="h-16 w-16" />
              <img src="/assets/icons/Bootstrap.svg" alt="Bootstrap" className="h-16 w-16" />
              <img src="/assets/icons/PHP-Dark.svg" alt="PHP" className="h-16 w-16" />
              <img src="/assets/icons/Dart-Dark.svg" alt="Dart" className="h-16 w-16" />
              <img src="/assets/icons/GCP-Dark.svg" alt="Google Cloud Platform" className="h-16 w-16" />
              <img src="/assets/icons/Debian-Dark.svg" alt="Debian" className="h-16 w-16" />
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

        html {
          scroll-behavior: smooth; /* Tambahkan ini untuk transisi smooth */
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

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: inline-flex;
          width: max-content; /* Penting: membuat container mengambil lebar isi */
          animation: scroll 20s linear infinite; /* Dipercepat dari 20s ke 10s */
          will-change: transform; /* Optimasi performa */
        }

        .logo-slider {
          width: 100%;
          height: auto;
          margin: auto;
          overflow: hidden;
          position: relative;
          background: transparent;
        }

        .logo-slide-track {
          display: flex;
          width: calc(16px * 32); /* Width total semua logo */
          animation: scroll 20s linear infinite;
        }

        .logo-slide {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 15px 30px;
        }

        /* Mempercepat animasi pada hover */
        .logo-slider:hover .logo-slide-track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
