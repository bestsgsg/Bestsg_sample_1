import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, XCircle } from 'lucide-react';

// Default empty array - projects will be loaded from backend
const defaultProjects = [];

const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'webapp', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'custom', label: 'Custom Solutions' }
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(defaultProjects);
  const [portfolioProjects, setPortfolioProjects] = useState(defaultProjects);

  // Fetch portfolio projects from backend API
  useEffect(() => {
    const fetchPortfolioProjects = async () => {
      try {
        const response = await fetch('/backend/get_portfolio.php');
        if (response.ok) {
          const data = await response.json();
          console.log('PortfolioSection: Fetched portfolio data:', data, 'Length:', data.length);
          setPortfolioProjects(data);
          setFilteredProjects(data);
        } else {
          console.error('PortfolioSection: Failed to fetch portfolio projects');
          // Fallback to empty array
          setPortfolioProjects(defaultProjects);
          setFilteredProjects(defaultProjects);
        }
      } catch (error) {
        console.error('PortfolioSection: Error fetching portfolio projects:', error);
        // Fallback to empty array
        setPortfolioProjects(defaultProjects);
        setFilteredProjects(defaultProjects);
      }
    };

    console.log('PortfolioSection: Initial fetch starting...');
    fetchPortfolioProjects();

    // Set up periodic refresh every 5 seconds for real-time sync with admin
    const intervalId = setInterval(fetchPortfolioProjects, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Listen for updates from admin dashboard - multiple sync methods
  useEffect(() => {
    const handleStorageChange = () => {
      const storedPortfolioProjects = localStorage.getItem('portfolioProjects');
      if (storedPortfolioProjects) {
        try {
          const parsedProjects = JSON.parse(storedPortfolioProjects);
          console.log('PortfolioSection: Received portfolio projects from localStorage:', parsedProjects.length, 'projects');
          setPortfolioProjects(parsedProjects);
          setFilteredProjects(parsedProjects);
        } catch (error) {
          console.error('PortfolioSection: Error parsing stored portfolio projects:', error);
        }
      }
    };

    // Check for initial data
    handleStorageChange();

    // Listen for storage changes and custom events
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom update events from admin dashboard
    const handleCustomUpdate = (event: CustomEvent) => {
      console.log('PortfolioSection: Received custom update event:', event.detail);
      if (event.detail?.portfolioProjects) {
        console.log('PortfolioSection: Setting portfolio projects from custom event:', event.detail.portfolioProjects.length, 'projects');
        setPortfolioProjects(event.detail.portfolioProjects);
        setFilteredProjects(event.detail.portfolioProjects);
        // Update localStorage for persistence
        localStorage.setItem('portfolioProjects', JSON.stringify(event.detail.portfolioProjects));
      } else if (event.detail?.forceRefresh) {
        // Force a re-fetch from backend when admin makes changes
        console.log('PortfolioSection: Force refresh triggered, fetching latest data...');
        const fetchLatestData = async () => {
          try {
            const response = await fetch('/backend/get_portfolio.php');
            if (response.ok) {
              const data = await response.json();
              console.log('PortfolioSection: Force fetched latest portfolio data:', data.length, 'projects');
              setPortfolioProjects(data);
              setFilteredProjects(data);
              localStorage.setItem('portfolioProjects', JSON.stringify(data));
            }
          } catch (error) {
            console.error('PortfolioSection: Error force fetching portfolio data:', error);
          }
        };
        fetchLatestData();
      } else {
        // Fallback to localStorage
        const storedPortfolioProjects = localStorage.getItem('portfolioProjects');
        if (storedPortfolioProjects) {
          try {
            const parsedProjects = JSON.parse(storedPortfolioProjects);
            console.log('PortfolioSection: Setting portfolio projects from localStorage fallback:', parsedProjects.length, 'projects');
            setPortfolioProjects(parsedProjects);
            setFilteredProjects(parsedProjects);
          } catch (error) {
            console.error('PortfolioSection: Error parsing stored portfolio projects:', error);
          }
        }
      }
    };

    window.addEventListener('portfolioUpdate', handleCustomUpdate as EventListener);

    // Also listen for any portfolio updates
    const handlePortfolioUpdate = () => {
      console.log('PortfolioSection: Generic portfolio update detected');
      const storedPortfolioProjects = localStorage.getItem('portfolioProjects');
      if (storedPortfolioProjects) {
        try {
          const parsedProjects = JSON.parse(storedPortfolioProjects);
          console.log('PortfolioSection: Updated from generic portfolio update:', parsedProjects.length, 'projects');
          setPortfolioProjects(parsedProjects);
          setFilteredProjects(parsedProjects);
        } catch (error) {
          console.error('PortfolioSection: Error parsing portfolio projects:', error);
        }
      }
    };

    window.addEventListener('portfolioUpdate', handlePortfolioUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolioUpdate', handleCustomUpdate);
      window.removeEventListener('portfolioUpdate', handlePortfolioUpdate);
    };
  }, []);

  // Effect for filtering projects when activeFilter changes
  useEffect(() => {
    const normalizedProjects = portfolioProjects.map(project => ({
      ...project,
      images: project.images || [] // Normalize images property
    }));

    if (activeFilter === 'all') {
      setFilteredProjects(normalizedProjects);
    } else {
      setFilteredProjects(normalizedProjects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, portfolioProjects]);

  // Effect for handling scroll animations when filteredProjects change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Showcasing our expertise through successful projects that have transformed businesses and delighted users
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover-target ${
                  activeFilter === filter.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="premium-glass glow-border animate-on-scroll group hover-target rounded-2xl p-6"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <img
                        src={project.images && project.images.length > 0 ? project.images[0] : '/placeholder.svg'}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-primary rounded-lg text-primary-foreground text-sm hover:bg-primary-glow transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Live Demo</span>
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 px-4 py-2 bg-secondary rounded-lg text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                          >
                            <Github className="h-4 w-4" />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Regular Projects Grid */}
            {regularProjects.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {regularProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="premium-glass animate-on-scroll group hover-target cursor-pointer rounded-xl p-4"
                      style={{ animationDelay: `${(index + featuredProjects.length) * 150}ms` }}
                    >
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={project.images && project.images.length > 0 ? project.images[0] : '/placeholder.svg'}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>

                    {/* New: Small gallery for additional images */}
                    {project.images && project.images.length > 1 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.images.slice(1, 4).map((imgSrc, idx) => (
                          <img
                            key={idx}
                            src={imgSrc || '/placeholder.svg'}
                            alt={`${project.title} thumbnail ${idx + 1}`}
                            className="w-12 h-12 object-cover rounded-md border border-gray-300"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                        ))}
                        {project.images.length > 4 && (
                          <div className="w-12 h-12 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center text-xs text-gray-600">
                            +{project.images.length - 4}
                          </div>
                        )}
                      </div>
                    )}

                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {project.tech.slice(0, 2).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-on-scroll">
            <XCircle className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">No Projects Found</h3>
            <p className="text-muted-foreground">
              There are no projects matching the selected filter. Try a different category.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16 animate-on-scroll">
          <a href="#portfolio" className="hero-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;