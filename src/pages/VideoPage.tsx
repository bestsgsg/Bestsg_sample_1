import React, { useEffect } from 'react';
import { ArrowLeft, Play, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo1.png';

const VideoPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" title="Return to Home">
            <img src={logo} alt="Best SG" className="h-8 w-auto" />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Best SG
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Page</span>
            </Link>

            <Link
              to="/"
              className="p-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close and return to Home"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Video Presentation */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Play className="w-3.5 h-3.5 fill-blue-400" />
            <span>Product Demonstration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Best SG • Engineering Showcase & Delivery Model
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            A comprehensive look at our offshore dedicated engineering pods, cloud deployments, and agile workflows.
          </p>
        </div>

        <div className="aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 mb-8">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1"
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div>
            <h3 className="font-bold text-white text-base">Ready to start your software project?</h3>
            <p className="text-xs text-slate-400 mt-0.5">We provide dedicated senior engineers within 14 days.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl border border-slate-600 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <a
              href="/#start-project"
              className="hero-button text-xs font-bold py-2.5 px-5"
            >
              Request Tech Consultation
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
