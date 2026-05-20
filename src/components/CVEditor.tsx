import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { CVData } from '../data/cvData';
import { 
  Upload, 
  User, 
  Sparkles, 
  Briefcase, 
  GraduationCap, 
  Languages as LangIcon, 
  Compass, 
  Plus, 
  Trash2, 
  ChevronDown,
  Building2
} from 'lucide-react';

interface CVEditorProps {
  data: CVData;
  onChange: (data: CVData) => void;
  onPhotoUpload: (file: File) => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ data, onChange, onPhotoUpload }) => {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [name]: value }
    });
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  const handleSingleSkillChange = (category: keyof CVData['skills'], index: number, value: string) => {
    const updatedCategory = [...data.skills[category]];
    updatedCategory[index] = value;
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: updatedCategory
      }
    });
  };

  const addSkill = (category: keyof CVData['skills']) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: [...data.skills[category], ""]
      }
    });
  };

  const deleteSkill = (category: keyof CVData['skills'], index: number) => {
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: data.skills[category].filter((_, idx) => idx !== index)
      }
    });
  };

  const handleSoftSkillsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...data,
      softSkills: e.target.value
    });
  };

  // Generic List item helpers for Projects, Education, and Languages

  // --- PROJECTS ---
  const addProject = () => {
    const newProject = {
      name: "New Project",
      technologies: ["React", "TypeScript"],
      description: "Describe what you built and the impact it achieved.",
      link: "#"
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (index: number, key: string, value: any) => {
    const updated = data.projects.map((proj, idx) => {
      if (idx === index) {
        if (key === 'technologies') {
          return { ...proj, [key]: value.split(',').map((t: string) => t.trim()).filter(Boolean) };
        }
        return { ...proj, [key]: value };
      }
      return proj;
    });
    onChange({ ...data, projects: updated });
  };

  const deleteProject = (index: number) => {
    onChange({
      ...data,
      projects: data.projects.filter((_, idx) => idx !== index)
    });
  };

  // --- EDUCATION ---
  const addEducation = () => {
    const newEdu = {
      degree: "Degree / Certificate",
      institution: "School or University Name",
      period: "2024 - Present",
      details: []
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (index: number, key: string, value: any) => {
    const updated = data.education.map((edu, idx) => {
      if (idx === index) {
        if (key === 'details') {
          return { ...edu, [key]: value.split('\n').map((l: string) => l.trim()).filter(Boolean) };
        }
        return { ...edu, [key]: value };
      }
      return edu;
    });
    onChange({ ...data, education: updated });
  };

  const deleteEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, idx) => idx !== index)
    });
  };

  // --- LANGUAGES ---
  const addLanguage = () => {
    const newLang = { name: "New Language", level: "Intermediate / B1" };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (index: number, key: 'name' | 'level', value: string) => {
    const updated = data.languages.map((lang, idx) => {
      if (idx === index) {
        return { ...lang, [key]: value };
      }
      return lang;
    });
    onChange({ ...data, languages: updated });
  };

  const deleteLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, idx) => idx !== index)
    });
  };

  // --- WORK EXPERIENCE ---
  const addWorkExperience = () => {
    const newExp = {
      position: "Job Title",
      company: "Company Name",
      location: "City, Country",
      period: "2023 - Present",
      responsibilities: ["Describe your key achievement or responsibility here"]
    };
    onChange({
      ...data,
      workExperience: [...(data.workExperience ?? []), newExp]
    });
  };

  const updateWorkExperience = (index: number, key: string, value: string) => {
    const updated = (data.workExperience ?? []).map((exp, idx) => {
      if (idx !== index) return exp;
      if (key === 'responsibilities') {
        return { ...exp, responsibilities: value.split('\n').map((l: string) => l.trim()).filter(Boolean) };
      }
      return { ...exp, [key]: value };
    });
    onChange({ ...data, workExperience: updated });
  };

  const deleteWorkExperience = (index: number) => {
    onChange({
      ...data,
      workExperience: (data.workExperience ?? []).filter((_, idx) => idx !== index)
    });
  };

  // Accordion Header Component
  const AccordionHeader = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => {
    const isOpen = activeSection === id;
    return (
      <button
        onClick={() => toggleSection(id)}
        className={`w-full flex items-center justify-between p-4 font-semibold text-sm transition-all border-b border-slate-800 cursor-pointer ${
          isOpen 
            ? 'bg-slate-800/60 text-blue-400' 
            : 'bg-slate-900 text-slate-300 hover:bg-slate-800/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={16} className={isOpen ? 'text-blue-400' : 'text-slate-400'} />
          <span>{label}</span>
        </div>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'text-slate-500'}`} />
      </button>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-slate-900/40 flex flex-col w-full">
      {/* Photo Upload Zone (Separate static section on top for quick access) */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/40">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Profile Photo</label>
        <div className="flex items-center gap-4">
          <label className="flex items-center justify-center w-full px-4 py-4 bg-slate-800/40 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl cursor-pointer hover:bg-slate-800/80 transition-all group">
            <div className="flex items-center gap-3">
              <Upload size={16} className="text-slate-400 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
              <span className="text-xs text-slate-300 group-hover:text-white font-medium">Upload new photo</span>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex-1">
        
        {/* PERSONAL INFO */}
        <div>
          <AccordionHeader id="personal" label="Personal Details" icon={User} />
          <div className={`accordion-content ${activeSection === 'personal' ? 'open p-5' : ''}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label-premium">Full Name</label>
                <input type="text" name="name" value={data.personalInfo.name} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div className="col-span-2">
                <label className="label-premium">Professional Title</label>
                <input type="text" name="title" value={data.personalInfo.title} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div>
                <label className="label-premium">Email</label>
                <input type="email" name="email" value={data.personalInfo.email} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div>
                <label className="label-premium">Phone</label>
                <input type="text" name="phone" value={data.personalInfo.phone} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div className="col-span-2">
                <label className="label-premium">Location</label>
                <input type="text" name="location" value={data.personalInfo.location} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div>
                <label className="label-premium">Portfolio Link</label>
                <input type="text" name="portfolio" value={data.personalInfo.portfolio} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div>
                <label className="label-premium">LinkedIn</label>
                <input type="text" name="linkedin" value={data.personalInfo.linkedin} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div className="col-span-2">
                <label className="label-premium">GitHub</label>
                <input type="text" name="github" value={data.personalInfo.github} onChange={handlePersonalInfoChange} className="input-premium" />
              </div>
              <div className="col-span-2">
                <label className="label-premium">Summary Profile</label>
                <textarea 
                  name="profileSummary" 
                  value={data.personalInfo.profileSummary} 
                  onChange={handlePersonalInfoChange} 
                  rows={4} 
                  className="input-premium resize-none" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div>
          <AccordionHeader id="skills" label="Technical Skills" icon={Sparkles} />
          <div className={`accordion-content ${activeSection === 'skills' ? 'open p-5' : ''}`}>
            <div className="space-y-6">
              {([
                { key: 'frontend', label: 'Frontend Skills' },
                { key: 'backend', label: 'Backend Skills' },
                { key: 'other', label: 'Other / DevOps' }
              ] as const).map(category => (
                <div key={category.key} className="p-4 bg-slate-950/20 rounded-xl border border-slate-800/80">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {category.label}
                  </label>
                  
                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {data.skills[category.key].map((skill, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between gap-1 bg-slate-800/40 border border-slate-700/50 rounded-xl p-1 pr-1.5 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all"
                      >
                        <input 
                          type="text" 
                          value={skill} 
                          onChange={(e) => handleSingleSkillChange(category.key, index, e.target.value)} 
                          className="flex-1 min-w-0 bg-transparent border-0 outline-none text-xs text-slate-200 px-1.5 py-0.5" 
                          placeholder="Skill name"
                        />
                        <button 
                          onClick={() => deleteSkill(category.key, index)}
                          className="text-slate-500 hover:text-red-400 p-0.5 rounded-lg hover:bg-slate-700/50 transition-all cursor-pointer flex-shrink-0 flex items-center justify-center w-5 h-5"
                          title="Delete Skill"
                        >
                          <Trash2 size={12} className="flex-shrink-0" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Add Skill Button */}
                  <button 
                    onClick={() => addSkill(category.key)}
                    className="py-1.5 px-3 bg-slate-800/60 hover:bg-slate-800 active:scale-[0.98] border border-dashed border-slate-700 hover:border-slate-600 rounded-lg text-[10px] font-bold text-slate-400 hover:text-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer w-full"
                  >
                    <Plus size={10} />
                    Add Skill
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WORK EXPERIENCE */}
        <div>
          <AccordionHeader id="work" label="Work Experience" icon={Building2} />
          <div className={`accordion-content ${activeSection === 'work' ? 'open p-5' : ''}`}>
            <div className="space-y-6">
              {(data.workExperience ?? []).map((exp, index) => (
                <div key={index} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 relative group">
                  <button 
                    onClick={() => deleteWorkExperience(index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    title="Delete Experience"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="label-premium">Job Title / Position</label>
                        <input 
                          type="text" 
                          value={exp.position} 
                          onChange={(e) => updateWorkExperience(index, 'position', e.target.value)} 
                          className="input-premium" 
                          placeholder="e.g. Senior Frontend Developer"
                        />
                      </div>
                      <div>
                        <label className="label-premium">Company</label>
                        <input 
                          type="text" 
                          value={exp.company} 
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)} 
                          className="input-premium" 
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <label className="label-premium">Location</label>
                        <input 
                          type="text" 
                          value={exp.location} 
                          onChange={(e) => updateWorkExperience(index, 'location', e.target.value)} 
                          className="input-premium" 
                          placeholder="City or Remote"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="label-premium">Period</label>
                        <input 
                          type="text" 
                          value={exp.period} 
                          onChange={(e) => updateWorkExperience(index, 'period', e.target.value)} 
                          className="input-premium" 
                          placeholder="Jan 2022 – Present"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-premium">Responsibilities (one per line)</label>
                      <textarea 
                        value={exp.responsibilities.join('\n')} 
                        onChange={(e) => updateWorkExperience(index, 'responsibilities', e.target.value)} 
                        rows={4} 
                        className="input-premium resize-none" 
                        placeholder={`- Built scalable features using React\n- Mentored 2 junior developers\n- Reduced bundle size by 30%`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addWorkExperience}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                Add Work Experience
              </button>
            </div>
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <AccordionHeader id="projects" label="Projects & Portfolios" icon={Briefcase} />
          <div className={`accordion-content ${activeSection === 'projects' ? 'open p-5' : ''}`}>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 relative group">
                  <button 
                    onClick={() => deleteProject(index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-3">
                    <div>
                      <label className="label-premium">Project Name</label>
                      <input 
                        type="text" 
                        value={project.name} 
                        onChange={(e) => updateProject(index, 'name', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Technologies (Comma separated)</label>
                      <input 
                        type="text" 
                        value={project.technologies.join(', ')} 
                        onChange={(e) => updateProject(index, 'technologies', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Project Link</label>
                      <input 
                        type="text" 
                        value={project.link} 
                        onChange={(e) => updateProject(index, 'link', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Description</label>
                      <textarea 
                        value={project.description} 
                        onChange={(e) => updateProject(index, 'description', e.target.value)} 
                        rows={3} 
                        className="input-premium resize-none" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addProject}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                Add New Project
              </button>
            </div>
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <AccordionHeader id="education" label="Education & Certificates" icon={GraduationCap} />
          <div className={`accordion-content ${activeSection === 'education' ? 'open p-5' : ''}`}>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/60 relative">
                  <button 
                    onClick={() => deleteEducation(index)}
                    className="absolute top-3 right-3 text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    title="Delete Education"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="space-y-3">
                    <div>
                      <label className="label-premium">Degree / Course</label>
                      <input 
                        type="text" 
                        value={edu.degree} 
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Institution</label>
                      <input 
                        type="text" 
                        value={edu.institution} 
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Period</label>
                      <input 
                        type="text" 
                        value={edu.period} 
                        onChange={(e) => updateEducation(index, 'period', e.target.value)} 
                        className="input-premium" 
                      />
                    </div>
                    <div>
                      <label className="label-premium">Details (One bullet per line)</label>
                      <textarea 
                        value={edu.details ? edu.details.join('\n') : ''} 
                        onChange={(e) => updateEducation(index, 'details', e.target.value)} 
                        rows={3} 
                        className="input-premium" 
                        placeholder="Bullet details..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={addEducation}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Plus size={14} />
                Add New Education
              </button>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div>
          <AccordionHeader id="languages" label="Languages" icon={LangIcon} />
          <div className={`accordion-content ${activeSection === 'languages' ? 'open p-5' : ''}`}>
            <div className="space-y-4">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/40">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={lang.name} 
                      onChange={(e) => updateLanguage(index, 'name', e.target.value)} 
                      className="input-premium py-1.5 px-3" 
                      placeholder="Language"
                    />
                  </div>
                  <div className="w-[140px]">
                    <input 
                      type="text" 
                      value={lang.level} 
                      onChange={(e) => updateLanguage(index, 'level', e.target.value)} 
                      className="input-premium py-1.5 px-3" 
                      placeholder="Level (e.g. C1)"
                    />
                  </div>
                  <button 
                    onClick={() => deleteLanguage(index)}
                    className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                    title="Delete Language"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button 
                onClick={addLanguage}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 active:scale-[0.99] border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Plus size={12} />
                Add Language
              </button>
            </div>
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div>
          <AccordionHeader id="soft" label="Soft Skills & Personality" icon={Compass} />
          <div className={`accordion-content ${activeSection === 'soft' ? 'open p-5' : ''}`}>
            <div>
              <label className="label-premium">Summary of Soft Skills</label>
              <textarea 
                value={data.softSkills} 
                onChange={handleSoftSkillsChange} 
                rows={4} 
                className="input-premium resize-none" 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
