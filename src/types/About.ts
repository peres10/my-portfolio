export interface AboutData {
    paragraphs: Array<{
        text: string;
        bold: boolean;
    }>;
}

export interface AboutProps {
    data: AboutData;
}