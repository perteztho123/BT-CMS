"use client"

export default function HeroSection() {
  const openHotlineModal = () => {
    const modal = document.getElementById("hotline-modal")
    if (modal) modal.classList.remove("hidden")
  }

  const openIncidentModal = () => {
    const modal = document.getElementById("incident-modal")
    if (modal) modal.classList.remove("hidden")
  }

  return (
    <section
      className="relative flex items-center justify-center bg-gradient-to-b from-yellow-900 to-blue-100 overflow-hidden min-h-screen"
      id="hero"
    >
      <div className="lightning-container">
        <div className="lightning flash-1"></div>
        <div className="lightning flash-2"></div>
        <div className="lightning flash-3"></div>
      </div>
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dedcmctqk/image/upload/v1758647866/pixnova-raw_bf7520803e74dcd34e198171fb12450e_kmobxk.webp')] bg-cover bg-center opacity-100 filter brightness-50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-blue-800/30"></div>
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
    </section>
  )
}
