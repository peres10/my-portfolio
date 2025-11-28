interface AboutData {
    paragraphs: Array<{
        text: string;
        bold: boolean;
    }>;
}

interface AboutProps {
    data: AboutData;
}

export const About: React.FC<AboutProps> = ({data}) => {
    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24">
            <h2 className="font-poppins-semi-bold text-white mb-12 md:mb-24 text-4xl md:text-5xl lg:text-6xl" >
                About
            </h2>

            <div className="max-w-[1413px] font-poppins-semi-bold text-white text-center leading-relaxed whitespace-pre-wrap text-lg md:text-2xl lg:text-3xl">
                {data.paragraphs.map((paragraph, index) => (
                    <span
                        key={index}
                        className={paragraph.bold ? "font-poppins-bold text-[#00add3]" : ""}
                    >
                        {paragraph.text}
                    </span>
                ))}
            </div>
        </section>
    )
}