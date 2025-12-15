export interface ExperienceItem {
    id: string;
    type: "work" | "education";
    title: string;
    organization: string;
    period: string;
    description: string;
    logoUrl?: string;
}

export interface ExperienceData {
    defaultSelectedId: string;
    items: ExperienceItem[];
}

export interface ExperienceProps {
    data: ExperienceData;
}