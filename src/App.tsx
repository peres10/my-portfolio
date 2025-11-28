import { useState, useEffect} from "react";
import {Toaster} from "sonner";

import {Navigation} from "./components/Navigation.tsx";
import {Hero} from "./components/Hero.tsx";
import {About} from "./components/About.tsx";
import {Skills} from "./components/Skills.tsx";
import {Experience} from "./components/Experience.tsx";
import {Projects} from "./components/Projects.tsx";
import {Contact} from "./components/Contact.tsx";

import {personalData} from "./data/personal.ts";
import {aboutData} from "./data/about.ts";
import {skillsData} from "./data/skills.ts";
import {experienceData} from "./data/experience.ts";
import {projectsData} from "./data/projects.ts";



const App = () => {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            const sections = [
                "home", "about", "skills", "experience", "projects", "contact"
            ];
            const scrollPostion = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPostion >= offsetTop && scrollPostion <= offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#222222]">
            <Toaster position="top-right" theme="dark" />
            <Navigation activeSection={activeSection} />

            <Hero
                name={personalData.name}
                titles={personalData.titles}
                cvPath={personalData.cvPath}
                linkedin={personalData.linkedin}
                github={personalData.github}
            />

            <About data={aboutData} />

            <Skills data={skillsData} />

            <Experience data={experienceData}/>

            <Projects data={projectsData}></Projects>

            <Contact linkedin={personalData.linkedin} email={personalData.email} />
        </div>
    );
}

export default App;