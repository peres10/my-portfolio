import {useState, useRef, useEffect} from "react";
import * as React from "react";
import type {ExperienceItem, ExperienceProps} from "../types/Experience.ts";



export const Experience: React.FC<ExperienceProps> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<string | null>(data.defaultSelectedId || null);
    const [isDesktop, setIsDesktop] = useState(false);

    const detailsRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const selectedItem = data.items.find((item) => item.id === selectedId);
    const workItems = data.items.filter((item) => item.type === "work");
    const educationItems = data.items.filter((item) => item.type === "education");

    const handleItemClick = (id: string) => {
        setSelectedId(id);
        // small delay to ensure state update and DOM render
        setTimeout(() => {
        }, 100)
    }

    useEffect(() => {
        const checkBreakpoint = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        checkBreakpoint();
        window.addEventListener('resize', checkBreakpoint);
        return () => window.removeEventListener('resize', checkBreakpoint);
    }, []);

    const DescriptionPanel = () => {
        const logoSizeMobile = '100px';
        const logoSizeDesktop = '240px';
        const logoPadding = '12px';

        const logoStyle = isDesktop
            ? {
                backgroundColor: 'white',
                width: logoSizeDesktop,
                height: logoSizeDesktop,
                padding: logoPadding
            }
            : {
                backgroundColor: 'white',
                width: logoSizeMobile,
                height: logoSizeMobile,
                padding: logoPadding
            };

        return (
            <div className="flex-1 lg:self-start lg:sticky lg:top-24">
                {selectedItem &&
                    <div
                        ref={detailsRef}
                        className="bg-gradient-to-b from-[rgba(56,56,56,0.56)] to-[rgba(56,56,56,0)] rounded-[24px]
                                md:rounded-[36px] p-6 md:p-12 min-h-[400px] md:min-h-[500px] flex flex-col items-center"
                    >
                        {selectedItem.logoUrl && (
                            <div
                                className="rounded-full mb-4 shadow-lg flex items-center justify-center"
                                style={logoStyle}
                            >
                                <img
                                    src={selectedItem.logoUrl}
                                    alt={`${selectedItem.organization} Logo`}
                                    className="w-4/5 h-4/5 object-contain"
                                />
                            </div>
                        )}

                        <h3 className="font-poppins-bold italic text-white text-center mb-4 text-xl md:text-2xl">
                            {selectedItem.organization}
                        </h3>
                        <h4 className="font-poppins-bold text-white text-center mb-2 text-lg md:text-xl">
                            {selectedItem.title}
                        </h4>
                        <p className="font-poppins-bold italic text-[#00add3] text-center mb-6 md:mb-8 text-base md:text-lg">
                            {selectedItem.period}
                        </p>
                        <div
                            className="font-poppins text-white leading-relaxed break-words text-base md:text-lg w-full px-4 text-left whitespace-pre-wrap"
                            style={{wordBreak: 'break-all'}}
                        >
                            {selectedItem.description}
                        </div>
                    </div>
                }
            </div>
        )
    }

    const VerticalLine = () => {
        return (
            <div className="absolute left-[18px] md:left-[30px] top-0 bottom-0 w-[7px] bg-[#00ADD3] rounded-full" />)
    }

    const Bullet = (item: ExperienceItem) => {
        const bulletLeftMobile = isDesktop ? '-52.5px' : '-38px';

        return (
            <div
                className={`absolute top-[20px] md:top-[22px] z-10 cursor-pointer`}
                style={{
                    left: bulletLeftMobile,
                    transition: "transform 500ms ease-in-out",
                    transform: `scale(${selectedId === item.id ? 1.10 : 1})`
                }}
            >
                <svg
                    className={`w-[40px] h-[40px] md:w-[45px] md:h-[45px]`}
                    fill="none"
                    viewBox="0 0 45 45"
                >
                    <circle
                        cx="22.5"
                        cy="22.5"
                        r="19"
                        fill={selectedId === item.id ? "#00d1ff" : "rgba(255,255,255,1)"}
                        stroke={selectedId === item.id ? "#00d1ff" : "#00ADD3"}
                        strokeWidth="7"
                        className="transition-all duration-500 ease-in-out"
                    />
                </svg>
            </div>
        )
    }

    const TextFromBullets = (item: ExperienceItem, shouldDisplayOrganization: boolean) => {
        return (
            <div className="pl-4">
                {/* 1. Moved organization to the top, under the period */}
                {shouldDisplayOrganization && (
                    <p className="font-poppins-bold italic text-white/90 mb-1 text-lg md:text-3xl">
                        {item.organization}
                    </p>
                )}
                <p className="font-poppins-bold text-white mb-1 text-lg md:text-xl">
                    {item.title}
                </p>
                <p className="font-poppins-bold italic text-[#00add3] mb-2 text-base md:text-xl">
                    {item.period}
                </p>


            </div>
        )
    }

    const ItemButton = (item: ExperienceItem, index: number, fullList: ExperienceItem[]) => {
        const previousItem = fullList[index - 1];
        const shouldDisplayOrganization = index === 0 || item.organization !== previousItem.organization;

        let spacingClass = "mt-12 md:mt-16";
        if(index > 0) {
            if(shouldDisplayOrganization)
                spacingClass = "mt-12 md:mt-16"
            else
                spacingClass = "mt-1 md:mt-2"
        } else {
            spacingClass = "mt-0"
        }

        return (
            <button
                key={item.id}
                ref={(el) => { itemRefs.current[item.id] = el; }}
                onClick={() => handleItemClick(item.id)}
                className={`relative w-full text-left transition-all duration-300 scale-105
                    ${spacingClass}
                `}
            >

                {Bullet(item)}
                {TextFromBullets(item, shouldDisplayOrganization)}
            </button>
        )
    }


    return (
        <section id="experience" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24">
            <h2 className="font-poppins-semi-bold text-white mb-12 md:mb-24 text-4xl md:text-5xl lg:text-6xl" >
                Experience
            </h2>

            <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* timeline */}
                <div className="flex-1">
                    {/* work section */}
                    { workItems.length > 0 && (
                        <div className="mb-16 md:mb-24">
                            <h3 className="font-poppins-bold text-white mb-8 md:mb-12 text-2xl md:text-3xl pl-0 md:pl-4">
                                Work
                            </h3>
                            <div className="relative pl-12 md:pl-20">
                                {VerticalLine()}
                                {/* Work Items */}
                                <div className="space-y-12 md:space-y-16">
                                    {workItems.map((item, index) => (
                                        ItemButton(item, index, workItems)
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* education section */}
                    <div className="mb-16 md:mb-24">
                        <h3 className="font-poppins-bold text-white mb-8 md:mb-12 text-2xl md:text-3xl pl-0 md:pl-4">
                            Education
                        </h3>
                        <div className="relative pl-12 md:pl-20">
                            {VerticalLine()}
                            {/* Education Items */}
                            <div className="space-y-12 md:space-y-16">
                                {educationItems.map((item, index) => (
                                    ItemButton(item, index, educationItems)
                                ))}
                            </div>
                        </div>
                    </div>


                    <p className="font-poppins italic text-white/70 text-xs md:text-sm mt-8 pl-0 md:pl-4">
                        Click on a bullet point to show more information
                    </p>
                </div>

                {/* Description Panel - Sticky positioning on desktop */}
                {DescriptionPanel()}

            </div>
        </section>
    )
}