import { Linkedin, Github} from "lucide-react";

interface HeroProps {
    name: string,
    titles: string[];
    cvPath?: string;
    linkedin: string;
    github: string;
}

export const Hero: React.FC<HeroProps> = props => {
    const handleViewCV = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default button behavior (though usually not necessary for standard button)
        e.preventDefault();
        if (props.cvPath) {
            // Use window.open to force a new tab/window for the PDF
            window.open(props.cvPath, "_blank");
        }
    };

    const handleLinkedin = () => {
        window.open(props.linkedin, "_blank");
    };

    const handleGithub = () => {
        window.open(props.github, "_blank");
    };

    const ViewCVButton = () => {
        if (!props.cvPath) return null;

        return (
            <button
                onClick={handleViewCV}
                className="mt-12 group relative mx-auto cursor-pointer inline-block"
                aria-label="View Curriculum Vitae (CV)"
            >
                <div
                    className="
                        h-[90px] md:h-[106.592px]
                        w-[240px] md:w-[284px]
                        rounded-full
                        shadow-[0px_0px_7.2px_0px_rgba(0,173,211,0.25)]
                    "
                    style={{
                        background: "linear-gradient(to bottom, #00ADD3 0%, rgba(0, 209, 255, 0.36) 100%)",
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-poppins-semi-bold text-white text-xl md:text-2xl">
                        VIEW CV
                    </span>
                </div>
            </button>
        );
    }

    const SocialLinks = () => (
        <div className="flex gap-8 justify-center mt-12">
            <button
                onClick={handleLinkedin}
                className="hover:scale-110 transition-transform cursor-pointer"
                aria-label="LinkedIn"
            >
                <Linkedin className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </button>
            <button
                onClick={handleGithub}
                className="hover:scale-110 transition-transform cursor-pointer"
                aria-label="GitHub"
            >
                <Github className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </button>
        </div>
    );

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center">
            {/* image part*/}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/src/assets/background/bg_image_bw.jpg"
                    alt="Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#222222]" />
            </div>

            <div className="relative z-10 text-center px-4">
                <h1 className="font-poppins-ultra text-white mb-6 text-5xl md:text-6xl lg:text-7xl">
                     {props.name}
                </h1>
                {props.titles.map((title: string, index: number) => (
                    <p
                        key={index}
                        className="font-poppins-semi-bold
                            text-[#00add3] text-center text-2xl md:text-3xl lg:text-4xl mb-2"
                    >
                        {title}
                    </p>
                ))}

                {ViewCVButton()}
                {SocialLinks()}
            </div>
        </section>
    )

}