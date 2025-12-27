// src/components/ContactForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowRight, Send } from 'lucide-react';
import { generateSystemPDF } from '../utils/pdfGenerator.js';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
    const { nextStage, pkgTotal, efficiency, selectedModules, userProfile } = useCalculator();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submissionData = {
            contact: formData,
            system: {
                totalCost: pkgTotal.totalCost,
                efficiencyScore: efficiency.score,
                efficiencyLabel: efficiency.label,
                modules: selectedModules
            },
            context: userProfile,
            timestamp: new Date().toISOString()
        };

        // Prepare template parameters for EmailJS
        // You generally pass flat objects or stringified JSON to email templates
        const templateParams = {
            to_name: "Social Samsara Team",
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            company: formData.company,
            total_cost: `Rs. ${pkgTotal.totalCost.toLocaleString()}`,
            efficiency_score: `${efficiency.score}% (${efficiency.label})`,
            modules_summary: JSON.stringify(selectedModules, null, 2),
            brand_context: JSON.stringify(userProfile, null, 2)
        };

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error("Missing EmailJS Environment Variables");
            alert("Email service is not configured. Check your .env setup!");
            setIsSubmitting(false);
            return;
        }

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((result) => {
                console.log('EMAIL SENT SUCCESS!', result.text);
                // Generate PDF Blob (Internal use/logger)
                generateSystemPDF(submissionData, false);

                nextStage(); // Go to Success Screen
            }, (error) => {
                console.error('EMAIL FAILED...', error.text);
                alert("Failed to send email. Please try again or contact support.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-2xl mx-auto flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm bg-opacity-90"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">Save Your Time</h2>
                    <p className="text-gray-400">
                        We'll review your custom build and reach out.<br />
                        Let us handle the execution so you can reclaim your time.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                            placeholder="name@company.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="+91..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wide">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Company Name"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span>Generating Report...</span>
                        ) : (
                            <>
                                Submit <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs text-gray-600 mt-4">
                        We respect your privacy. No spam.
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default ContactForm;
