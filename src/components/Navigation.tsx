import {useState, useEffect} from "react";
import {Menu, X} from "lucide-react";

import {navItems} from "../data/nav_items.ts";

import * as React from "react";
import type {MobileNavigationTypeProps, NavigationProps, NavigationTypeProps, NavigationItem} from "../types/Navigation.ts";

export const Navigation: React.FC<NavigationProps> = ({activeSection}) => {
    const [isHovered, setHovered] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 100);
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
        setIsMobileMenuOpen(false);
    }

    const shouldBeTransperant = !isAtTop && !isHovered;

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                backgroundColor: shouldBeTransperant ? "rgba(34, 34, 34, 0.05)" : "rgba(34, 34, 34, 0.95)",
                backdropFilter: shouldBeTransperant ? "none" : "blur(10px)",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 md:py-6">
                <div
                    className={`transition-all duration-300 ${
                        !isHovered ? 'blur-lg opacity-50' : 'blur-none opacity-100'
                    }`}
                >
                    {/* Desktop Navigation */}
                    <DesktopNavigation activeSection={activeSection} scrollToSection={scrollToSection}/>

                    {/* Mobile Navigation */}
                    <MobileNavigation
                        activeSection={activeSection}
                        scrollToSection={scrollToSection}
                        isMobileMenuOpen={isMobileMenuOpen}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                </div>
            </div>

        </nav>
    )
}

const DesktopNavigation: React.FC<NavigationTypeProps> = ({activeSection, scrollToSection}) => {
    const SectionButton = (item: NavigationItem) => {
        return (
                <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-poppins-semi-bold text-white transition-all duration-300 hover:text-[#00add3] text-base lg:text-lg cursor-pointer
                                    ${activeSection === item.id ? "text-[#00add3]" : ""}`}
                >
                    {item.label}
                </button>
        )
    }

    return (
        <>
            <ul className="hidden md:flex justify-center gap-8 lg:gap-12">
                {navItems.map((item) => (
                    <li key={item.id}>
                        {SectionButton(item)}
                    </li>
                ))}
            </ul>
        </>
    )
}

const MobileNavigation: React.FC<MobileNavigationTypeProps> = ({
                                                                   activeSection,
                                                                   scrollToSection,
                                                                   isMobileMenuOpen,
                                                                   setIsMobileMenuOpen
                                                               }) => {
    const SectionButton = (item: NavigationItem) => {
        return (
            <button
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-6 py-4 font-poppins-semi-bold text-white transition-all duration-300 hover:bg-white/10 hover:text-[#00add3] text-lg ${
                    activeSection === item.id ? "text-[#00add3] bg-white/5" : ""
                }`}
            >
                {item.label}
            </button>
        )
    }

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 text-white hover:text-[#00add3] transition-colors"
                aria-label="Toggle menu"
            >
                {isMobileMenuOpen ? <X className="w-7 h-7"/> : <Menu className="w-7 h-7"/>}
            </button>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-[rgba(34,34,34,0.98)] backdrop-blur-lg shadow-lg">
                    <ul className="flex flex-col py-4">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                {SectionButton(item)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}