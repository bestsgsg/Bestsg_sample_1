import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CounterSection from '@/components/CounterSection';
import PortfolioSection from '@/components/PortfolioSection';
import StartProjectSection from '@/components/StartProjectSection';
import ContactSection from '@/components/ContactSection';
import ParticleSystem from '@/components/ParticleSystem';
import TeamSection1 from '@/components/TeamSection1';
import logo from '@/assets/logo1.png';
import { ArrowUp, ShieldCheck, Heart, Lock } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100">
      {/* Ambient Lighting & Canvas Particles */}
      <ParticleSystem />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <CounterSection />
        <PortfolioSection />
        <TeamSection1 />
        <StartProjectSection />
        <ContactSection />
      </main>

      {/* Enterprise Footer */}
      <footer className="relative z-10 bg-white/90 dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 pt-10 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Best SG" className="h-9 w-auto" />
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  Best SG
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Empowering international businesses with dedicated offshore development pods, custom
                e-commerce platforms, and resilient cloud web applications.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational (99.99%)</span>
              </div>
            </div>

            {/* Col 2: Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Capabilities
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Offshore Tech Pods
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Headless E-Commerce
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Cloud Web Apps (PWA)
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Enterprise Software & APIs
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    DevOps & SRE Maintenance
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#home" className="hover:text-blue-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-600 transition-colors">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#impact" className="hover:text-blue-600 transition-colors">
                    Measurable Impact
                  </a>
                </li>
                <li>
                  <a href="#portfolio" className="hover:text-blue-600 transition-colors">
                    Project Showcase
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-blue-600 transition-colors">
                    Leadership & Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600 transition-colors">
                    Contact Channels
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Portal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/privacy-policy" className="hover:text-blue-600 transition-colors">
                    Privacy Policy & GDPR
                  </Link>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600 transition-colors">
                    Security & Compliance
                  </a>
                </li>
                <li>
                  <a href="#start-project" className="hover:text-blue-600 transition-colors">
                    Request a Proposal
                  </a>
                </li>
                <li className="pt-2">
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 text-xs font-semibold"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Staff Portal</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Best SG. All rights reserved. Engineering high-impact digital systems.</p>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Enterprise SLA Protected</span>
              </span>

              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-blue-600 hover:bg-slate-200 transition-colors"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
