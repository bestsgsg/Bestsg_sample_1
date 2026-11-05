import { useEffect, useRef, useState } from 'react';
import {
  ExternalLink,
  Github,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle,
  X,
  Maximize2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface Project {
  id: number | string;
  title: string;
  category: 'ecommerce' | 'webapp' | 'mobile' | 'custom' | string;
  description: string;
  detailedDescription?: string;
  images: string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metric?: string;
  client?: string;
}

const curatedDefaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Nexus Omnichannel E-Commerce Suite',
    category: 'ecommerce',
    description:
      'High-conversion headless commerce platform featuring sub-second checkout, multi-currency localization, Stripe integration, and automated inventory sync.',
    detailedDescription:
      'Architected a headless Shopify Plus and Next.js frontend capable of handling 25,000+ simultaneous checkout requests during flash sales. Implemented localized payment rails (Stripe, PayPal, PayNow) and integrated ERP warehouse dispatching.',
    images: ['/portfolio/E-Commerce.png', '/portfolio/fashion.jpg'],
    tech: ['Next.js 14', 'TypeScript', 'Shopify Plus', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com/ecommerce-demo',
    githubUrl: 'https://github.com/bestsg/nexus-commerce',
    featured: true,
    metric: '+310% Conversion Rate',
    client: 'Global Fashion Retailer',
  },
  {
    id: 'p2',
    title: 'LogiFlow Supply Chain & ERP Command Center',
    category: 'custom',
    description:
      'Real-time cargo tracking and logistics orchestration platform with predictive route dispatching and multi-tenant fleet telematics.',
    detailedDescription:
      'Replaced legacy batch processing with an event-driven architecture using Node.js and WebSockets. Provides dispatchers with live GPS telemetry, automated customs clearance document generation, and predictive delivery times.',
    images: ['/portfolio/supplychain.png', '/portfolio/Dashboard.png'],
    tech: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS IoT'],
    liveUrl: 'https://example.com/logiflow-demo',
    githubUrl: 'https://github.com/bestsg/logiflow-platform',
    featured: true,
    metric: '99.99% Operational Uptime',
    client: 'APAC Freight Leader',
  },
  {
    id: 'p3',
    title: 'PulseHealth Telemedicine & Wellness Portal',
    category: 'webapp',
    description:
      'HIPAA-compliant digital healthcare hub with encrypted WebRTC video consultations, automated prescription processing, and vital sign monitoring.',
    detailedDescription:
      'Engineered an ultra-secure tele-consultation platform connecting certified medical practitioners with patients. Features peer-to-peer encrypted video rooms, digital prescription generation, and seamless integration with laboratory diagnostics.',
    images: ['/portfolio/healthapp.png', '/portfolio/fitness.jpeg'],
    tech: ['React', 'WebRTC', 'FastAPI', 'Redis', 'Docker'],
    liveUrl: 'https://example.com/pulsehealth-demo',
    githubUrl: 'https://github.com/bestsg/pulsehealth-suite',
    featured: false,
    metric: '150k+ Completed Consultations',
    client: 'Regional Healthcare Group',
  },
  {
    id: 'p4',
    title: 'WanderLust Global Flight & Hotel Engine',
    category: 'webapp',
    description:
      'High-throughput travel reservation marketplace aggregating GDS feeds, dynamic package pricing, and AI personalized recommendations.',
    detailedDescription:
      'Built a sub-0.5s search engine across 400+ international airlines and 80,000 hotels. Includes multi-calendar fare matrices, automated seat selection, and instantaneous itinerary voucher generation.',
    images: ['/portfolio/travel.jpg', '/portfolio/travel.png'],
    tech: ['Next.js', 'Node.js', 'Elasticsearch', 'Redis', 'Tailwind'],
    liveUrl: 'https://example.com/wanderlust-demo',
    githubUrl: 'https://github.com/bestsg/wanderlust-booking',
    featured: false,
    metric: '0.4s Search Latency',
    client: 'Southeast Asia Travel Hub',
  },
  {
    id: 'p5',
    title: 'FreshCart Hyperlocal Quick-Commerce',
    category: 'ecommerce',
    description:
      'Sub-30-minute grocery delivery platform featuring real-time warehouse picker applications and automated rider dispatch optimization.',
    detailedDescription:
      'Designed end-to-end applications for consumers, in-store pickers, and delivery couriers. Achieved 99.4% order accuracy with barcode verification and live traffic-aware courier routing.',
    images: ['/portfolio/grocery.png'],
    tech: ['React Native', 'React', 'MongoDB', 'Google Maps API'],
    liveUrl: 'https://example.com/freshcart-demo',
    githubUrl: 'https://github.com/bestsg/freshcart-store',
    featured: false,
    metric: '50,000+ Daily Orders',
    client: 'Urban Grocery Network',
  },
  {
    id: 'p6',
    title: 'Aura Living Luxury Real Estate Portal',
    category: 'custom',
    description:
      'High-end real estate portal featuring interactive 3D floorplan tours, mortgage financial calculators, and automated broker CRM synchronization.',
    detailedDescription:
      'Customized property portal showcasing luxury developments with high-resolution 3D walkthroughs, verified title deed tracking, and automated lead capture for private bankers and realtors.',
    images: ['/portfolio/real.jpg'],
    tech: ['React', 'Three.js', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://example.com/auraliving-demo',
    githubUrl: 'https://github.com/bestsg/aura-realestate',
    featured: false,
    metric: '$120M+ Property Transacted',
    client: 'Premier Realty Syndicate',
  },
  {
    id: 'p7',
    title: 'CollabSphere Interactive Learning Network',
    category: 'webapp',
    description:
      'Next-generation collaborative education ecosystem featuring live interactive whiteboards, break-out rooms, and AI study assistants.',
    detailedDescription:
      'Modern learning community platform supporting concurrent virtual lecture halls, screen sharing, quiz gamification, and automated attendance certification.',
    images: ['/portfolio/sociallearning.avif'],
    tech: ['Next.js', 'WebSockets', 'GraphQL', 'Tailwind CSS'],
    liveUrl: 'https://example.com/collabsphere-demo',
    githubUrl: 'https://github.com/bestsg/collabsphere-lms',
    featured: false,
    metric: '4.9/5 User Rating',
    client: 'EdTech Accelerator',
  },
  {
    id: 'p8',
    title: 'BistroSync Cloud Restaurant POS & KDS',
    category: 'custom',
    description:
      'Cloud-connected restaurant ordering suite featuring contactless QR tableside ordering, kitchen display systems, and inventory auto-replenishment.',
    detailedDescription:
      'Point of sale and tableside ordering system designed to function smoothly even during internet drops through local-first synchronization and real-time kitchen monitors.',
    images: ['/portfolio/Resta.avif'],
    tech: ['React', 'Node.js', 'Socket.io', 'SQLite / Cloud Sync'],
    liveUrl: 'https://example.com/bistrosync-demo',
    githubUrl: 'https://github.com/bestsg/bistrosync-pos',
    featured: false,
    metric: '450+ Restaurant Venues',
    client: 'Hospitality Management Co.',
  },
];

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'webapp', label: 'Web Apps' },
  { id: 'custom', label: 'Custom & ERP' },
  { id: 'mobile', label: 'Mobile' },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>(curatedDefaultProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  // Fetch backend projects and merge gracefully
  useEffect(() => {
    const fetchBackendProjects = async () => {
      try {
        const response = await fetch('/backend/get_portfolio');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const processedData: Project[] = data.map((p: any) => ({
              ...p,
              images: (p.images || []).map((img: string) =>
                img.startsWith('http') || img.startsWith('/') ? img : `/uploads/${img}`
              ),
            }));

            // Merge: Custom backend projects on top, followed by curated defaults
            setProjects([...processedData, ...curatedDefaultProjects.filter(cp => !processedData.some(bp => bp.title === cp.title))]);
          }
        }
      } catch (err) {
        console.log('Using curated portfolio showcase:', err);
      }
    };

    fetchBackendProjects();
  }, []);

  // Close modal on Escape key & freeze body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section id="portfolio" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Production Software{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Engineered For Scale
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            Explore our track record of enterprise digital solutions, cloud applications, and e-commerce platforms.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filters.map((filter) => {
              const count =
                filter.id === 'all'
                  ? projects.length
                  : projects.filter((p) => p.category.toLowerCase() === filter.id.toLowerCase()).length;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Projects Highlight (Large 2-Column Cards) */}
        {featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Display */}
                  <div
                    className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setModalImageIdx(0);
                    }}
                  >
                    <img
                      src={project.images[0] || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                        Featured Case Study
                      </span>
                    </div>

                    {project.metric && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/20 text-emerald-400 text-xs font-semibold font-mono">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>{project.metric}</span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4">
                      <span className="p-2 rounded-xl bg-white/90 text-slate-900 shadow-md flex items-center gap-1 text-xs font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Maximize2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                      {project.client || 'Enterprise Deployment'}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Strip */}
                <div className="px-6 sm:px-8 py-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      setModalImageIdx(0);
                    }}
                    className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group/btn"
                  >
                    <span>Read Full Architecture</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="View Code Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular Projects Grid (3 Columns) */}
        {regularProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-10">
            {regularProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 overflow-hidden hover:border-blue-400/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div
                    className="relative h-48 overflow-hidden bg-slate-900 cursor-pointer"
                    onClick={() => {
                      setSelectedProject(project);
                      setModalImageIdx(0);
                    }}
                  >
                    <img
                      src={project.images[0] || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60" />

                    {project.metric && (
                      <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-emerald-400 text-[11px] font-mono font-semibold">
                        {project.metric}
                      </div>
                    )}
                  </div>

                  {/* Text details */}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {project.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tech.slice(0, 3).map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 text-slate-500">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(project);
                      setModalImageIdx(0);
                    }}
                    className="hover:underline flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 p-1">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center animate-on-scroll">
          <a href="#start-project" className="hero-button text-sm sm:text-base">
            <span>Discuss Your Project Vision</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900 sticky top-0 z-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {selectedProject.category} Case Study
                </span>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
                aria-label="Close Case Study"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              {/* Primary Image Viewer */}
              <div className="relative h-60 sm:h-80 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={selectedProject.images[modalImageIdx] || selectedProject.images[0]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
                    {selectedProject.images.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setModalImageIdx(i)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          modalImageIdx === i ? 'bg-blue-600 scale-125' : 'bg-white/70 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Highlights & Metrics */}
              {selectedProject.metric && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                      Primary Client Metric
                    </span>
                  </div>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-600">
                    {selectedProject.metric}
                  </span>
                </div>
              )}

              {/* Detailed Technical Write-up */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
                  System Architecture & Solution
                </h4>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {selectedProject.detailedDescription || selectedProject.description}
                </p>
              </div>

              {/* Tech Stack List */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-5 sm:px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Close / Back to Projects</span>
                </button>

                <a
                  href="#start-project"
                  onClick={() => setSelectedProject(null)}
                  className="hero-button text-xs font-bold py-2.5 px-4"
                >
                  Inquire Similar
                </a>
              </div>

              <div className="flex items-center gap-2">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;
