
export interface NavigationProps {
    activeSection: string;
}

export interface NavigationTypeProps {
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
}

export interface MobileNavigationTypeProps extends NavigationTypeProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
}

export interface NavigationItem {
    id: string;
    label: string;
}