import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState(null); // null, 'submitting', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('https://samsara.exetera.in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen pt-20 px-6">
            <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
                        <p className="text-gray-400 mb-10 text-lg">
                            Have questions about our services or ready to start your transformation? We're here to help.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Mail className="text-purple-400 w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg">Email Us</h3>
                                    <p className="text-gray-400">hello@socialsamsara.com</p>
                                </div>
                            </div>
                            {/* Add more info if needed, keeping it generic as per request */}
                        </div>
                    </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 p-8 rounded-2xl border border-white/10"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                placeholder="How can we help you?"
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                boxShadow: [
                                    "0 0 0 0 rgba(255, 255, 255, 0)",
                                    "0 0 0 10px rgba(255, 255, 255, 0.1)",
                                    "0 0 0 20px rgba(255, 255, 255, 0)"
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="group relative w-full bg-white text-black font-bold py-4 rounded-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2"
                        >
                            Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                            {/* Ripple Effect Ring (Rounded lg for form button) */}
                            <div className="absolute inset-0 rounded-lg border border-white opacity-0 group-hover:animate-ping pointer-events-none" />
                        </motion.button>
                        <div className="mt-4 text-center">
                            {status === 'submitting' && <p className="text-gray-400">Sending...</p>}
                            {status === 'success' && <p className="text-green-400">Message sent successfully! We'll be in touch.</p>}
                            {status === 'error' && <p className="text-red-400">Something went wrong. Please try again later.</p>}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
