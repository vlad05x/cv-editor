import { forwardRef } from 'react';
import { Mail, Phone, MapPin, MonitorPlay } from 'lucide-react';
import type { CVData } from '../data/cvData';

// Lightweight customized brand icons matching Lucide stroke style
const Github = ({ size = 14, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 14, className }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface CVPreviewProps {
  data: CVData;
  photoUrl: string | null;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data, photoUrl }, ref) => {
  const { customization } = data;
  const theme = customization?.themeColor || 'sapphire';
  const fontFamily = customization?.fontFamily || 'sans';
  const density = customization?.density || 'normal';
  const layout = customization?.layoutStyle || 'classic';

  // Curated theme mapping (CSS values)
  const themeStyles = {
    sapphire: {
      primary: 'bg-blue-900',
      primaryText: 'text-blue-900',
      border: 'border-blue-200',
      bgLight: 'bg-blue-50/50',
      badge: 'bg-blue-50 text-blue-700 border-blue-100',
      bullet: 'bg-blue-600',
      line: 'border-blue-100',
      headerBg: 'bg-slate-900',
      accentText: 'text-blue-600'
    },
    emerald: {
      primary: 'bg-emerald-900',
      primaryText: 'text-emerald-900',
      border: 'border-emerald-200',
      bgLight: 'bg-emerald-50/50',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      bullet: 'bg-emerald-600',
      line: 'border-emerald-100',
      headerBg: 'bg-emerald-950',
      accentText: 'text-emerald-600'
    },
    bronze: {
      primary: 'bg-amber-900',
      primaryText: 'text-amber-900',
      border: 'border-amber-200',
      bgLight: 'bg-amber-50/40',
      badge: 'bg-amber-50 text-amber-800 border-amber-100',
      bullet: 'bg-amber-700',
      line: 'border-amber-100',
      headerBg: 'bg-stone-900',
      accentText: 'text-amber-700'
    },
    obsidian: {
      primary: 'bg-slate-800',
      primaryText: 'text-slate-800',
      border: 'border-slate-200',
      bgLight: 'bg-slate-50',
      badge: 'bg-slate-100 text-slate-700 border-slate-200',
      bullet: 'bg-slate-700',
      line: 'border-slate-200',
      headerBg: 'bg-slate-900',
      accentText: 'text-slate-600'
    }
  }[theme as 'sapphire' | 'emerald' | 'bronze' | 'obsidian'];

  const fontClasses = {
    sans: 'font-sans tracking-normal',
    outfit: "font-['Outfit'] font-light tracking-wide",
    serif: "font-['Lora'] tracking-normal leading-relaxed"
  }[fontFamily as 'sans' | 'outfit' | 'serif'];

  // Density Scaling
  const densityStyles = {
    compact: {
      padding: 'p-6 gap-4',
      sectionGap: 'space-y-3',
      text: 'text-[11px] leading-[1.4]',
      h1: 'text-2xl',
      h2: 'text-base',
      h3: 'text-xs uppercase tracking-wider font-bold mb-1.5',
      h4: 'text-[12px] font-bold',
      listItemGap: 'space-y-1.5',
      headerHeight: 'h-[160px]',
      photoSize: 'w-[140px]',
      badgePadding: 'px-1.5 py-0.5 text-[9px]'
    },
    normal: {
      padding: 'p-8 gap-6',
      sectionGap: 'space-y-5',
      text: 'text-[13px] leading-relaxed',
      h1: 'text-3xl font-extrabold',
      h2: 'text-lg text-slate-300 font-medium',
      h3: 'text-sm uppercase tracking-widest font-extrabold mb-3 border-b pb-1.5',
      h4: 'text-sm font-bold',
      listItemGap: 'space-y-3.5',
      headerHeight: 'h-[190px]',
      photoSize: 'w-[170px]',
      badgePadding: 'px-2 py-0.5 text-[10px]'
    },
    relaxed: {
      padding: 'p-10 gap-8',
      sectionGap: 'space-y-7',
      text: 'text-[14px] leading-loose',
      h1: 'text-4xl font-extrabold',
      h2: 'text-xl text-slate-300',
      h3: 'text-base uppercase tracking-widest font-extrabold mb-4 border-b pb-2',
      h4: 'text-base font-bold',
      listItemGap: 'space-y-5',
      headerHeight: 'h-[210px]',
      photoSize: 'w-[190px]',
      badgePadding: 'px-2.5 py-1 text-[11px]'
    }
  }[density as 'compact' | 'normal' | 'relaxed'];

  // Helper Elements to avoid code duplication
  const ProfileSummary = () => (
    <section>
      <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Profile</h3>
      <p className="text-slate-600 font-light">{data.personalInfo.profileSummary}</p>
    </section>
  );

  const SkillsSection = () => (
    <section>
      <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Technical Skills</h3>
      <div className="space-y-3">
        {data.skills.frontend.length > 0 && (
          <div className="print-avoid-break">
            <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1.5">Frontend</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.frontend.map(skill => (
                <span key={skill} className={`${densityStyles.badgePadding} rounded-md font-medium border ${themeStyles.badge}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.skills.backend.length > 0 && (
          <div className="print-avoid-break">
            <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1.5">Backend</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.backend.map(skill => (
                <span key={skill} className={`${densityStyles.badgePadding} rounded-md font-medium border ${themeStyles.badge}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.skills.other.length > 0 && (
          <div className="print-avoid-break">
            <h4 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-1.5">Other / DevOps</h4>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.other.map(skill => (
                <span key={skill} className={`${densityStyles.badgePadding} rounded-md font-medium border ${themeStyles.badge}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const LanguagesSection = () => {
    if (!data.languages || data.languages.length === 0) return null;
    return (
      <section>
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Languages</h3>
        <div className="space-y-2">
          {data.languages.map(lang => (
            <div key={lang.name} className="flex justify-between items-center text-slate-700 print-avoid-break">
              <span className="font-medium">{lang.name}</span>
              <span className="text-[10px] px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-slate-500 font-semibold">{lang.level}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const SoftSkillsSection = () => {
    if (!data.softSkills) return null;
    return (
      <section>
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Soft Skills</h3>
        <p className="text-slate-600 font-light">{data.softSkills}</p>
      </section>
    );
  };

  const HowIWorkSection = () => {
    if (!data.howIWork || data.howIWork.length === 0) return null;
    return (
      <section>
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>How I Work</h3>
        <ul className="text-slate-600 font-light text-[12px] space-y-2 list-none m-0 p-0">
          {data.howIWork.map((item, idx) => (
            <li key={idx} className="relative pl-3">
              <span className={`absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full ${themeStyles.bullet} opacity-70`} />
              {item}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  const EducationSection = () => {
    if (!data.education || data.education.length === 0) return null;
    return (
      <section>
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Education</h3>
        <div className="space-y-4">
          {data.education.map((edu, idx) => (
            <div key={idx} className="relative pl-4 border-l border-slate-200 print-avoid-break">
              {/* Little bullet point */}
              <div className={`absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full ${themeStyles.bullet}`} />
              <h4 className="font-bold text-slate-800 leading-tight">{edu.degree}</h4>
              <p className="text-slate-600 text-xs font-medium">{edu.institution}</p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">{edu.period}</p>
              {edu.details && edu.details.length > 0 && (
                <ul className="list-disc list-outside ml-3 mt-1.5 text-slate-500 text-[11px] space-y-0.5">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="font-light">{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const WorkExperienceSection = () => {
    if (!data.workExperience || data.workExperience.length === 0) return null;
    return (
      <section>
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Work Experience</h3>
        <div className={densityStyles.listItemGap}>
          {data.workExperience.map((exp, idx) => (
            <div key={idx} className="relative pl-4 border-l-2 border-slate-200 print-avoid-break">
              {/* Timeline dot */}
              <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-white ${themeStyles.bullet} shadow-sm`} />

              {/* Position */}
              <h4 className="text-[14px] font-extrabold text-slate-800 leading-tight">{exp.position}</h4>

              {/* Company + Location row */}
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`text-[11px] font-bold ${themeStyles.accentText}`}>{exp.company}</span>
                {exp.location && (
                  <>
                    <span className="text-slate-300 text-[10px]">·</span>
                    <span className="text-[10px] text-slate-500 font-medium">{exp.location}</span>
                  </>
                )}
              </div>

              {/* Period badge */}
              <span className={`inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${themeStyles.badge} border`}>
                {exp.period}
              </span>

              {/* Bullet responsibilities */}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2 text-slate-600 text-[12px] font-light leading-relaxed">
                      <span className={`mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0 ${themeStyles.bullet} opacity-70`} />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  const ProjectsSection = () => {
    if (!data.projects || data.projects.length === 0) return null;
    return (
      <section className="print:block">
        <h3 className={`${densityStyles.h3} ${themeStyles.primaryText} ${themeStyles.border}`}>Technical Proficiencies</h3>
        <div className={densityStyles.listItemGap}>
          {data.projects.map((project, idx) => (
            <div key={idx} className={`border ${themeStyles.border} ${themeStyles.bgLight} rounded-2xl p-4 flex flex-col gap-2.5 transition-all print-avoid-break`}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-[15px] font-extrabold text-slate-800 leading-tight">{project.name}</h4>
                </div>
                <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-1.5 py-0.5 bg-white text-slate-600 rounded-md text-[9px] font-bold border border-slate-200 uppercase tracking-wide">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-600 font-light text-[12px] leading-relaxed">{project.description}</p>
              <div className="flex justify-between items-center border-t border-dashed border-slate-200/60 pt-2 mt-1">
                <span className="text-[10px] text-slate-400 font-medium italic">
                  Tech stack: {project.technologies.join(', ')}
                </span>
                {project.link && project.link !== "#" ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1 text-[10px] font-bold ${themeStyles.accentText} hover:underline transition-all`}
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                  </a>
                ) : (
                  <span className="text-[10px] text-slate-300 italic">No link</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const HeaderContacts = ({ layoutGrid = false }: { layoutGrid?: boolean }) => (
    <div className={layoutGrid ? "grid grid-cols-2 gap-y-2 gap-x-6 text-[12px] text-slate-300" : "flex flex-wrap gap-y-2 gap-x-4 text-[12px] text-slate-300"}>
      <div className="flex items-center gap-2">
        <Mail size={12} className="text-slate-400" />
        <a href={`mailto:${data.personalInfo.email}`} className="font-light hover:text-white transition-colors">{data.personalInfo.email}</a>
      </div>
      <div className="flex items-center gap-2">
        <Phone size={12} className="text-slate-400" />
        <a href={`tel:${data.personalInfo.phone}`} className="font-light hover:text-white transition-colors">{data.personalInfo.phone}</a>
      </div>
      <div className="flex items-center gap-2">
        <MapPin size={12} className="text-slate-400" />
        <span className="font-light">{data.personalInfo.location}</span>
      </div>
      {data.personalInfo.portfolio && (
        <div className="flex items-center gap-2">
          <MonitorPlay size={12} className="text-slate-400" />
          <a 
            href={data.personalInfo.portfolio.startsWith('http') ? data.personalInfo.portfolio : `https://${data.personalInfo.portfolio}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white underline font-light"
          >
            Portfolio
          </a>
        </div>
      )}
      {data.personalInfo.linkedin && (
        <div className="flex items-center gap-2">
          <Linkedin size={12} className="text-slate-400" />
          <a 
            href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white underline font-light"
          >
            LinkedIn
          </a>
        </div>
      )}
      {data.personalInfo.github && (
        <div className="flex items-center gap-2">
          <Github size={12} className="text-slate-400" />
          <a 
            href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white underline font-light"
          >
            GitHub
          </a>
        </div>
      )}
    </div>
  );

  // --- RENDER LAYOUTS ---

  // 1. CLASSIC SPLIT COLUMN LAYOUT
  if (layout === 'classic') {
    return (
      <div ref={ref} className={`a4-page flex flex-col ${fontClasses} ${densityStyles.text} bg-slate-50`}>
        {/* Header */}
        <header className={`${themeStyles.headerBg} text-white flex ${densityStyles.headerHeight} shadow-md overflow-hidden flex-shrink-0`}>
          {/* Photo Container */}
          <div className={`${densityStyles.photoSize} h-full flex-shrink-0 bg-slate-800/80 border-r border-slate-800`}>
            {photoUrl ? (
              <img src={photoUrl} alt={data.personalInfo.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                Profile Photo
              </div>
            )}
          </div>
          
          {/* Header Info */}
          <div className="flex-1 p-6 flex flex-col justify-center gap-1.5">
            <h1 className={`${densityStyles.h1} font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent`}>{data.personalInfo.name}</h1>
            <h2 className={`${densityStyles.h2} text-blue-400 tracking-wide font-medium`}>{data.personalInfo.title}</h2>
            <div className="h-px bg-gradient-to-r from-slate-700/60 to-transparent my-1.5" />
            <HeaderContacts layoutGrid={true} />
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="w-[280px] p-6 border-r border-slate-200 flex flex-col gap-5 bg-white">
            <ProfileSummary />
            <SkillsSection />
            <LanguagesSection />
            <SoftSkillsSection />
            <HowIWorkSection />
            <EducationSection />
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 bg-slate-50 flex flex-col gap-6">
            <WorkExperienceSection />
            <ProjectsSection />
          </div>
        </div>
      </div>
    );
  }

  // 2. MODERN TOP-BANNER LAYOUT
  if (layout === 'modern') {
    return (
      <div ref={ref} className={`a4-page flex flex-col ${fontClasses} ${densityStyles.text} bg-white`}>
        {/* Modern Large Banner Header */}
        <header className={`${themeStyles.headerBg} text-white p-8 flex flex-col gap-4 overflow-hidden flex-shrink-0 relative`}>
          {/* Decorative backdrop glow */}
          <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
            {/* Round Avatar Frame */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400/80 shadow-lg bg-slate-800 flex-shrink-0">
              {photoUrl ? (
                <img src={photoUrl} alt={data.personalInfo.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase text-[9px]">
                  Photo
                </div>
              )}
            </div>
            <div>
              <h1 className={`${densityStyles.h1} font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent`}>{data.personalInfo.name}</h1>
              <h2 className={`${densityStyles.h2} text-blue-400 tracking-wide font-medium mt-0.5`}>{data.personalInfo.title}</h2>
            </div>
          </div>
          <div className="h-px bg-slate-700/60 my-0.5" />
          <HeaderContacts layoutGrid={false} />
        </header>

        {/* Two-Column Side Content below */}
        <div className="flex flex-1">
          {/* Main larger panel (Left side in Modern) */}
          <div className="flex-1 p-6 flex flex-col gap-5 border-r border-slate-100 bg-white">
            <ProfileSummary />
            <WorkExperienceSection />
            <ProjectsSection />
          </div>
          
          {/* Side smaller panel (Right side in Modern) */}
          <div className="w-[280px] p-6 flex flex-col gap-5 bg-slate-50/50">
            <SkillsSection />
            <EducationSection />
            <LanguagesSection />
            <SoftSkillsSection />
            <HowIWorkSection />
          </div>
        </div>
      </div>
    );
  }

  // 3. MINIMALIST SINGLE COLUMN LAYOUT
  return (
    <div ref={ref} className={`a4-page flex flex-col ${fontClasses} ${densityStyles.text} bg-white p-8 gap-5 relative`}>
      {/* Header Info */}
      <header className="flex justify-between items-start border-b-2 border-slate-900 pb-4 flex-shrink-0">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase">{data.personalInfo.name}</h1>
          <h2 className={`text-sm font-bold uppercase tracking-wider ${themeStyles.accentText} mt-1`}>{data.personalInfo.title}</h2>
          <div className="mt-3 flex flex-wrap gap-y-1.5 gap-x-4 text-[11px] text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Mail size={11} className="text-slate-400" />
              <a href={`mailto:${data.personalInfo.email}`} className="hover:text-slate-900 transition-colors">{data.personalInfo.email}</a>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone size={11} className="text-slate-400" />
              <a href={`tel:${data.personalInfo.phone}`} className="hover:text-slate-900 transition-colors">{data.personalInfo.phone}</a>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-slate-400" />
              <span>{data.personalInfo.location}</span>
            </div>
            {data.personalInfo.portfolio && (
              <div className="flex items-center gap-1.5">
                <MonitorPlay size={11} className="text-slate-400" />
                <a 
                  href={data.personalInfo.portfolio.startsWith('http') ? data.personalInfo.portfolio : `https://${data.personalInfo.portfolio}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-slate-900 underline transition-colors"
                >
                  Portfolio
                </a>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin size={11} className="text-slate-400" />
                <a 
                  href={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-slate-900 underline transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1.5">
                <Github size={11} className="text-slate-400" />
                <a 
                  href={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-slate-900 underline transition-colors"
                >
                  GitHub
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Small Elegant square photo */}
        {photoUrl && (
          <div className="w-16 h-16 border-2 border-slate-950/80 rounded-md overflow-hidden bg-slate-100 flex-shrink-0 ml-4">
            <img src={photoUrl} alt={data.personalInfo.name} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Profile */}
      <section>
        <p className="text-slate-700 italic font-light leading-relaxed">{data.personalInfo.profileSummary}</p>
      </section>

      {/* Horizontal grid layout for Skills & Education side by side, and Projects below */}
      <div className="grid grid-cols-3 gap-6 border-t border-slate-200 pt-4">
        
        {/* Left Column (Skills & Languages) */}
        <div className="col-span-1 flex flex-col gap-5 border-r border-slate-100 pr-4">
          <SkillsSection />
          <LanguagesSection />
          <SoftSkillsSection />
          <HowIWorkSection />
        </div>

        {/* Right Columns (Projects & Education) */}
        <div className="col-span-2 flex flex-col gap-6">
          <WorkExperienceSection />
          <ProjectsSection />
          <EducationSection />
        </div>
      </div>
    </div>
  );
});

CVPreview.displayName = 'CVPreview';
