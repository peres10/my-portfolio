export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    images?: string[]; // Optional array of image URLs
    links: {
        github?: string;
        demo?: string;
    };
    featured?: boolean;
}

export interface ProjectsData {
    projects: Project[];
}

export interface ProjectsProps {
    data: ProjectsData;
}