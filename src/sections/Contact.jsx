import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  FileText,
  ChevronDown,
  Terminal,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Copy,
  Quote
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from '../components/Icons';
import ContactCelestialScene from '../three/ContactCelestialScene';
import { audioEngine } from '../utils/audioEngine';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [currentTimeIST, setCurrentTimeIST] = useState('');

  const directEmail = 'lokesh.valmeeki@gmail.com';
  const directPhone = '+91 88380 47271';

  // Live IST Clock update for Coimbatore
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).format(new Date());
        setCurrentTimeIST(timeStr);
      } catch (err) {
        setCurrentTimeIST('03:45 PM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (e, text, key) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      navigator.clipboard?.writeText(text);
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedKey(key);
    audioEngine.playClickChime();
    setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioEngine.playHoverTone();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      audioEngine.playClickChime();

      // Trigger client mail dispatch with encoded fields
      const mailSubject = encodeURIComponent(`[${formData.subject}] from ${formData.name}`);
      const mailBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${directEmail}?subject=${mailSubject}&body=${mailBody}`;

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 700);
  };

  return (
    <section
      id="contact"
      className="w-full relative py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-neutral-800 selection:bg-neutral-900 selection:text-white"
      aria-label="Contact — Let's Build Something Amazing Together"
    >
      {/* ================================================================= */}
      {/* 1. DUAL SPLIT BACKGROUND: Architectural Light Left & Cosmic Right */}
      {/* ================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* SVG Dividing Curve Between Studio Off-White and Deep Space */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          preserveAspectRatio="none"
          viewBox="0 0 1440 900"
        >
          {/* Left Side: Off-White Studio Space */}
          <path
            d="M 0 0 L 730 0 C 770 240, 690 460, 610 620 C 530 780, 560 850, 580 900 L 0 900 Z"
            fill="#F4F4F6"
          />
          {/* Right Side: Deep Black Cosmic Space */}
          <path
            d="M 730 0 L 1440 0 L 1440 900 L 580 900 C 560 850, 530 780, 610 620 C 690 460, 770 240, 730 0 Z"
            fill="#000000"
          />
        </svg>

        {/* Bottom-Left Lunar/Mountain Terrain Texture Blend */}
        <div
          className="absolute bottom-0 left-0 w-full sm:w-1/2 h-44 sm:h-56 opacity-25 bg-cover bg-bottom pointer-events-none mix-blend-multiply"
          style={{
            backgroundImage: "url('/mountain-bg-bw.jpg')",
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
          }}
        />

        {/* Top-Right Celestial Horizon Texture Blend */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-40 bg-cover bg-left pointer-events-none mix-blend-screen"
          style={{ backgroundImage: "url('/loader_celestial_bg.jpg')" }}
        />

        {/* Interactive Three.js Scene: Grounded Faceted Polyhedron, Floating Orbs, and Planet Globe with Orbital Rings */}
        <ContactCelestialScene />
      </div>

      {/* ================================================================= */}
      {/* 2. MAIN SECTION CONTENT                                           */}
      {/* ================================================================= */}
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =============================================================== */}
          {/* LEFT COLUMN: Headings, 3 Info Cards, Socials, & Script Sign-off  */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 space-y-8 sm:space-y-10">
            
            {/* Header Block */}
            <div className="space-y-4 max-w-xl">
              {/* Top Pill Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-neutral-300/80 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <span className="font-mono text-[11px] font-semibold tracking-widest text-neutral-700 uppercase">
                  // GET IN TOUCH
                </span>
              </div>

              {/* Bold Impact Headline */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.05]">
                <span className="text-neutral-950">LET’S BUILD </span>
                <br />
                <span className="text-neutral-400">SOMETHING </span>
                <br />
                <span className="text-neutral-950">AMAZING TOGETHER.</span>
              </h2>

              {/* Subtitle Description */}
              <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md pt-1">
                I’m always open to discussing new opportunities, exciting projects, or just a friendly chat about technology, design, or XR.
              </p>
            </div>

            {/* 3 Contact Information Cards (Email & Phone side-by-side, Location full-width) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              
              {/* Card 1: EMAIL */}
              <a
                href={`mailto:${directEmail}`}
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="relative p-4 sm:p-5 rounded-2xl bg-white/85 hover:bg-white border border-neutral-300/80 hover:border-neutral-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.99] flex items-center justify-between group overflow-hidden"
              >
                {/* Specular sheen beam animation on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3.5 min-w-0 z-10">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 group-hover:bg-neutral-950 text-neutral-800 group-hover:text-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:shadow-md transition-all duration-300">
                    <Mail className="w-5 h-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span>EMAIL</span>
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
                      {directEmail}
                    </div>
                  </div>
                </div>

                {/* Right Action Cluster: Copy Button + Direct Link Arrow */}
                <div className="flex items-center gap-1.5 z-10 flex-shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, directEmail, 'email')}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      audioEngine.playHoverTone();
                    }}
                    title={copiedKey === 'email' ? 'Copied!' : 'Copy Email'}
                    aria-label="Copy Email address"
                    className={`relative p-2 rounded-xl border transition-all duration-200 ${
                      copiedKey === 'email'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-600 scale-105 shadow-xs'
                        : 'bg-white/90 hover:bg-neutral-100 border-neutral-200 text-neutral-500 hover:text-black hover:scale-105'
                    }`}
                  >
                    {copiedKey === 'email' ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5] text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedKey === 'email' && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-950 text-white font-mono text-[9px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>

                  <div className="w-8 h-8 rounded-xl bg-neutral-100/90 group-hover:bg-neutral-950 text-neutral-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </a>

              {/* Card 2: PHONE */}
              <a
                href={`tel:${directPhone.replace(/\s+/g, '')}`}
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="relative p-4 sm:p-5 rounded-2xl bg-white/85 hover:bg-white border border-neutral-300/80 hover:border-neutral-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.99] flex items-center justify-between group overflow-hidden"
              >
                {/* Specular sheen beam animation on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3.5 min-w-0 z-10">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 group-hover:bg-neutral-950 text-neutral-800 group-hover:text-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:shadow-md transition-all duration-300">
                    <Phone className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                      <span>PHONE</span>
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-bold text-neutral-900 truncate group-hover:text-black">
                      {directPhone}
                    </div>
                  </div>
                </div>

                {/* Right Action Cluster: Copy Button + Direct Call Arrow */}
                <div className="flex items-center gap-1.5 z-10 flex-shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={(e) => handleCopy(e, directPhone, 'phone')}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      audioEngine.playHoverTone();
                    }}
                    title={copiedKey === 'phone' ? 'Copied!' : 'Copy Phone Number'}
                    aria-label="Copy phone number"
                    className={`relative p-2 rounded-xl border transition-all duration-200 ${
                      copiedKey === 'phone'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-600 scale-105 shadow-xs'
                        : 'bg-white/90 hover:bg-neutral-100 border-neutral-200 text-neutral-500 hover:text-black hover:scale-105'
                    }`}
                  >
                    {copiedKey === 'phone' ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5] text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedKey === 'phone' && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-950 text-white font-mono text-[9px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>

                  <div className="w-8 h-8 rounded-xl bg-neutral-100/90 group-hover:bg-neutral-950 text-neutral-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </a>

              {/* Card 3: LOCATION (Spans full width across both columns so it never truncates!) */}
              <div
                onMouseEnter={() => audioEngine.playHoverTone()}
                className="relative sm:col-span-2 p-4 sm:p-5 rounded-2xl bg-white/85 hover:bg-white border border-neutral-300/80 hover:border-neutral-900/30 backdrop-blur-md shadow-xs hover:shadow-xl hover:shadow-black/5 transition-all duration-300 ease-out hover:-translate-y-1 group overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                {/* Specular sheen beam animation on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div className="flex items-center gap-3.5 min-w-0 z-10">
                  <div className="w-11 h-11 rounded-xl bg-neutral-100 group-hover:bg-neutral-950 text-neutral-800 group-hover:text-white border border-black/5 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:shadow-md transition-all duration-300">
                    <MapPin className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                      <span>LOCATION</span>
                      <span className="text-neutral-300">•</span>
                      <span className="text-neutral-500 font-normal">Remote / Hybrid Worldwide</span>
                    </div>
                    <div className="font-sans text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-black">
                      Coimbatore, Tamil Nadu, India
                    </div>
                  </div>
                </div>

                {/* Live IST Local Time Beacon Badge */}
                <div className="z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 shadow-2xs group-hover:border-neutral-300 transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-neutral-800">
                    <span>{currentTimeIST || '03:45 PM'}</span>
                    <span className="text-neutral-400 text-[10px]">IST (UTC +5:30)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Connect Row & Handwritten Script Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 max-w-xl">
              
              {/* Social Buttons */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-neutral-900 uppercase tracking-wider">
                    LET'S CONNECT
                  </h4>
                  <p className="text-xs text-neutral-500 font-sans">
                    Find me on these platforms
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/in/lokesh-valmeeki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/lokeshv-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  {/* 3D / Spatial Lab */}
                  <a
                    href="#lab"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="3D Spatial Lab"
                  >
                    <Box className="w-4 h-4" />
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="X / Twitter"
                  >
                    <XIcon className="w-4 h-4" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>

                  {/* Direct Email */}
                  <a
                    href={`mailto:${directEmail}`}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-800 hover:text-black hover:scale-105 active:scale-95 transition-all"
                    aria-label="Send Direct Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Handwritten Script Sign-off Note */}
              <div className="pb-1 sm:pr-4 text-neutral-800 select-none">
                <p className="font-serif italic text-xl sm:text-2xl -rotate-6 transform tracking-wide font-normal leading-tight">
                  Looking forward
                  <br />
                  to hearing from you!
                </p>
              </div>

            </div>

          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: Drop a Message Form Card & Collaboration Card     */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Card 1: Drop a Message Interactive Form */}
            <div className="rounded-3xl bg-[#0e0e12]/95 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              
              {/* Form Top Header */}
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-500 uppercase tracking-widest">
                  // SEND A MESSAGE
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-300">
                    I usually respond within 24 hours
                  </span>
                </div>
              </div>

              {/* Form Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Drop a Message
              </h3>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Inputs Row 1: Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-white/40 focus:outline-hidden text-sm text-white placeholder-neutral-500 transition-colors font-sans"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-white/40 focus:outline-hidden text-sm text-white placeholder-neutral-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                {/* Input Row 2: Subject Dropdown Select */}
                <div className="relative">
                  <FileText className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-white/40 focus:outline-hidden text-sm text-white transition-colors font-sans appearance-none cursor-pointer"
                  >
                    <option value="Project Collaboration" className="bg-neutral-900 text-white">Project Collaboration</option>
                    <option value="General Inquiry" className="bg-neutral-900 text-white">General Inquiry</option>
                    <option value="XR / Spatial Prototype" className="bg-neutral-900 text-white">XR / Spatial Prototype</option>
                    <option value="Internship / Full-time Role" className="bg-neutral-900 text-white">Internship / Full-time Role</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Input Row 3: Message Textarea */}
                <div className="relative">
                  <Terminal className="w-4 h-4 text-neutral-500 absolute left-4 top-4 pointer-events-none" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Your Message"
                    required
                    className="w-full pl-11 pr-4 pt-3.5 pb-8 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 focus:border-white/40 focus:outline-hidden text-sm text-white placeholder-neutral-500 transition-colors font-sans resize-none"
                  />
                  {/* Character Counter */}
                  <span className="absolute bottom-2.5 right-3.5 font-mono text-[10px] text-neutral-500">
                    {formData.message.length}/500
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-white text-black font-mono font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2 text-emerald-700">
                      <Check className="w-4 h-4" /> MESSAGE DISPATCHED
                    </span>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>

            {/* Card 2: Bottom Collaboration Quote Card */}
            <div className="rounded-2xl bg-[#0e0e12]/90 border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              
              {/* Left Quote */}
              <div className="flex items-start gap-4">
                <Quote className="w-5 h-5 text-neutral-500 flex-shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm">
                  Great ideas start with a conversation.
                  <br />
                  Let’s create, build, and explore new possibilities together.
                </p>
              </div>

              {/* Right Collaboration Status */}
              <div className="sm:border-l sm:border-white/10 sm:pl-6 flex items-center gap-2 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-300 uppercase tracking-widest whitespace-nowrap">
                  OPEN TO COLLABORATION
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
