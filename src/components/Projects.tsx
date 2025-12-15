import { useState} from "react";
// TODO fix github logo later
// TODO later refactor some code because this is too big
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import type {Project, ProjectsProps} from "../types/Projects.ts";
import * as React from "react";

// TODO this should be also in the data
const ENABLE_CAROUSEL = true; // enables the featured projects
const FEATURED_PROJECT_IDS = ["ecommerce-platform", "task-manager"];
const PROJECTS_PER_PAGE = 6;

export const Projects: React.FC<ProjectsProps> = ( { data }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    // Separate featured and regular projects
    const featuredProjects = ENABLE_CAROUSEL
        ? data.projects.filter(p => FEATURED_PROJECT_IDS.includes(p.id))
        : [];

    const regularProjects = ENABLE_CAROUSEL
        ? data.projects.filter(p => !FEATURED_PROJECT_IDS.includes(p.id))
        : data.projects;

    // Pagination
    const totalPages = Math.ceil(regularProjects.length / PROJECTS_PER_PAGE);
    const startIndex = currentPage * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;
    const currentProjects = regularProjects.slice(startIndex, endIndex);

    const nextCarouselSlide = () => {
        setCurrentCarouselIndex((prev) => (prev + 1) % featuredProjects.length);
    };

    const prevCarouselSlide = () => {
        setCurrentCarouselIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    };

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };



    const ProjectDetailModal = () => {
        return (
            <>
                {selectedProject && (
                    <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:p-8"
                        onClick={() => {
                            setSelectedProject(null);
                            setCurrentImageIndex(0);
                        }}
                    >
                        <div
                            className="bg-[#2a2a2a] rounded-[24px] p-6 md:p-12 max-w-[800px] w-full max-h-[90vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => {
                                    setSelectedProject(null);
                                    setCurrentImageIndex(0);
                                }}
                                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="font-poppins-bold text-white mb-4 md:mb-6 text-2xl md:text-3xl pr-8">
                                {selectedProject.title}
                            </h2>

                            <p className="font-poppins text-white/90 leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                                {selectedProject.fullDescription}
                            </p>

                            {/* Project Images Carousel */}
                            {ProjectModalImagesCarousel()}

                            <div className="mb-6 md:mb-8">
                                <h3 className="font-poppins-bold text-white/80 mb-3 md:mb-4 text-lg md:text-xl">
                                    Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="px-3 md:px-4 py-1 md:py-2 bg-[#00add3]/20 text-[#00add3] rounded-full font-poppins-semi-bold text-sm md:text-base"
                                        >
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                {selectedProject.links.github && (
                                    <a
                                        href={selectedProject.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#00add3] text-white rounded-lg font-poppins-semi-bold hover:bg-[#00d1ff] transition-colors text-base md:text-lg"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </a>
                                )}
                                {selectedProject.links.demo && (
                                    <a
                                        href={selectedProject.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-white/10 text-white rounded-lg font-poppins-semi-bold hover:bg-white/20 transition-colors text-base md:text-lg"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }

    const FeaturedProjectsCarousel = () => {
        return (
            <>
                {ENABLE_CAROUSEL && featuredProjects.length > 0 && (
                    <div className="w-full max-w-[1200px] mb-16 md:mb-24">
                        <h3 className="font-poppins-bold text-[#00d1ff] mb-8 text-2xl md:text-3xl text-center">
                            Featured Projects
                        </h3>

                        <div className="relative">
                            {/* Carousel Container */}
                            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-b from-[rgba(56,56,56,0.56)] to-[rgba(56,56,56,0)]
                            p-8 md:p-12">
                                <button
                                    onClick={() => {
                                        setSelectedProject(featuredProjects[currentCarouselIndex]);
                                        setCurrentImageIndex(0); // Reset image carousel to first image
                                    }}
                                    className="w-full text-left transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                                        {/* Project Content */}
                                        <div className="flex-1">
                                            <div className="inline-block px-4 py-1 bg-[#00add3]/20 text-[#00add3] rounded-full
                                            text-sm md:text-base font-poppins-bold] mb-4">
                                                Featured
                                            </div>
                                            <h3 className="font-poppins-bold text-white mb-4 text-3xl md:text-4xl">
                                                {featuredProjects[currentCarouselIndex].title}
                                            </h3>
                                            <p className="font-poppins text-white/90 leading-relaxed text-lg md:text-xl mb-6">
                                                {featuredProjects[currentCarouselIndex].shortDescription}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {featuredProjects[currentCarouselIndex].technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-4 py-2 bg-[#00add3]/30 text-[#00add3] rounded-full text-base md:text-lg font-poppins-semi-bold"
                                                    >
                                                    {tech}
                                                </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Links */}
                                        <div className="flex flex-col gap-3 min-w-[200px]">
                                            {featuredProjects[currentCarouselIndex].links.github && (
                                                <a
                                                    href={featuredProjects[currentCarouselIndex].links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00add3] text-white rounded-lg font-poppins-semi-bold hover:bg-[#00d1ff] transition-colors text-lg"
                                                >
                                                    <Github className="w-5 h-5" />
                                                    GitHub
                                                </a>
                                            )}
                                            {featuredProjects[currentCarouselIndex].links.demo && (
                                                <a
                                                    href={featuredProjects[currentCarouselIndex].links.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-poppins-semi-bold hover:bg-white/20 transition-colors text-lg"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                    Live Demo
                                                </a>
                                            )}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedProject(featuredProjects[currentCarouselIndex]);
                                                    setCurrentImageIndex(0); // Reset image carousel to first image
                                                }}
                                                className="px-6 py-3 bg-white/10 text-white rounded-lg font-poppins-semi-bold hover:bg-white/20 transition-colors text-lg text-center cursor-pointer"
                                            >
                                                View Details
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Carousel Navigation Buttons */}
                            {featuredProjects.length > 1 && (
                                <>
                                    <button
                                        onClick={prevCarouselSlide}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 md:w-14 md:h-14 bg-[#00add3] text-white rounded-full flex items-center justify-center hover:bg-[#00d1ff] transition-all duration-300 hover:scale-110 shadow-lg"
                                        aria-label="Previous project"
                                    >
                                        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                                    </button>
                                    <button
                                        onClick={nextCarouselSlide}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 md:w-14 md:h-14 bg-[#00add3] text-white rounded-full flex items-center justify-center hover:bg-[#00d1ff] transition-all duration-300 hover:scale-110 shadow-lg"
                                        aria-label="Next project"
                                    >
                                        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                                    </button>
                                </>
                            )}

                            {/* Carousel Indicators */}
                            {featuredProjects.length > 1 && (
                                <div className="flex justify-center gap-2 mt-6">
                                    {featuredProjects.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentCarouselIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                index === currentCarouselIndex
                                                    ? "bg-[#00add3] w-8"
                                                    : "bg-white/30 hover:bg-white/50"
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        )
    }

    const AllProjectsGrid = () => {
        return (
            <>
                <div className="w-full max-w-[1200px]">
                    <h3 className="font-poppins-bold text-white mb-8 text-2xl md:text-3xl text-center">
                        {ENABLE_CAROUSEL && featuredProjects.length > 0 ? "More Projects" : "All Projects"}
                    </h3>

                    <div className="relative">
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 min-h-[500px]">
                            {currentProjects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => {
                                        setSelectedProject(project);
                                        setCurrentImageIndex(0); // Reset image carousel to first image
                                    }}
                                    className="bg-gradient-to-b from-[rgba(56,56,56,0.56)] to-[rgba(56,56,56,0)] rounded-[24px] p-6 md:p-8 text-left transition-all duration-300 hover:scale-105 hover:from-[rgba(56,56,56,0.7)] hover:to-[rgba(56,56,56,0.1)]"
                                >
                                    <h3 className="font-poppins-bold text-white mb-3 md:mb-4 text-xl md:text-2xl">
                                        {project.title}
                                    </h3>
                                    <p className="font-poppins text-white/80 leading-relaxed text-base md:text-lg">
                                        {project.shortDescription}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
                                        {project.technologies.slice(0, 3).map((tech, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#00add3]/20 text-[#00add3] rounded-full text-sm md:text-base font-['Poppins:Medium',sans-serif]"
                                            >
                                            {tech}
                                        </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-3 py-1 bg-[#00add3]/20 text-[#00add3] rounded-full text-sm md:text-base
                                        font-poppins-semi-bold">
                                            +{project.technologies.length - 3} more
                                        </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Pagination Navigation Buttons */}
                        {totalPages > 1 && (
                            <>
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 0}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 md:w-14 md:h-14 bg-[#00add3] text-white rounded-full flex items-center justify-center hover:bg-[#00d1ff] transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages - 1}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 md:w-14 md:h-14 bg-[#00add3] text-white rounded-full flex items-center justify-center hover:bg-[#00d1ff] transition-all duration-300 hover:scale-110 shadow-lg disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Page Indicators */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                    <span className="font-poppins-semi-bold text-white/60 text-sm md:text-base">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                            index === currentPage
                                                ? "bg-[#00add3] w-6"
                                                : "bg-white/30 hover:bg-white/50"
                                        }`}
                                        aria-label={`Go to page ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }

    const ProjectModalImagesCarousel = () => {
        return (
            <>
                {selectedProject && (
                    selectedProject.images && selectedProject.images.length > 0 && (
                            <div className="mb-6 md:mb-8">
                                <div className="relative">
                                    {/* Main Image Display */}
                                    <div className="relative overflow-hidden rounded-lg">
                                        <button
                                            onClick={() => setLightboxImage(selectedProject.images![currentImageIndex])}
                                            className="w-full cursor-zoom-in"
                                        >
                                            <img
                                                src={selectedProject.images[currentImageIndex]}
                                                alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                                className="w-full h-[250px] md:h-[350px] object-cover rounded-lg hover:opacity-90 transition-opacity"
                                            />
                                        </button>

                                        {/* Navigation Arrows - only show if more than 1 image */}
                                        {selectedProject.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images!.length) % selectedProject.images!.length)}
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                                                </button>
                                                <button
                                                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images!.length)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnail Navigation */}
                                    {selectedProject.images.length > 1 && (
                                        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                                            {selectedProject.images.map((image, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                        index === currentImageIndex
                                                            ? "border-[#00add3] opacity-100"
                                                            : "border-white/20 opacity-50 hover:opacity-75"
                                                    }`}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Image Counter */}
                                    {selectedProject.images.length > 1 && (
                                        <p className="text-white/60 text-sm text-center mt-2 font-poppins">
                                            {currentImageIndex + 1} / {selectedProject.images.length}
                                        </p>
                                    )}
                                </div>
                            </div>
                    )
                )}
            </>
        )
    }

    const ImageLightBox = () => {
        return (
            <>
                {lightboxImage && (
                    <div
                        className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white transition-colors z-10"
                        >
                            <X className="w-8 h-8 md:w-10 md:h-10" />
                        </button>
                        <img
                            src={lightboxImage}
                            alt="Full size preview"
                            className="max-w-full max-h-full object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </>
        )
    }

    return (
        <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24">
            <h2 className="font-poppins-semi-bold text-white mb-12 md:mb-24 text-4xl md:text-5xl lg:text-6xl">
                Projects
            </h2>

            {/* Featured Projects Carousel */}
            {FeaturedProjectsCarousel()}

            {/* All Projects Grid with Pagination */}
            {AllProjectsGrid()}

            {/* Project Detail Modal */}
            {ProjectDetailModal()}

            {/* Image Lightbox */}
            {ImageLightBox()}

        </section>
    )
}