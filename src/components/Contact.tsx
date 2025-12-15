import {useState, useRef} from "react";
import emailjs from "@emailjs/browser";
import { Mail, Linkedin, Send} from "lucide-react";
import type {ContactProps} from "../types/Contact.ts";
import * as React from "react";

export const Contact: React.FC<ContactProps> = ({ email, linkedin }) => {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage("Sending...");

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log(serviceId)
        console.log(templateId)
        console.log(publicKey)

        if (!serviceId || !templateId || !publicKey) {
            setStatusMessage("Error: EmailJS credentials are not set.");
            setIsSubmitting(false);
            return;
        }

        if (!form.current) {
            setStatusMessage("Error: Form reference is not available.");
            setIsSubmitting(false);
            return;
        }

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then(() => {
                setStatusMessage("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" });
            }, (error) => {
                console.error("EmailJS error:", error);
                setStatusMessage("Failed to send message. Please try again later.");
            })
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setStatusMessage(""), 5000); // Clear message after 5 seconds
            });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-24">
            {/* Inverted Background Image */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                    src="background/bg_image_bw.jpg"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50 transform rotate-180"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#222222]" />
            </div>

            <h2 className="relative z-10 font-poppins-semi-bold text-white mb-12 md:mb-24 text-4xl md:text-5xl lg:text-6xl">
                Contact
            </h2>

            <div className="relative z-10 w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Contact Information */}
                <div className="space-y-6 md:space-y-8">
                    <div>
                        <h3 className="font-poppins-bold text-white mb-4 md:mb-8 text-2xl md:text-3xl">
                            Get in Touch
                        </h3>
                        <p className="font-poppins text-white/80 leading-relaxed
                            mb-6 md:mb-8 text-base md:text-lg">
                            Feel free to reach out to me for any inquiries, collaborations, or just to say hello!
                        </p>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        <a
                            href={`mailto:${email}`}
                            className="flex items-center gap-4 text-white hover:text-[#00add3] transition-colors group"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#00add3]/20 flex items-center justify-center group-hover:bg-[#00add3]/30 transition-colors">
                                <Mail className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div>
                                <p className="font-poppins-bold text-base md:text-lg">Email</p>
                                <p className="font-poppins-bold text-sm md:text-base break-all">{email}</p>
                            </div>
                        </a>

                        <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 text-white hover:text-[#00add3] transition-colors group"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#00add3]/20 flex items-center justify-center group-hover:bg-[#00add3]/30 transition-colors">
                                <Linkedin className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                            <div>
                                <p className="font-poppins-bold text-base md:text-lg">LinkedIn</p>
                                <p className="font-poppins text-sm md:text-base">Connect with me</p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="relative bg-gradient-to-b from-[rgba(56,56,56,0.56)] to-[rgba(56,56,56,0)] rounded-[24px] p-6 md:p-8">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block font-poppins-bold  text-white mb-2 text-base md:text-lg"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00add3] transition-colors font-poppins  text-base md:text-lg"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block font-poppins-bold  text-white mb-2 text-base md:text-lg"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00add3] transition-colors font-poppins text-base md:text-lg"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block font-poppins-bold  text-white mb-2 text-base md:text-lg"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-2.5 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#00add3] transition-colors font-poppins resize-none text-base md:text-lg"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 md:py-3.5 bg-[#00add3] text-white rounded-lg font-poppins-semi-bold  hover:bg-[#00d1ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
                        >
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                        {statusMessage && (
                            <p className="text-center font-poppins text-white mt-4">{statusMessage}</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
