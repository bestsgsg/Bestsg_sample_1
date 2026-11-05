import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, ShieldCheck, Home } from 'lucide-react';
import logo from '@/assets/logo1.png';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16">
      {/* Sticky Top Header with Clear Back & Close Buttons */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" title="Return to Home">
            <img src={logo} alt="Best SG" className="h-8 w-auto" />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Best SG
            </span>
          </Link>

          {/* Prominent Back to Main Page Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </Link>

            <Link
              to="/"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors"
              title="Close and return to Home"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <div className="glass-card rounded-3xl p-6 sm:p-12 border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-8">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Legal & Compliance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Privacy Policy & Data Protection
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            This Privacy Policy describes how <strong>Best SG</strong> collects, uses, and protects your information
            when you access our website, use our contact/project inquiry forms, or engage our offshore engineering services.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We collect information that you voluntarily provide to us when submitting project requirements, requesting technical consultations, or communicating with our team:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li><strong>Personal Identifiers</strong>: Full name, work email address, phone number, and company name.</li>
              <li><strong>Project Inquiries</strong>: Desired service category, estimated budget range, target deployment timelines, and project specifications.</li>
              <li><strong>Technical Diagnostic Data</strong>: IP address, browser type, device information, and interaction timestamps to ensure security and prevent denial-of-service abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li>To evaluate project feasibility and prepare architectural estimates and engineering proposals.</li>
              <li>To facilitate direct developer and project management communication.</li>
              <li>To execute mutual non-disclosure agreements (NDAs) and protect intellectual property.</li>
              <li>To monitor cloud infrastructure health, prevent fraud, and maintain compliance standards.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Non-Disclosure & IP Security</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We operate under strict confidentiality. We do not sell, rent, or trade your personal or project data to third parties. All proprietary codebase access, designs, and credentials provided during development engagements are governed by binding confidentiality agreements and standard ISO security protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Your Data Rights</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Under applicable data protection laws (including GDPR and Singapore PDPA), you have the right to request access, correction, or deletion of any personal information we retain. Contact our Data Protection Officer at <a href="mailto:shah@pbm.sg" className="text-blue-600 font-semibold underline">shah@pbm.sg</a> or <a href="mailto:rn.bestsg2025@gmail.com" className="text-blue-600 font-semibold underline">rn.bestsg2025@gmail.com</a>.
            </p>
          </section>

          {/* Bottom Return Bar */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Best SG Home</span>
            </Link>

            <span className="text-xs text-slate-500">
              © {new Date().getFullYear()} Best SG. All rights reserved.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
