import * as React from "react";

interface Skills {
    name: string;
    iconPath: string;
}

interface SkillCategory {
    name: string;
    skills: Skills[];
}

interface SkillsData {
    categories: SkillCategory[];
}

interface SkillsProps {
    data: SkillsData;
}

export const Skills: React.FC<SkillsProps> = ({ data }) => {
    const skillBox = (skill: Skills, skillIndex: number) => {
        return (
            <div
                key={skillIndex}
                className="flex flex-col items-center gap-2 group"
            >
                <div className="bg-[rgba(217,217,217,0.25)] rounded-[22px] size-[80px] md:size-[95px]
                                    flex items-center justify-center transition-all duration-300
                                    hover:bg-[rgba(217,217,217,0.4)] hover:scale-110 p-3 md:p-4"
                >
                    <img
                        src={skill.iconPath}
                        alt={`${skill.name} icon`}
                        className="h-full w-full object-contain"
                    />
                </div>
                <p className="font-poppins-semi-bold text-white text-center w-[80px] md:w-[95px] text-sm md:text-base">
                    {skill.name}
                </p>
            </div>
        )
    }

    return (
      <section id="skills" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24">
          <h2 className="font-poppins-semi-bold text-white mb-12 md:mb-24 text-4xl md:text-5xl lg:text-6xl" >
              Skills
          </h2>

          <div className="w-full max-w-[1200px] space-y-12 md:space-y-24">
              {data.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="flex flex-col items-center">
                      <h3 className="font-poppins-bold text-[#00d1ff] mb-8 md:mb-12 text-2xl md:text-3xl lg:text-4xl">
                          {category.name}
                      </h3>

                      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                          {category.skills.map((skill, skillIndex) => (
                              skillBox(skill, skillIndex)
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      </section>
    );
}