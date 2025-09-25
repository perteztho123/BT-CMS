"use client"

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [backgroundImage, setBackgroundImage] = useState('');

  const openHotlineModal = () => {
    const modal = document.getElementById("hotline-modal")
    if (modal) modal.classList.remove("hidden")
  }

  const openIncidentModal = () => {
    const modal = document.getElementById("incident-modal")
    if (modal) modal.classList.remove("hidden")
  }

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Set background image based on time
  useEffect(() => {
    const hour = currentTime.getHours();
    let image = '';

    if (hour >= 5 && hour < 7) {
      image = '/images/sunrise.webp';
    } else if (hour >= 7 && hour < 17) {
      image = '/images/noontime.webp';
    } else if (hour >= 17 && hour < 18) {
      image = '/images/sunset.webp';
    } else {
      image = '/images/night.webp';
    }

    setBackgroundImage(image);
  }, [currentTime]);

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section
      className="relative flex items-center justify-center bg-gradient-to-b from-yellow-900 to-blue-100 overflow-hidden min-h-screen"
      id="hero"
    >
      {/* Dynamic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-100 filter brightness-50 transition-opacity duration-1000"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-800/30"></div>
      
      {/* Time Card - Top Right Corner */}
      <div className="absolute top-6 right-6 z-20">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-4 shadow-xl glass-effect">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">{formatTime(currentTime)}</div>
            <div className="text-sm opacity-80">{formatDate(currentTime)}</div>
            <div className="text-xs opacity-70 mt-1">Asia/Manila</div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="section-title text-white mb-10 [text-shadow:_2px_2px_4px_rgb(0,0,0,0.8)]">
          <span className="text-accent">Resilient Pio Duran:</span>
          <br /> Prepared for Tomorrow
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto mb-8 [text-shadow:_1px_1px_2px_rgb(0,0,0,0.4)]">
          Enhancing disaster preparedness, strengthening community resilience and ensuring safety for all.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={openHotlineModal}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-yellow-600 text-primary font-bold rounded-full shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <i className="fas fa-phone-alt mr-2"></i> Emergency Hotline
          </button>
          <button
            onClick={openIncidentModal}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <i className="fas fa-exclamation-triangle mr-2"></i> Submit an Incident
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white py-2 px-3 z-20 border-b-4 border-t-4 border-accent shadow-xl">
        <div className="container mx-auto flex items-center space-x-4">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-xl text-yellow-300 animate-heartbeat"></i>
            <span className="font-bold">WEATHER UPDATE:</span>
          </div>
          <div className="marquee-container flex-1">
            <div className="marquee-content">Real-time weather update from PAGASA will appear here...</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-0 right-0 flex justify-center z-10">
        <a href="#weather" className="text-white animate-bounce">
          <i className="fas fa-chevron-down text-3xl"></i>
        </a>
      </div>
      
      <style jsx>{`
        /* Glass effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
        
        /* Marquee Animation */
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* Heartbeat Animation */
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
          0% {
            transform: scale(1);
          }
          5% {
            transform: scale(1.1);
          }
          10% {
            transform: scale(1);
          }
          15% {
            transform: scale(1.1);
          }
          20% {
            transform: scale(1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
