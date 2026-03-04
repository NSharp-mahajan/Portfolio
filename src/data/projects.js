import cybercop from '../assets/images/cybercop.png'
import cybercop2 from '../assets/images/cybercop-2.png'
import cybercop3 from '../assets/images/cybercop-3.png'
import greengrid from '../assets/images/greengrid.png'
import dts from '../assets/images/dts.png'
import rapture from '../assets/images/rapture.png'
import rapture2 from '../assets/images/rapture-2.png'
import saralseva from '../assets/images/saralseva.png'
import saralseva2 from '../assets/images/saralseva-2.png'
import techVenture from '../assets/images/techVenture.png'
import cryptotracker from '../assets/images/cryptotracker.png'

export const projects = [
  {
    id: 1,
    title: "CyberCop",
    description: "Complete cybersecurity protection toolkit with AI powered threat detection, incident reporting and community driven security solution",
    image: cybercop,
    images: [
      cybercop,
      cybercop2,
      cybercop3,
    ],
    category: "Full Stack",
    techStack: ["MERN", "Supabase", "OpenAI", "LangChain"],
    projectUrl: "https://cybercop-safe-space.vercel.app/",
    codeUrl: "https://github.com/NSharp-mahajan/cybercop-safe-space"
  },
  {
    id: 6,
    title: "GreenGrid",
    description: "The Environmental Intelligence System for Future Cities Monitor, predict, and simulate environmental conditions using AI-powered Green Grids and Digital Twins. Transform your city into a sustainable ecosystem.",
    image: greengrid,
    category: "Full Stack",
    techStack: ["TYPESCRIPT", "NODE", "EXPRESS", "LANGCHAIN", "FIREBASE"],
    projectUrl: "https://legendary-paprenjak-104fed.netlify.app/",
    codeUrl: "https://github.com/NSharp-mahajan/greengrid-command-center"
  },
  {
    id: 5,
    title: "Design Thinking Society",
    description: "Official website of a university club designed for students to communicate with authorities and faculties through it and get to know about their events",
    image: dts,
    category: "Full Stack",
    techStack: ["REACT", "NODE", "EXPRESS", "MongoDB"],
    projectUrl: "https://dts-web-eight.vercel.app/",
    codeUrl: "https://github.com/NSharp-mahajan/DTS-Web"
  },
  {
    id: 2,
    title: "Gaming Platform",
    description: "A Gaming platorm basically designed to explore world of gaming, with just internet connection you are good to go",
    image: rapture,
    images: [
      rapture,
      rapture2
    ],
    category: "Frontend",
    techStack: ["HTML", "CSS", "JAVASCRIPT"],
    projectUrl: "https://rapture-phi.vercel.app/",
    codeUrl: "https://github.com/NSharp-mahajan/Rapture"
  },
  {
    id: 4,
    title: "Saral Seva",
    description: "The application and grievance resolution process for rural government schemes + Simplified Work Based Accounting Application for Panchayati Raj",
    image: saralseva,
    images: [
      saralseva,
      saralseva2
    ],
    category: "Open Source",
    techStack: ["REACT", "NODE", "EXPRESS", "MongoDB"],
    projectUrl: "https://saralseva.vercel.app/",
    codeUrl: "https://github.com/NSharp-mahajan/SaralSeva"
  },
  {
    id: 7,
    title: "Tech Venture",
    description: "The command center for founders who build with intention. Unify execution, validation, and growth in one place, Helps in connecting them through their teams",
    image: techVenture,
    category: "Full Stack",
    techStack: ["MERN", "SUPABASE", "TAILWIND"],
    projectUrl: "https://startup-command.netlify.app/",
    codeUrl: "https://github.com/NSharp-mahajan/startup-command"
  },
  {
    id: 3,
    title: "Crypto Tracker",
    description: "Platform designed to check live crypto scores day by day",
    image: cryptotracker,
    category: "Frontend",
    techStack: ["REACT"],
    projectUrl: "https://crypto-tracker-6bfl.vercel.app/",
    codeUrl: "https://github.com/NSharp-mahajan/Crypto-Tracker"
  },
]

export const categories = ["All", "Full Stack", "Frontend", "Open Source"]
