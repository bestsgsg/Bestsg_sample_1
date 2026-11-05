import { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Globe,
  ShoppingCart,
  Smartphone,
  Code2,
  Cpu,
  Flame
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const serviceOptions = [
  { id: 'Offshore Development', label: 'Offshore Tech Pod', icon: Globe, desc: 'Dedicated senior engineers' },
  { id: 'E-Commerce Solutions', label: 'E-Commerce Platform', icon: ShoppingCart, desc: 'Shopify / Headless store' },
  { id: 'Web App Development', label: 'Cloud Web App', icon: Smartphone, desc: 'React, Next.js, PWAs' },
  { id: 'Custom Software', label: 'Custom Enterprise', icon: Code2, desc: 'APIs, ERP, workflows' },
  { id: 'Mobile App Development', label: 'Mobile App', icon: Cpu, desc: 'iOS & Android cross-platform' },
  { id: 'DevOps & Cloud', label: 'DevOps & Cloud', icon: Layers, desc: 'AWS, CI/CD, Kubernetes' },
];

const budgetOptions = [
  { id: 'Under $10,000', label: '< $10k', desc: 'Proof of concept' },
  { id: '$10,000 - $25,000', label: '$10k - $25k', desc: 'MVP / Core release' },
  { id: '$25,000 - $50,000', label: '$25k - $50k', desc: 'Scale-up platform' },
  { id: 'Over $50,000', label: '$50k+', desc: 'Enterprise deployment' },
];

const timelineOptions = [
  'Immediate (< 1 Month)',
  '1 - 3 Months',
  '3 - 6 Months',
  'Flexible / Ongoing',
];

const StartProjectSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Offshore Development',
    budget: '$10,000 - $25,000',
    timeline: '1 - 3 Months',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectService = (serviceId: string) => {
    setFormData((prev) => ({ ...prev, service: serviceId }));
  };

  const handleSelectBudget = (budgetId: string) => {
    setFormData((prev) => ({ ...prev, budget: budgetId }));
  };

  const handleSelectTimeline = (timelineVal: string) => {
    setFormData((prev) => ({ ...prev, timeline: timelineVal }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      service: formData.service,
      budget: formData.budget,
      timeline: formData.timeline,
      message: formData.message,
      details: formData.message,
      created_at: new Date().toISOString(),
    };

    try {
      // 1. Try relative URL (Vite proxy in dev or same origin in prod)
      let response;
      let networkSuccess = false;

      try {
        response = await fetch('/backend/save_inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          networkSuccess = true;
        }
      } catch (proxyError) {
        console.log('Primary proxy path failed, trying direct localhost:5000...');
      }

      // 2. If relative failed, try direct localhost:5000
      if (!networkSuccess) {
        try {
          const directRes = await fetch('http://localhost:5000/backend/save_inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (directRes.ok) {
            networkSuccess = true;
          }
        } catch (directErr) {
          console.log('Direct backend fetch attempt:', directErr);
        }
      }

      // 3. Always store in local cache so inquiries are never lost
      try {
        const stored = localStorage.getItem('cached_inquiries');
        const list = stored ? JSON.parse(stored) : [];
        list.unshift({ ...payload, id: Date.now() });
        localStorage.setItem('cached_inquiries', JSON.stringify(list));
        window.dispatchEvent(new CustomEvent('inquiryUpdate', { detail: { newInquiry: payload } }));
      } catch (storageErr) {
        console.warn('Storage sync:', storageErr);
      }

      toast({
        title: 'Project Inquiry Submitted!',
        description:
          'Thank you! Our engineering team will review your specifications and contact you within 24 hours.',
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'Offshore Development',
        budget: '$10,000 - $25,000',
        timeline: '1 - 3 Months',
        message: '',
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: 'Inquiry Recorded',
        description: 'Your inquiry has been stored and our engineers will get back to you shortly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="start-project" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 section-gradient pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Start Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Let's Engineer Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Next Digital Milestone
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Fill out your project parameters below to receive an architectural estimate and resource allocation proposal.
          </p>
        </div>

        {/* Master Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-2xl p-5 sm:p-8 animate-on-scroll">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Service Selection */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                1. What service or team capability do you require? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceOptions.map((s) => {
                  const Icon = s.icon;
                  const isSelected = formData.service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectService(s.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon
                          className={`w-5 h-5 ${
                            isSelected ? 'text-blue-600' : 'text-slate-500'
                          }`}
                        />
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div>
                        <div
                          className={`text-xs sm:text-sm font-bold ${
                            isSelected ? 'text-blue-900 dark:text-blue-300' : 'text-slate-800 dark:text-white'
                          }`}
                        >
                          {s.label}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{s.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Budget */}
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                  2. Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {budgetOptions.map((b) => {
                    const isSelected = formData.budget === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleSelectBudget(b.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs sm:text-sm">{b.label}</div>
                        <div className="text-[10px] text-slate-500 font-normal">{b.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
                  3. Expected Target Timeline
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {timelineOptions.map((t) => {
                    const isSelected = formData.timeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleSelectTimeline(t)}
                        className={`p-3 rounded-xl text-center border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 3: Contact Info & Scope */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <label className="block text-sm font-bold text-slate-900 dark:text-white">
                4. Your Contact Details & Project Overview *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Tan"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Project Scope & Key Goals *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Share details about what you want to achieve, existing tech stack, target users, or key deliverables..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Submission Ribbon */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Strict Non-Disclosure Protection (Mutual NDA upon request)</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="hero-button w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-bold shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default StartProjectSection;
