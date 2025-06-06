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
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [paddingTop, setPaddingTop] = useState(0);
  // Tambahkan state untuk mengelola status formulir
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  
  // Mengatur padding berdasarkan status menu
  useEffect(() => {
    if (isMenuOpen) {
      setPaddingTop(192); // Ukuran menu dikali jumlah item
    } else if (!isMenuOpen && !isMenuClosing) {
      setPaddingTop(0);
    }
  }, [isMenuOpen, isMenuClosing]);

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
    // Inisialisasi AOS dengan konfigurasi standar
    AOS.init({ 
      duration: 1000, 
      once: true,     // Animasi hanya sekali
      mirror: false,  // Tanpa mirror
      anchorPlacement: 'top-bottom',
      easing: 'ease-out-quart',
      offset: 120,
    });
  }, []);

  // Fungsi resetHome yang disederhanakan
  const resetHome = () => {
    setTextIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  };

  // Tambahkan fungsi handleCloseMenu
  const handleCloseMenu = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
      setPaddingTop(0);
    }, 300);
  };

  // Tambahkan function handleSubmit untuk form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      // Menampilkan indikator loading
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Sending message...'
      });
      
      // Kirim data ke Formspree
      const response = await fetch('https://formspree.io/f/movdgwgz', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });
      
      if (response.ok) {
        // Reset form dan tampilkan pesan sukses
        form.reset();
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        
        // Hilangkan pesan setelah 5 detik
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: ''
          });
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
      
      // Hilangkan pesan error setelah 5 detik
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: ''
        });
      }, 5000);
    }
  };

  // useEffect scroll yang disederhanakan
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          if (currentScrollTop > lastScrollTop) {
            setScrollDirection("down");
          } else if (currentScrollTop < lastScrollTop) {
            setScrollDirection("up");
          }
          
          setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] font-poppins">
      {/* Navigation - Fixed Position */}
      {/* Navigation */}
<header className="absolute w-full top-0 left-0 right-0 bg-transparent z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
  className="text-2xl font-bold logo-hover" 
              style={{ color: "#FFFFFF" }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
>
  dimzkuy
</div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#home" 
                className="font-regular relative transition-colors text-white hover:text-white after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:right-0 after:bottom-[-4px] after:mx-auto hover:after:w-full after:transition-all" 
                onClick={(e) => {
                  e.preventDefault();
                  resetHome();
                }}
              >
                Home
              </Link>
              <Link 
                href="#about" 
                className="font-regular relative transition-colors text-white hover:text-white after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:right-0 after:bottom-[-4px] after:mx-auto hover:after:w-full after:transition-all"
              >
                About
              </Link>
              <Link 
                href="#projects" 
                className="font-regular relative transition-colors text-white hover:text-white after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-white after:left-0 after:right-0 after:bottom-[-4px] after:mx-auto hover:after:w-full after:transition-all"
              >
                Tools & Projects
              </Link>
              <Link
                href="#contact"
                className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#1518C6] transition-all"
              >
                Contact Me
              </Link>
            </div>

            {/* Mobile Menu (Hamburger Icon) */}
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={() => isMenuOpen ? handleCloseMenu() : setIsMenuOpen(true)}
              >
                {/* Tetapkan icon tetap sama */}
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
        </div>

        {/* Mobile Menu - Full Width Under Header */}
        {(isMenuOpen || isMenuClosing) && (
          <div 
            className={`w-full bg-white shadow-lg z-40 ${
              isMenuClosing ? 'animate-slideUp' : 'animate-slideDown'
            }`}
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col items-center text-center py-3">
                <Link
                  href="#home"
                  className="font-regular transition-colors text-[#1518C6] py-3 w-full border-b border-gray-100 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1518C6] after:left-0 after:right-0 after:bottom-0 after:mx-auto hover:after:w-full after:transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCloseMenu();
                    resetHome();
                  }}
                >
                  Home
                </Link>
                <Link
                  href="#about"
                  className="font-regular transition-colors text-[#1518C6] py-3 w-full border-b border-gray-100 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1518C6] after:left-0 after:right-0 after:bottom-0 after:mx-auto hover:after:w-full after:transition-all"
                  onClick={() => handleCloseMenu()}
                >
                  About
                </Link>
                <Link
                  href="#projects"
                  className="font-regular transition-colors text-[#1518C6] py-3 w-full border-b border-gray-100 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#1518C6] after:left-0 after:right-0 after:bottom-0 after:mx-auto hover:after:w-full after:transition-all"
                  onClick={() => handleCloseMenu()}
                >
                  My Projects
                </Link>
                <Link
                  href="#contact"
                  className="font-regular transition-colors text-[#1518C6] py-3 w-full relative hover:bg-[#1518C6] hover:text-white transition-all"
                  onClick={() => handleCloseMenu()}
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content - With Dynamic Padding */}
      <main className="pt-[68px]">
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
          <div className="w-full max-w-4xl" data-aos="fade-up" data-aos-delay="100">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Hi, I&apos;m{" "}
              <span className="text-white">{texts[textIndex].substring(0, charIndex)}</span>
              <span className="typeCursor" />
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8">
            I am a software engineering student with a passion for cybersecurity and network system administration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
              <a
                href="https://github.com/dimzkuy"
                className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#1518C6] transition-all w-auto"
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
                My name is Dimas Cahyo Margono. I am a student of Telkom University Purwokerto majoring in Software Engineering. I currently live in Purwokerto. I graduated from the Computer and Network Engineering study program at Telkom Vocational High School in Jakarta. I enjoy playing games and listening to music.
                </p>
                <p>
                I have a slight interest in cybersecurity. When I was in vocational high school, I attended a bootcamp in collaboration with my school. That experience encouraged and motivated me to learn more about cybersecurity.
                </p>
                <p>
                Upon entering college, I began exploring several programming languages relevant to my major, Software Engineering, including Python, PHP, HTML, and CSS, among many others that I had to learn to sharpen my skills in the field of web development.
                </p>
              </div>

              {/* Image */}
              <div
                className="lg:w-1/2 flex justify-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="relative w-80 h-80 md:w-80 md:h-80 lg:w-80 lg:h-120 bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-full shadow-lg flex items-center justify-center">
                  <img
                    src="/assets/img/profile.jpg"
                    alt="Profile Photo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 bg-gray-50 text-[#1518C6] scroll-mt-[80px]">
          <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16">
            {/* Heading */}
            <div className="mb-12 text-center">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#1518C6] to-[#6A5ACD]"
                data-aos="fade-up"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 001.73 10.057a.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 003 0v-1.27a48.4 48.4 0 014.06-1.007zM13.5 15.75a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V15.75z" />
                  </svg>
                  Education
                </span>
              </h2>
              <p className="text-gray-600" data-aos="fade-up" data-aos-delay="100">
                My academic journey and educational activities
              </p>
            </div>

            {/* Education Timeline - Bullet Style */}
            <div className="max-w-4xl mx-auto">
              {/* Education Item 1 */}
              <div className="pl-10 relative mb-16" data-aos="fade-up" data-aos-delay="200">
                {/* Bullet Point */}
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#1518C6] mt-2"></div>
                
                {/* Vertical Line - Thinner and blue */}
                <div className="absolute left-[7.5px] top-6 bottom-[-56px] w-0.5 bg-[#1518C6] rounded-full"></div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-1">Software Engineering</h3>
                <h4 className="text-xl font-semibold mb-2">Telkom University Purwokerto</h4>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    2022 - Present
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Purwokerto, Indonesia
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Studying software engineering with a focus on web and mobile development.
                </p>
                
                <div className="mt-3">
                  <h5 className="text-sm font-semibold mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ESSENTIAL ACTIVITIES
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Bangkit Academy 2024 H2 Cloud Computing Cohort</span>
                  </div>
                </div>
              </div>

              {/* Education Item 2 */}
              <div className="pl-10 relative" data-aos="fade-up" data-aos-delay="300">
                {/* Bullet Point */}
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#1518C6] mt-2"></div>
                
                {/* Connect line to second bullet point - ensure it's visible and connected */}
                <div className="absolute left-[7.5px] top-[-56px] bottom-[-2px] w-0.5 bg-[#1518C6] rounded-full"></div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold mb-1">Computer & Network Engineering</h3>
                <h4 className="text-xl font-semibold mb-2">SMK Telkom Jakarta</h4>
                
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    2019 - 2022
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Jakarta, Indonesia
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  Specialized in computer networking and system administration. Developed skills in network configuration, troubleshooting, and basic security practices.
                </p>
                
                <div className="mt-3">
                  <h5 className="text-sm font-semibold mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ESSENTIAL ACTIVITIES
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">InfraDigital Foundation Cybersecurity Bootcamp Participant</span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Cisco ITE Certified</span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">Comptia Linux+ Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects & Tools Section (Combined) */}
        <section id="projects" className="bg-gradient-to-br from-[#1518C6] to-[#6A5ACD] py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14" data-aos="fade-up">
              <h2 className="text-4xl font-bold text-white mb-4">Tools & Projects</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Here are some tools I use and my recent projects that showcase my skills and experience in
                web development.
              </p>
              
              {/* Tech Stack Section */}
              <div className="mb-24"> {/* Increased bottom margin from mb-16 to mb-24 */}
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
              
              {/* Divider to create more space */}
              <div className="w-16 h-1 bg-white/20 mx-auto mb-20 rounded-full"></div>
              
              {/* Projects Section Header with more spacing */}
              <h3 className="text-2xl font-bold text-white mb-12 pt-4">Featured Projects</h3>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Card 1 */}
              <div 
                className="bg-white rounded-xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]" 
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    Bangkit Academy 2024 H2 Capstone Project
                  </span>
                </div>
                
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
                    Crop-Care - Smart Crop Disease Detection using Deep Learning and Cloud Computing. This web application<br/>
                    is the Capstone Project of Team C242-PR631 for the Bangkit Academy 2024 H2.
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
                      className="flex items-center text-gray-700 font-medium transition-colors hover:text-[#1518C6]"
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
                className="bg-white rounded-xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]" 
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    UMKM Website Project  
                  </span>
                </div>
                
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
                className="bg-white rounded-xl overflow-hidden shadow-lg relative transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.01]" 
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {/* Status Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    App Redesign Project
                  </span>
                </div>
                
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
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
                      className="flex items-center text-gray-700 font-medium transition-colors hover:text-[#1518C6]"
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
              className="bg-[#F9FAFB] p-8 rounded-xl shadow-md max-w-xl mx-auto relative"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Success/Error Popup */}
              {formStatus.submitted && (
                <div 
                  className={`absolute top-0 left-0 right-0 p-4 text-center transform -translate-y-full rounded-t-lg shadow-md ${
                    formStatus.success 
                      ? 'bg-green-100 text-green-800 border-b-2 border-green-500'
                      : 'bg-red-100 text-red-800 border-b-2 border-red-500'
                  } transition-all duration-300`}
                >
                  <div className="flex items-center justify-center">
                    {formStatus.success ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <p>{formStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    required
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-[#1518C6] focus:border-[#1518C6]"
                    placeholder="Subject of your message"
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
                    disabled={formStatus.submitted && !formStatus.success}
                    className="w-full flex items-center justify-center bg-[#1518C6] text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-[#6A5ACD] transition-all duration-300 disabled:opacity-70"
                  >
                    {formStatus.submitted && !formStatus.success ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
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
              <p className="text-white/80">dcmargono@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 bg-[#1518C6] text-white">
          <div className="max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Column 1: Name and Description */}
              <div>
                <h3 className="text-xl font-bold mb-6">Dimas Cahyo Margono</h3>
                <p className="text-white/80 leading-relaxed">
                  Software Engineering Student with a Passionate about Cybersecurity and Network System Administration.
                </p>
              </div>
              
              {/* Column 2: Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li><Link href="#home" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="#about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
                  <li><Link href="#projects" className="text-white/80 hover:text-white transition-colors">Projects</Link></li>
                  <li><Link href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              {/* Column 3: Skills */}
              <div>
                <h3 className="text-lg font-bold mb-6">Skills</h3>
                <ul className="space-y-4">
                  <li className="text-white/80">Web Development</li>
                  <li className="text-white/80">UI/UX Design</li>
                </ul>
              </div>
              
              {/* Column 4: Connect */}
              <div>
                <h3 className="text-lg font-bold mb-6">Connect</h3>
                <div className="flex gap-6 mb-6">
                  <a 
                    href="https://github.com/dimzkuy" 
                    className="text-white hover:text-white/80 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/dimascahyomargono/" 
                    className="text-white hover:text-white/80 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                  </a>
                  <a 
                    href="https://x.com/dimzkuyy_" 
                    className="text-white hover:text-white/80 transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1851 10.5689L12.8817 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:dcmargono@gmail.com" 
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-white/80">dcmargono@gmail.com</p>
              </div>
            </div>
          </div>
          
          {/* Bottom part with copyright and links */}
          <div className="pt-10 mt-10 border-t border-white/20 max-w-7xl mx-auto px-8 sm:px-16 lg:px-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-white/80">
                  &copy; {new Date().getFullYear()} Dimas Cahyo Margono. All rights reserved.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="text-sm text-white/80">
                  <a href="#" className="hover:text-white mr-4">Privacy Policy</a>
                  <a href="#" className="hover:text-white">Terms of Service</a>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
