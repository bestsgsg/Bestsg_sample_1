import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Play,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  X,
  Server,
  Database,
  Code2
} from 'lucide-react';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'performance' | 'velocity'>('architecture');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Escape key listener for video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoModalOpen(false);
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen]);

  const stats = [
    { number: '500+', label: 'Delivered Projects', sub: 'Across 14+ countries' },
    { number: '98.7%', label: 'Client Retention', sub: 'Long-term enterprise partners' },
    { number: '50+', label: 'Senior Engineers', sub: 'Dedicated offshore talent' },
    { number: '24/7', label: 'Continuous Delivery', sub: 'Zero timezone lag' },
  ];

  return (
    <section id="home" className="relative pt-24 pb-12 sm:pt-28 sm:pb-14 flex flex-col justify-center overflow-hidden">
      {/* Background Decorative Mesh & Grids */}
      <div className="absolute inset-0 bg-tech-grid opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          {/* Top Pill Announcement */}
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold tracking-wide shadow-sm mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>Scalable Offshore Engineering & Cloud-Native Web Solutions</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>

          {/* Master Headline */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Engineering Digital Products{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              That Outperform & Scale
            </span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            We empower forward-thinking businesses with elite offshore engineering pods, high-conversion
            e-commerce platforms, and resilient custom web applications.
          </p>

          {/* Dual Call To Actions */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a href="#start-project" className="hero-button w-full sm:w-auto group">
              <span>Start Your Project</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="secondary-glass-button w-full sm:w-auto group"
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                <Play className="w-4 h-4 text-blue-600 fill-blue-600 ml-0.5" />
              </div>
              <span>Watch Live Demo</span>
            </button>
          </div>
        </div>

        {/* Interactive Visualization Centerpiece */}
        <div
          className={`max-w-5xl mx-auto mb-8 sm:mb-10 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative rounded-2xl glass-card glow-border p-2 sm:p-4 shadow-2xl border border-slate-200/90 dark:border-slate-800">
            {/* Window Top Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 rounded-xl mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono font-medium text-slate-500 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-600" />
                  <span>sg-cluster-01.bestsg.com [LIVE: 99.99%]</span>
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('architecture')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  System Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('performance')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'performance'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Speed & Metrics
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('velocity')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'velocity'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Agile Pod Velocity
                </button>
              </div>
            </div>

            {/* Interactive Tab Panels */}
            <div className="p-4 sm:p-6 bg-white/60 dark:bg-slate-950/40 rounded-xl min-h-[300px]">
              {/* Tab 1: Architecture Visualization */}
              {activeTab === 'architecture' && (
                <div className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    {/* Node 1: Edge & Client */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                        <Globe2 className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">Layer 1</div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Global Edge & CDN</h4>
                      <p className="text-xs text-muted-foreground">Anycast routing, Cloudflare DDoS shield, sub-20ms TTFB globally.</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Latency: 14ms</span>
                      </div>
                    </div>

                    {/* Connector Arrow */}
                    <div className="hidden md:flex flex-col items-center justify-center">
                      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500 relative">
                        <div className="w-2 h-2 rounded-full bg-blue-600 absolute -top-[3px] left-1/2 animate-ping" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-1">HTTP/3 TLS 1.3</span>
                    </div>

                    {/* Node 2: App Engine */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500/50 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">Layer 2</div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Microservices Core</h4>
                      <p className="text-xs text-muted-foreground">React 19 / Node.js clustered workers, zero-downtime rolling deploys.</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-indigo-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        <span>Throughput: 8.5k req/s</span>
                      </div>
                    </div>

                    {/* Node 3: Enterprise Data */}
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                        <Database className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Layer 3</div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Multi-Region DB</h4>
                      <p className="text-xs text-muted-foreground">PostgreSQL / MongoDB clustering with automated point-in-time recovery.</p>
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Replication: 0-Lag</span>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Bottom Ribbon */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                    <span className="flex items-center gap-1.5 font-medium text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Enterprise Security: ISO 27001 & SOC2 Compliant Protocols
                    </span>
                    <span className="font-mono text-blue-600">CI/CD: GitHub Actions ➔ Docker ➔ Kubernetes</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Performance Metrics */}
              {activeTab === 'performance' && (
                <div className="animate-fade-in py-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Performance', score: 99, color: 'text-emerald-500', stroke: '#10b981' },
                      { label: 'Accessibility', score: 100, color: 'text-emerald-500', stroke: '#10b981' },
                      { label: 'Best Practices', score: 100, color: 'text-emerald-500', stroke: '#10b981' },
                      { label: 'SEO Authority', score: 100, color: 'text-emerald-500', stroke: '#10b981' },
                    ].map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center"
                      >
                        <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                          <svg className="w-20 h-20 -rotate-90">
                            <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              stroke={m.stroke}
                              strokeWidth="6"
                              strokeDasharray="200"
                              strokeDashoffset={200 - (200 * m.score) / 100}
                              strokeLinecap="round"
                              fill="transparent"
                              className="transition-all duration-1000 ease-out"
                            />
                          </svg>
                          <span className={`absolute text-xl font-bold font-mono ${m.color}`}>
                            {m.score}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-600 flex flex-wrap justify-between items-center gap-2">
                    <span>⚡ Measured on real production deployments: First Contentful Paint (FCP): <strong>0.6s</strong></span>
                    <span className="text-emerald-600 font-semibold">Core Web Vitals: PASSED</span>
                  </div>
                </div>
              )}

              {/* Tab 3: Pod Velocity */}
              {activeTab === 'velocity' && (
                <div className="animate-fade-in py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-2xl font-bold text-blue-600 font-mono mb-1">100%</div>
                      <div className="text-xs font-semibold text-slate-800">Sprint Delivery Rate</div>
                      <p className="text-xs text-muted-foreground mt-1">Bi-weekly milestone sign-offs with demo walkthroughs.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-2xl font-bold text-indigo-600 font-mono mb-1">&lt; 2 Hrs</div>
                      <div className="text-xs font-semibold text-slate-800">Communication Turnaround</div>
                      <p className="text-xs text-muted-foreground mt-1">Dedicated Slack/Teams channel with direct developer access.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="text-2xl font-bold text-emerald-600 font-mono mb-1">45%</div>
                      <div className="text-xs font-semibold text-slate-800">Average Cost Efficiency</div>
                      <p className="text-xs text-muted-foreground mt-1">Versus domestic hiring with zero recruitment overhead.</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/60 text-xs text-blue-700 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Includes senior tech leads, QA automation engineers, and agile Scrum masters on every engagement.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-card border border-slate-200/80 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight font-mono mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Video Modal */}
      {isVideoModalOpen && (
        <div
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/95">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-400 fill-blue-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                  Best SG • Engineering Showcase & Delivery Model
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-200 hover:text-rose-300 border border-slate-700 text-xs font-bold transition-all shadow-sm"
                aria-label="Close video"
              >
                <X className="w-4 h-4" />
                <span>Close Video</span>
              </button>
            </div>

            {/* Video Frame */}
            <div className="aspect-video w-full bg-slate-950 relative flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1"
                title="Best SG Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-3.5 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close / Back to Home</span>
              </button>

              <a
                href="#start-project"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors"
              >
                Book a Technical Consultation
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
