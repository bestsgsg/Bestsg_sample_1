import { useEffect, useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Copy,
  Check,
  Send,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  Globe2
} from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [singaporeTime, setSingaporeTime] = useState('');
  const [indiaTime, setIndiaTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setSingaporeTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Singapore',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now)
      );
      setIndiaTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(now)
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const offices = [
    {
      country: 'Singapore (Global Headquarters)',
      city: 'Singapore',
      flag: '🇸🇬',
      phone: '+65 9796 9414',
      phoneRaw: '+6597969414',
      email: 'shah@pbm.sg',
      time: singaporeTime,
      tzLabel: 'SGT (UTC+8)',
      address: 'Innovation & Tech District, Singapore',
    },
    {
      country: 'India (Technology & Delivery Center)',
      city: 'Bangalore / Tamil Nadu',
      flag: '🇮🇳',
      phone: '+91 99163 97739',
      phoneRaw: '+919916397739',
      email: 'rn.bestsg2025@gmail.com',
      time: indiaTime,
      tzLabel: 'IST (UTC+5:30)',
      address: 'Tech Corridor, South India',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Discovery & Feasibility',
      desc: 'We analyze your functional specs, user requirements, and technical constraints.',
    },
    {
      step: '02',
      title: 'Architecture & Sizing',
      desc: 'Detailed architectural blueprints, team pod composition, and fixed sprint roadmaps.',
    },
    {
      step: '03',
      title: 'Agile Build & CI/CD',
      desc: 'Iterative 2-week sprint releases with automated testing, live demos, and code reviews.',
    },
    {
      step: '04',
      title: 'Deployment & SLA Support',
      desc: 'Zero-downtime production deployment, security sign-off, and continuous 24/7 SRE care.',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden bg-slate-50/60 dark:bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Connect With Our{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Engineering Leadership
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Reach out directly to schedule a technical architecture assessment or discuss offshore team availability.
          </p>
        </div>

        {/* 2-Column Split: Offices & Process */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Left Column: Office Hubs */}
          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span>Global Operational Hubs</span>
            </h3>

            {offices.map((office, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{office.flag}</span>
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{office.country}</h4>
                      <div className="text-xs text-slate-500">{office.city}</div>
                    </div>
                  </div>

                  {/* Live Clock Pill */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{office.time}</span>
                    <span className="text-[10px] text-slate-400">({office.tzLabel})</span>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
                  {/* Phone */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <a href={`tel:${office.phoneRaw}`} className="hover:text-blue-600 font-semibold font-mono">
                        {office.phone}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(office.phoneRaw, `phone-${idx}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Copy Phone"
                    >
                      {copiedText === `phone-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Mail className="w-4 h-4 text-indigo-600" />
                      <a href={`mailto:${office.email}`} className="hover:text-blue-600 font-medium">
                        {office.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(office.email, `email-${idx}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                      title="Copy Email"
                    >
                      {copiedText === `email-${idx}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{office.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: 4-Stage Delivery Blueprint */}
          <div className="space-y-6 animate-on-scroll">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Transparent Delivery Blueprint</span>
            </h3>

            <div className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
              {steps.map((st, sIdx) => (
                <div key={sIdx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                    {st.step}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{st.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Guarantees */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto animate-on-scroll">
          {[
            { title: '&lt; 2h Response SLA', desc: 'Rapid technical assessment' },
            { title: 'Free Technical Discovery', desc: 'Zero obligation architecture call' },
            { title: 'Mutual NDA Protection', desc: 'Full confidential discussion' },
            { title: '100% Code Ownership', desc: 'Complete IP rights transfer' },
          ].map((g, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{g.title}</h5>
                <p className="text-[11px] text-slate-500">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
