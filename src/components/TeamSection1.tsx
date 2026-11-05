import { useCallback, useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Github, Mail, ShieldCheck, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

interface TeamMember {
  id?: number | string;
  name: string;
  title?: string;
  image?: string;
  bio?: string;
  skills?: string[];
  email?: string;
  availability?: string;
  social?: { linkedin?: string; twitter?: string; github?: string };
}

const curatedDefaultTeam: TeamMember[] = [
  {
    id: 't1',
    name: 'Sowkath Ali',
    title: 'Founder & Chief Technology Officer',
    image: '/teams/shaphoto.png',
    bio: '10+ years driving cross-border digital transformation, offshore engineering pod scaling, and high-performance software systems.',
    skills: ['Executive Strategy', 'System Architecture', 'Offshore Pod Scaling', 'FinTech Solutions'],
    email: 'shah@pbm.sg',
    availability: 'Available for Advisory',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 't2',
    name: 'Roselin Rubella',
    title: 'Lead Cloud & Full-Stack Architect',
    image: '/teams/Rubyphoto.jpeg',
    bio: 'Full-stack engineering leader specializing in resilient Node.js backends, scalable cloud infrastructure, and zero-downtime deployment pipelines.',
    skills: ['System Design', 'React / Next.js', 'Node.js Core', 'Cloud DevOps', 'PostgreSQL'],
    email: 'rn.bestsg2025@gmail.com',
    availability: 'Leading Engineering',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    id: 't3',
    name: 'Nancy Evanjelin',
    title: 'Senior Frontend & UI/UX Specialist',
    image: '/teams/nancyphoto.jfif',
    bio: 'Interface engineer dedicated to creating fluid, accessible digital user experiences with modern design system component standards.',
    skills: ['React 19', 'UI/UX Architecture', 'TypeScript', 'Tailwind CSS', 'Performance Tuning'],
    email: 'support@bestsg.com',
    availability: 'Designing Interfaces',
    social: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
];

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const Avatar = ({ member }: { member: TeamMember }) => {
  const [failed, setFailed] = useState(false);

  if (!member.image || failed) {
    return (
      <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
        {initials(member.name)}
      </div>
    );
  }

  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl overflow-hidden ring-4 ring-slate-100 dark:ring-slate-800 shadow-xl group-hover:ring-blue-500/50 transition-all duration-300">
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Online indicator */}
      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Online" />
    </div>
  );
};

const culture = [
  {
    icon: '⚡',
    title: 'Direct Engineering Access',
    text: 'Communicate directly with your dedicated developers via Slack/Teams with zero gatekeeper lag.',
  },
  {
    icon: '🛡️',
    title: 'Senior-Level Talent Density',
    text: 'Every team member passes rigorous algorithm, system architecture, and communication screenings.',
  },
  {
    icon: '💎',
    title: 'True Product Ownership',
    text: 'We do not just write code; we continuously propose architectural improvements and speed optimizations.',
  },
];

const TeamSection1 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(curatedDefaultTeam);

  const loadTeam = useCallback(async () => {
    try {
      const response = await fetch('/backend/get_team');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const processed = data.map((m: any) => ({
            ...m,
            image: m.image?.startsWith('http') || m.image?.startsWith('/') ? m.image : `/uploads/${m.image}`,
          }));
          setTeamMembers(processed);
        }
      }
    } catch {
      // Keep curated defaults
    }
  }, []);

  useEffect(() => {
    loadTeam();
    const id = setInterval(loadTeam, 30000);
    return () => clearInterval(id);
  }, [loadTeam]);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [teamMembers.length]);

  return (
    <section id="team" ref={sectionRef} className="py-12 sm:py-16 relative overflow-hidden bg-slate-50/60 dark:bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership & Engineering Talent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Meet The Minds Behind{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Your Digital Architecture
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Seasoned practitioners committed to building reliable, high-yield digital platforms for your business.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {teamMembers.map((member, index) => (
            <article
              key={member.id ?? index}
              className="rounded-2xl glass-card border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 animate-on-scroll group"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div>
                {/* Avatar with status */}
                <div className="mb-6">
                  <Avatar member={member} />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{member.availability || 'Active on Projects'}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                {member.title && (
                  <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    {member.title}
                  </p>
                )}

                {member.bio && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                )}

                {/* Skill Pills */}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social & Contact Actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-3">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social?.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} GitHub`}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Culture / Value Props Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8 sm:mb-10 animate-on-scroll">
          {culture.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 text-center"
            >
              <div className="text-3xl mb-2.5">{item.icon}</div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">{item.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-on-scroll">
          <div className="p-6 rounded-2xl glass-card border border-blue-200/80 dark:border-blue-900 max-w-2xl mx-auto bg-gradient-to-b from-blue-50/50 to-transparent">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Looking for a Dedicated Offshore Engineering Pod?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
              Tell us your requirements and we will assemble an engineering pod matching your exact stack in 14 days.
            </p>
            <a href="#start-project" className="hero-button text-xs sm:text-sm font-bold">
              <span>Request Team Profiles</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection1;
