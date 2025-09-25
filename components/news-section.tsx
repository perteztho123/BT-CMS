import Image from "next/image"

export default function NewsSection() {
  const newsItems = [
    {
      id: 1,
      title: "First Aid Training Successfully Conducted in Brgy. Hal",
      excerpt: "Residents of Brgy. Hal participated in a comprehensive first aid training session to enhance community preparedness.",
      date: "2024-08-15",
      category: "Community Training",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop",
      alt: "Community members participating in first aid training session in Brgy. Hal"
    },
    {
      id: 2,
      title: "Pio Duran Holds Municipal-wide Earthquake Drill",
      excerpt: "The entire municipality participated in an earthquake drill to test and improve our emergency response protocols.",
      date: "2024-09-05",
      category: "Drills",
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=640&h=360&fit=crop",
      alt: "Municipal earthquake drill participants practicing emergency response procedures"
    },
    {
      id: 3,
      title: "Flood Control Measures Implemented Across Low-lying Areas",
      excerpt: "New flood barriers and drainage systems have been installed to protect vulnerable communities during heavy rainfall.",
      date: "2024-09-12",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1529974147920-1b643f03bd3d?w=640&h=360&fit=crop",
      alt: "Flood control infrastructure being installed in low-lying areas"
    },
    {
      id: 4,
      title: "MDRRMO Conducts Disaster Preparedness Seminar for Schools",
      excerpt: "Local schools participated in a comprehensive disaster preparedness seminar to ensure student safety during emergencies.",
      date: "2024-09-18",
      category: "Education",
      image: "https://images.unsplash.com/photo-1517507592943-83852b090561?w=640&h=360&fit=crop",
      alt: "Students and teachers attending disaster preparedness seminar"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="news" className="bg-gray-50" aria-labelledby="news-heading">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 id="news-heading" className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Updates
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6" role="presentation"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Stay informed with the latest news, updates, and announcements from our team.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {newsItems.map((newsItem) => (
            <article key={newsItem.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={newsItem.image}
                  alt={newsItem.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
                  {newsItem.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 line-clamp-2">
                  {newsItem.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {newsItem.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <time dateTime={newsItem.date} className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(newsItem.date)}
                  </time>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-yellow-500 font-semibold py-2 px-4 rounded-lg w-full hover:shadow-lg transition-all duration-300 text-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                  Read More
                  <span className="sr-only"> about {newsItem.title}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-yellow-500 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:shadow-lg hover:from-blue-700 hover:to-blue-900 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
            Load More News
          </button>
        </div>
      </div>
    </section>
  )
}
