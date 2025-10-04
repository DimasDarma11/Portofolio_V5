import React, { useEffect, useState } from "react";
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Code, Award, Boxes } from "lucide-react";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import AOS from "aos";
import "aos/dist/aos.css";

// ToggleButton component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-4 py-2
      text-slate-300 hover:text-white font-semibold
      flex items-center gap-2
      bg-white/5 hover:bg-white/10
      rounded-md border border-white/10 hover:border-white/20
      backdrop-blur-sm group relative overflow-hidden
    "
  >
    {isShowingMore ? "See Less" : "See More"}
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

// Tech stack
const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

// Example projects
const exampleProjects = [
  {
    id: 1,
    Img: "https://via.placeholder.com/400x250.png?text=Project+1",
    Title: "E-Commerce Website",
    Description: "A fully responsive e-commerce website built with React and Firebase, featuring authentication, product management, and payment integration.",
    Link: "https://example.com/project1"
  },
  {
    id: 2,
    Img: "https://via.placeholder.com/400x250.png?text=Project+2",
    Title: "Portfolio Website",
    Description: "Personal portfolio website using ReactJS and Tailwind CSS to showcase projects, skills, and certificates.",
    Link: "https://example.com/project2"
  },
  {
    id: 3,
    Img: "https://via.placeholder.com/400x250.png?text=Project+3",
    Title: "Chat Application",
    Description: "Real-time chat application using Node.js, Socket.io, and Express, with private and group chat functionalities.",
    Link: "https://example.com/project3"
  },
  {
    id: 4,
    Img: "https://via.placeholder.com/400x250.png?text=Project+4",
    Title: "Task Management App",
    Description: "A productivity app built with React, Redux, and Firebase to track tasks and deadlines efficiently.",
    Link: "https://example.com/project4"
  },
];

// Example certificates
const exampleCertificates = [
  {
    id: 1,
    Img: "https://via.placeholder.com/400x250.png?text=Certificate+1",
    Title: "ReactJS Developer",
    Issuer: "Coursera",
    Date: "June 2025"
  },
  {
    id: 2,
    Img: "https://via.placeholder.com/400x250.png?text=Certificate+2",
    Title: "Fullstack Web Developer",
    Issuer: "Udemy",
    Date: "April 2025"
  },
  {
    id: 3,
    Img: "https://via.placeholder.com/400x250.png?text=Certificate+3",
    Title: "Tailwind CSS Advanced",
    Issuer: "Frontend Masters",
    Date: "May 2025"
  },
];

export default function PortfolioTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 3 : 4;

  useEffect(() => { AOS.init({ once: false }); }, []);

  const toggleShowMore = (type) => {
    if (type === "projects") setShowAllProjects(prev => !prev);
    else setShowAllCertificates(prev => !prev);
  };

  const displayedProjects = showAllProjects ? exampleProjects : exampleProjects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? exampleCertificates : exampleCertificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full mt-[3rem] bg-[#030014] overflow-hidden" id="Portfolio">
      {/* Header */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          Portfolio Showcase
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
          <Tabs value={value} onChange={(e, newVal) => setValue(newVal)} variant="fullWidth">
            <Tab icon={<Code />} label="Projects" />
            <Tab icon={<Award />} label="Certificates" />
            <Tab icon={<Boxes />} label="Tech Stack" />
          </Tabs>
        </AppBar>

        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={setValue}>
          {/* Projects */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {displayedProjects.map(project => (
                <CardProject
                  key={project.id}
                  Img={project.Img}
                  Title={project.Title}
                  Description={project.Description}
                  Link={project.Link}
                  id={project.id}
                />
              ))}
            </div>
            {exampleProjects.length > initialItems && (
              <div className="mt-6 flex justify-center">
                <ToggleButton onClick={() => toggleShowMore('projects')} isShowingMore={showAllProjects} />
              </div>
            )}
          </TabPanel>

          {/* Certificates */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayedCertificates.map(cert => (
                <Certificate
                  key={cert.id}
                  ImgSertif={cert.Img}
                  Title={cert.Title}
                  Issuer={cert.Issuer}
                  Date={cert.Date}
                />
              ))}
            </div>
            {exampleCertificates.length > initialItems && (
              <div className="mt-6 flex justify-center">
                <ToggleButton onClick={() => toggleShowMore('certificates')} isShowingMore={showAllCertificates} />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-[5%]">
              {techStacks.map((stack, index) => (
                <TechStackIcon key={index} TechStackIcon={stack.icon} Language={stack.language} />
              ))}
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
