export const defaultCvData = {
  personalInfo: {
    name: "Vlad Honcharenko",
    title: "Front-end React Developer",
    email: "organizm777alf@gmail.com",
    phone: "+380964675403",
    location: "Kropyvnytskyi, Ukraine",
    portfolio: "https://v0-react-portfolio-design-roan.vercel.app/",
    linkedin: "https://www.linkedin.com/in/vlad-honcharenko-34a6a8394/",
    github: "https://github.com/vlad05x",
    profileSummary: "Frontend Developer with 4 years of experience specializing in React, Next.js, and TypeScript. Skilled in building high-performance applications and integrating REST APIs with a focus on clean code. A collaborative team player dedicated to effective communication and achieving shared project goals."
  },
  skills: {
    frontend: ["React.js", "Next.js", "TypeScript", "JavaScript", "Redux", "Redux Toolkit", "Material UI", "Tailwind CSS", "HTML5", "SASS/SCSS"],
    backend: ["Node.js", "Express.js", "MongoDB", "MySQL", "PostgreSQL", "Sanity CMS"],
    other: ["React Native", "Docker", "Git", "Figma"]
  },
  languages: [
    { name: "English", level: "Intermediate / B1" },
    { name: "Ukrainian", level: "Native" },
    { name: "Russian", level: "Fluent" }
  ],
  softSkills: "Dedicated to open communication that keeps projects on track. I focus on proactive alignment and concise messaging to eliminate friction, ensuring the team remains synchronized and focused on delivering quality results.",
  education: [
    {
      degree: "Bachelor - Computer Science",
      institution: "Central Ukrainian National Technical University",
      period: "9/2023 - present",
      details: []
    },
    {
      degree: "Frontend React Developer",
      institution: "Shpp IT-school",
      period: "9/2023 - 2/2024",
      details: []
    },
    {
      degree: "Computer Science",
      institution: 'Lyceum "Maximum"',
      period: "9/2021 - 5/2023",
      details: [
        "Advanced English and computer science",
        "C++ and frontend development"
      ]
    }
  ],
 workExperience: [
  {
    "position": "Frontend Developer (Team Member)",
    "company": "IT Project Team",
    "location": "Remote",
    "period": "01.2026 – 06.2026",
    "responsibilities": [
      "Collaborated in an intense 1.5-month sprint to deliver 5 commercial web projects, ensuring adherence to strict deadlines ",
      "Spearheaded UI implementation, responsive design, and integration with REST APIs to ensure high-performing applications [cite: 18]",
      "Participated in active code reviews and maintained existing codebase, ensuring consistency and seamless performance across all client projects "
    ]
  },
  {
    "position": "Frontend React Developer",
    "company": "Freelance",
    "location": "Remote",
    "period": "2025 – Present",
    "responsibilities": [
      "Delivered high-quality web applications for international clients using React, Next.js, and TypeScript",
      "Optimized web performance and UI/UX to meet commercial business goals",
      "Managed end-to-end communication with clients, translating business requirements into technical features"
    ]
  }
],
  projects: [
    {
      name: "Glow & Grace",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Sanity CMS"],
      description: "Developed a premium web platform for a Ukrainian beauty brand to streamline operations and enhance the user experience",
      link: "#"
    },
    {
      name: "Karpaty International",
      technologies: ["HTML5", "JavaScript", "SCSS", "Wordpress"],
      description: "Developed a freelance solution for a Ukrainian educational institution, balancing modern performance with vibrant cultural aesthetics.",
      link: "#"
    },
    {
      name: "Forge Gym",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
      description: "Leveraged an AI-accelerated workflow to build a high-performance, mobile-first platform. The solution effectively showcases training programs while elevating the brand's digital presence.",
      link: "#"
    },
    {
      name: "Starbucks Practice",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Material UI"],
      description: "Executed during a university internship at an IT company, this project mirrors a production-level ecosystem. It demonstrates the ability to meet strict technical specifications and deliver high-end design standards.",
      link: "#"
    },
    {
      name: "Magnifier Pro",
      technologies: ["HTML5", "JavaScript", "SCSS"],
      description: "Developed a direct-response landing page for a Fiverr client, specifically engineered to drive app downloads. The project combined professional aesthetics with clear messaging to meet strict commercial goals.",
      link: "#"
    },
    {
      name: "DoughDelights",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      description: "A full-featured e-commerce platform designed for a bakery brand. Implemented a seamless ordering flow and a responsive UI, leveraging AI tools to accelerate the design-to-development cycle.",
      link: "#"
    }
  ],
  customization: {
    themeColor: "sapphire",
    fontFamily: "sans",
    density: "normal",
    layoutStyle: "classic"
  }
};

export type CVData = typeof defaultCvData;
