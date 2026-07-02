export const defaultCvData = {
  "personalInfo": {
    "name": "Vlad Honcharenko",
    "title": "React Developer | SaaS Developer | AI Automation",
    "email": "organizm777alf@gmail.com",
    "phone": "+380964675403",
    "location": "Kropyvnytskyi, Ukraine",
    "portfolio": "https://v0-react-portfolio-design-roan.vercel.app/",
    "linkedin": "https://www.linkedin.com/in/vlad-honcharenko-34a6a8394/",
    "github": "https://github.com/vlad05x",
    "profileSummary": "I build fast, responsive interfaces in React and Next.js — and I care about the part most developers skip: making sure the client actually understands what they're getting. 4 years total coding experience, including 1+ year delivering production applications for paying clients as an independent freelancer and studio team member. Shipped 6+ projects end-to-end — from the first client call to a live, deployed product. Currently expanding into AI-driven automation and workflow integrations."
  },
  "skills": {
    "frontend": [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux",
      "Redux Toolkit",
      "Material UI",
      "Tailwind CSS",
      "HTML5",
      "SASS/SCSS"
    ],
    "backend": [
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "PostgreSQL"
    ],
    "other": [
      "React Native",
      "Docker",
      "Git",
      "Figma",
      "Sanity CMS",
      "Responsive Design",
      "API Integration",
      "AI-Assisted Development"
    ]
  },
  "languages": [
    {
      "name": "English",
      "level": "Daily client comms / B1"
    },
    {
      "name": "Ukrainian",
      "level": "Native"
    },
    {
      "name": "Russian",
      "level": "Fluent"
    }
  ],
  "softSkills": "Dedicated to open communication that keeps projects on track. I focus on proactive alignment and concise messaging to eliminate friction, ensuring the team remains synchronized and focused on delivering quality results.",
  "howIWork": [
    "I tell you about a blocker the day it happens, not the day it's due.",
    "I use AI tools to move faster on boilerplate — not to skip understanding the code.",
    "If a deadline is at risk, you hear it from me before you have to ask."
  ],
  "education": [
    {
      "degree": "Bachelor - Computer Science",
      "institution": "Central Ukrainian National Technical University",
      "period": "9/2023 - present",
      "details": []
    },
    {
      "degree": "Frontend React Developer",
      "institution": "Shpp IT-school",
      "period": "9/2023 - 2/2024",
      "details": []
    },
    {
      "degree": "Computer Science",
      "institution": "Lyceum \"Maximum\"",
      "period": "9/2021 - 5/2023",
      "details": [
        "Advanced English and computer science",
        "C++ and frontend development"
      ]
    }
  ],
  "workExperience": [
    {
      "position": "Frontend Developer",
      "company": "Bifrost-studio ",
      "location": "Remote",
      "period": "09.2025 – 03.2026",
      "responsibilities": [
        "Part of a small team that shipped 5 commercial projects in a 1.5-month sprint — every one landed on the client's deadline, no extensions needed.",
        "Took ownership of UI implementation and REST API integration, working directly against designer handoffs instead of waiting on backend specs to be finalized first.",
        "Caught and fixed inconsistencies in the shared codebase during code review that would've caused visual bugs across two other client projects."
      ]
    },
    {
      "position": "React Developer | SaaS Developer | AI Automation",
      "company": "Freelance",
      "location": "Remote",
      "period": "2025 – Present",
      "responsibilities": [
        "Work directly with international clients end-to-end — from the first requirements call to a live, deployed product — without a project manager in between.",
        "Built and shipped e-commerce, fitness, and beauty-brand platforms in React, Next.js, and TypeScript, each integrated with a real backend or CMS rather than static content.",
        "More than half of my clients have come back for a second project or referred another client — the strongest signal I have that the work holds up after delivery."
      ]
    }
  ],
  "projects": [
    {
      "name": "Glow & Grace",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Sanity CMS"
      ],
      "description": "Developed a premium web platform for a Ukrainian beauty brand to streamline operations and enhance the user experience",
      "link": "https://beauty-mastery.vercel.app/"
    },
    {
      "name": "Karpaty International",
      "technologies": [
        "HTML5",
        "JavaScript",
        "SCSS",
        "Wordpress"
      ],
      "description": "Developed a freelance solution for a Ukrainian educational institution, balancing modern performance with vibrant cultural aesthetics.",
      "link": "https://karpaty.school/en/"
    },
    {
      "name": "Forge Gym",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Framer Motion"
      ],
      "description": "Built to convert visitors into sign-ups on mobile, where most of their traffic actually comes from. Fast load, smooth animations, no bloated template feel.",
      "link": "https://forge-gym-gold.vercel.app/"
    },
    {
      "name": "Starbucks Practice",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Material UI"
      ],
      "description": "Executed during a university internship at an IT company, this project mirrors a production-level ecosystem. It demonstrates the ability to meet strict technical specifications and deliver high-end design standards.",
      "link": "https://starbucks-rosy-beta.vercel.app/"
    },
    {
      "name": "Magnifier Pro",
      "technologies": [
        "HTML5",
        "JavaScript",
        "SCSS"
      ],
      "description": "Developed a direct-response landing page for a Fiverr client, specifically engineered to drive app downloads. The project combined professional aesthetics with clear messaging to meet strict commercial goals.",
      "link": "https://vlad05x.github.io/MagnifierPro/"
    },
    {
      "name": "DoughDelights",
      "technologies": [
        "Next.js",
        "TypeScript",
        "Tailwind"
      ],
      "description": "A full-featured e-commerce platform designed for a bakery brand. Implemented a seamless ordering flow and a responsive UI, leveraging AI tools to accelerate the design-to-development cycle.",
      "link": "https://donut-shop-henna.vercel.app/"
    }
  ],
  "customization": {
    "themeColor": "obsidian",
    "fontFamily": "sans",
    "density": "normal",
    "layoutStyle": "classic"
  }
};

export type CVData = typeof defaultCvData;
