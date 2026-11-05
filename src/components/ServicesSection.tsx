import { useEffect, useRef } from 'react';
import {
  Globe,
  ShoppingCart,
  Smartphone,
  Code2,
  Users,
  Zap,
  Shield,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 'offshore',
      icon: Globe,
      serviceName: 'Offshore Development',
      badge: 'High Velocity',
      title: 'Dedicated Offshore Development Pods',
      description:
        'Augment your engineering department with pre-vetted, full-stack software developers, QA specialists, and DevOps architects tailored to your exact tech stack.',
      features: [
        'Full-time senior engineers under your direct oversight',
        'Timezone aligned workflow (Singapore, US, Europe & Asia)',
        'Bi-weekly sprint demos with automated CI/CD pipelines',
        '40% to 55% reduction in total engineering overhead',
      ],
      tech: ['React / Next.js', 'Node.js', 'Python', 'AWS / GCP', 'Docker'],
      gradient: 'from-blue-600 to-cyan-500',
      lightBg: 'bg-blue-50/50 dark:bg-blue-950/20',
      borderHover: 'hover:border-blue-500/50',
    },
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      serviceName: 'E-Commerce Solutions',
      badge: 'High Conversion',
      title: 'Headless & Custom E-Commerce Platforms',
      description:
        'Deliver lightning-fast shopping experiences with omnichannel multi-currency checkouts, real-time inventory management, and tailored payment gateway integrations.',
      features: [
        'Headless Shopify Plus & custom React storefronts',
        'Stripe, PayPal, PayNow, and localized payment rails',
        'Automated order processing & multi-warehouse inventory',
        'High-concurrency flash sale optimization & caching',
      ],
      tech: ['Shopify Plus', 'Next.js Commerce', 'Stripe', 'GraphQL', 'Tailwind'],
      gradient: 'from-emerald-600 to-teal-500',
      lightBg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      borderHover: 'hover:border-emerald-500/50',
    },
    {
      id: 'webapp',
      icon: Smartphone,
      serviceName: 'Web App Development',
      badge: 'Modern Stack',
      title: 'Scalable Full-Stack Web Applications',
      description:
        'From high-load SaaS platforms to progressive web applications (PWA), we build responsive, cloud-native web apps that feel instantaneous across every device.',
      features: [
        'Progressive Web Apps (PWA) with offline-first capabilities',
        'Real-time data streaming via WebSockets & event brokers',
        'Micro-frontends & component design system architectures',
        'Enterprise RBAC permissions & single sign-on (SSO)',
      ],
      tech: ['TypeScript', 'React 19', 'Tailwind CSS', 'Redis', 'PostgreSQL'],
      gradient: 'from-purple-600 to-indigo-500',
      lightBg: 'bg-purple-50/50 dark:bg-purple-950/20',
      borderHover: 'hover:border-purple-500/50',
    },
    {
      id: 'custom',
      icon: Code2,
      serviceName: 'Custom Software',
      badge: 'Tailored Architecture',
      title: 'Custom Enterprise Software & API Systems',
      description:
        'Transform complex business operations with bespoke software systems, secure REST/GraphQL API bridges, and legacy system modernization.',
      features: [
        'Bespoke enterprise ERP, CRM, and workflow automations',
        'RESTful & GraphQL API integration with legacy platforms',
        'Automated unit, integration, and end-to-end regression testing',
        'Full source code ownership with zero vendor lock-in',
      ],
      tech: ['Node.js Express', 'REST / GraphQL', 'MongoDB', 'Kafka', 'Kubernetes'],
      gradient: 'from-amber-600 to-orange-500',
      lightBg: 'bg-amber-50/50 dark:bg-amber-950/20',
      borderHover: 'hover:border-amber-500/50',
    },
  ];

  const additionalServices = [
    {
      icon: Users,
      title: 'Pre-Vetted Senior Talent',
      desc: 'Top 3% engineers interviewed and tested on algorithm and system design standards.',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment (2 Weeks)',
      desc: 'Go from technical scoping to onboarding engineers in less than fourteen days.',
    },
    {
      icon: Shield,
      title: 'IP Protection & NDA',
      desc: 'Ironclad non-disclosure, confidentiality, and complete client copyright transfer.',
    },
    {
      icon: Headphones,
      title: '24/7 SRE & Maintenance',
      desc: 'Round-the-clock uptime monitoring, security patching, and on-call response.',
    },
  ];

  return (
    <section id="services" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Full-Lifecycle{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Software Engineering Services
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Delivering robust architectural design, rapid development cycles, and continuous scale for
            ambitious startups, SMEs, and global enterprises.
          </p>
        </div>

        {/* 4 Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${service.borderHover} animate-on-scroll flex flex-col justify-between`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white shadow-md`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 mb-6">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Pills & CTA */}
                <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {service.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#start-project"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 group"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Advantage Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-on-scroll">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white mb-2">{service.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Callout */}
        <div className="mt-8 text-center animate-on-scroll">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-6 sm:py-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Need a custom engineering pod or architecture evaluation?
            </span>
            <a href="#contact" className="accent-button text-xs font-bold">
              Schedule Free Tech Discovery Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
