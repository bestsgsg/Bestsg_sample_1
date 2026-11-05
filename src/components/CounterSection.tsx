import { useState, useEffect, useRef } from 'react';
import { Award, Zap, Shield, Sparkles, TrendingUp, CheckCircle, Globe2, Clock } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          let start = 0;
          const totalFrames = duration * 60;
          const increment = end / totalFrames;

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 1000 / 60);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return (
    <span ref={counterRef} className="font-mono tracking-tight font-extrabold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const CounterSection = () => {
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

  const stats = [
    {
      number: 500,
      suffix: '+',
      label: 'Production Deliveries',
      desc: 'High-availability web applications, e-commerce storefronts & custom portals',
      trend: '+42% this year',
      color: 'text-blue-600',
    },
    {
      number: 98,
      suffix: '.8%',
      label: 'Client Satisfaction',
      desc: 'Based on post-launch QA audits and SLA adherence over 5 continuous years',
      trend: 'Top 1% Agency',
      color: 'text-emerald-600',
    },
    {
      number: 50,
      suffix: '+',
      label: 'Senior Engineers',
      desc: 'Full-stack software architects, cloud engineers, and technical product leads',
      trend: 'Vetted Talent',
      color: 'text-indigo-600',
    },
    {
      number: 14,
      suffix: '+',
      label: 'Countries Served',
      desc: 'Delivering cross-border digital products across APAC, Europe, and the Americas',
      trend: 'Global Footprint',
      color: 'text-cyan-600',
    },
    {
      number: 99,
      suffix: '.99%',
      label: 'Cloud Infrastructure Uptime',
      desc: 'Enterprise SLA uptime on AWS, GCP, and Cloudflare enterprise edge networks',
      trend: 'Zero Unplanned Outages',
      color: 'text-blue-600',
    },
    {
      number: 100,
      suffix: '%',
      label: 'Source Code Ownership',
      desc: 'Complete IP rights transfer upon delivery with zero licensing locks',
      trend: '100% Client-Owned',
      color: 'text-emerald-600',
    },
  ];

  const deliveryHubs = [
    { city: 'Singapore (HQ)', role: 'Strategic Advisory & Project Management', flag: '🇸🇬', timezone: 'SGT (UTC+8)' },
    { city: 'Bangalore, India', role: 'Advanced Engineering & Cloud Architecture', flag: '🇮🇳', timezone: 'IST (UTC+5:30)' },
    { city: 'London, UK', role: 'European Client Operations', flag: '🇬🇧', timezone: 'GMT (UTC+0)' },
    { city: 'San Francisco, USA', role: 'North American Tech Partnerships', flag: '🇺🇸', timezone: 'PST (UTC-8)' },
  ];

  return (
    <section id="impact" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden bg-slate-50/60 dark:bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Measurable Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Quantifiable Results That{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Define Our Standard
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We measure our success by the stability, velocity, and business profitability of the systems we build.
          </p>
        </div>

        {/* 6 Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 sm:mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-on-scroll flex flex-col justify-between"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                    {stat.trend}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>

                <div className={`text-4xl sm:text-5xl font-extrabold ${stat.color} mb-3`}>
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stat.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-500">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified performance metric</span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Delivery Footprint Visualizer */}
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 mb-8 sm:mb-10 animate-on-scroll">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
                <Globe2 className="w-4 h-4" />
                <span>Global Presence & Support Coverage</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Distributed Worldwide, Connected In Real Time
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span>24/7 Overlapping Engineering Shifts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliveryHubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-blue-400/50 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{hub.flag}</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{hub.city}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">{hub.role}</p>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {hub.timezone}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Trust Seals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-on-scroll">
          {[
            { icon: Award, title: 'Award Winning Quality', desc: 'Strict coding guidelines' },
            { icon: Zap, title: '2-Week Sprint Cadence', desc: 'Rapid iterative releases' },
            { icon: Shield, title: 'ISO 27001 Security', desc: 'Secure data handling' },
            { icon: Sparkles, title: 'Direct Team Access', desc: 'No intermediate gatekeepers' },
          ].map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{badge.title}</h5>
                  <p className="text-[11px] text-slate-500">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
