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

  // Tambahkan fungsi resetHome di dalam komponen Portfolio
  const resetHome = () => {
    // Reset state typing animation
    setTextIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    
    // Scroll ke posisi paling atas dengan smooth animation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Optional: Re-trigger AOS animations
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  };

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
            <Link 
              href="#home" 
              className="font-regular transition-colors hover:text-[#1518C6]" 
              style={{ color: "#FFFFFF" }}
              onClick={(e) => {
                e.preventDefault(); // Mencegah scroll default ke anchor #home
                resetHome();
              }}
            >
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
              onClick={(e) => {
                e.preventDefault(); // Mencegah perilaku default
                setIsMenuOpen(false);
                resetHome();
              }}
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Hi, I&apos;m{" "}
            <span className="text-white">{texts[textIndex].substring(0, charIndex)}</span>
            <span className="typeCursor" />
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
          I am a software engineering student with a passion for cybersecurity and network system administration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

      {/* Projects & Tools Section (Combined) */}
      <section id="projects" className="bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white mb-4">My Projects & Tools</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Here are some tools i use and my recent projects that showcase my skills and experience in
              web development.
            </p>
            
            {/* Tools Scrolling Display */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>
              <div className="overflow-hidden" data-aos="fade-up" data-aos-delay="200">
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
            
            <h3 className="text-2xl font-bold text-white mb-8">Featured Projects</h3>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <div 
              className="bg-white rounded-xl overflow-hidden shadow-lg" 
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img 
                  src="/assets/projects/Crop-Care.png" 
                  alt="Crop Care App" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Crop-Care Web</h3>
                <p className="text-gray-600 mb-4">
                  The project is called &quot;Crop-Care - Smart Crop Disease Detection Using Deep Learning and Cloud Computing.&quot; <br>
                  </br>Crop-Care addresses the critical challenge of crop disease management, leveraging deep learning and cloud computing to enhance early detection and minimize agricultural losses.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">Next.js</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">ShaCDN UI</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">TensorFlow Keras</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">Cloud Run (GCP)</span>
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/RafliFahri/Crop-Care" 
                    className="flex items-center text-gray-700 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Code
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div 
              className="bg-white rounded-xl overflow-hidden shadow-lg" 
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img 
                  src="/assets/projects/Workgank.png" 
                  alt="Task Management App" 
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Workgank Industry</h3>
                <p className="text-gray-600 mb-4">
                  This website is the final project for the Web Programming Design 1 course. <br />
                    It is a website implementation for a simple clothing business.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">HTML</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">CSS</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">PHP</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">MySQL</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">Bootstrap</span>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div 
              className="bg-white rounded-xl overflow-hidden shadow-lg" 
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img 
                  src="/assets/projects/dana-redesign.png" 
                  alt="Dana Redesign" 
                  className="h-full w-auto object-contain" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/placeholder.svg";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Dana Redesign</h3>
                <p className="text-gray-600 mb-4">
                  A redesign project for the Dana application, focusing on enhancing user experience and interface design. <br />
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">Flutter</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-gray-100">Firebase</span>
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/dimzkuy/repo-PPB-Team-4-Redesign-DANA" 
                    className="flex items-center text-gray-700 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 mr-2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen py-16 bg-white text-[#1518C6] scroll-mt-[80px]"
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          {/* Heading */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            data-aos="fade-up"
          >
            Contact Me
          </h2>

          {/* Contact Form */}
          <div
            className="bg-[#F9FAFB] p-8 rounded-xl shadow-md max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <form action="https://formspree.io/f/mwkajgwl" method="POST" className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-[#1518C6] focus:border-[#1518C6]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-[#1518C6] focus:border-[#1518C6]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-[#1518C6] focus:border-[#1518C6]"
                  placeholder="Your Message"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#1518C6] text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#6A5ACD] transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
            <p className="text-gray-600 mb-4">
              Or connect with me on
            </p>
            <div className="flex justify-center gap-6">
              {/* Email */}
              <a 
                href="mailto:dcmargono@gmail.com" 
                className="text-[#1518C6] hover:text-[#6A5ACD] transition-colors"
                title="Email me"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a 
                href="https://www.instagram.com/dmzmrgno/" 
                className="text-[#1518C6] hover:text-[#6A5ACD] transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
                title="Instagram"
              >
                <img 
                  src="/assets/icons/icons8-instagram.svg" 
                  alt="Instagram" 
                  width="24" 
                  height="24" 
                  className="filter-primary hover:filter-accent transition-colors"
                />
              </a>
              
              {/* Twitter/X */}
              <a 
                href="https://x.com/dimzkuyy_" 
                className="text-[#1518C6] hover:text-[#6A5ACD] transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
                title="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1851 10.5689L12.8817 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/dimascahyomargono/" 
                className="text-[#1518C6] hover:text-[#6A5ACD] transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#1518C6] text-white">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Dimas Cahyo Margono. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
