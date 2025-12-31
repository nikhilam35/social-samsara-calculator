import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import HeroBackground from '../components/HeroBackground';

const Home = () => {
    const navigate = useNavigate();

    const brandLogos = Array.from({ length: 21 }, (_, i) =>
        `https://www.exetera.in/assets/brands/logos-${i.toString().padStart(2, '0')}.png`
    );

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Hero Section */}
            <section className="flex-grow flex items-center justify-center relative overflow-hidden h-screen w-full">
                {/* Custom Gradient Background */}
                <div className="absolute inset-0 z-0">
                    <HeroBackground />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] shadow-black">
                            Skyrocket Your Sales. Seriously.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                            Is your marketing delivering real revenue, or just... noise?
                        </p>
                        <motion.button
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
                            onClick={() => navigate('/calculator')}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
                        >
                            Start Growing Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {/* Ripple Effect Ring */}
                            <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping pointer-events-none" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Problem/Solution Section */}
            <section className="py-24 bg-white/5 backdrop-blur-sm z-10 relative">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stop Guessing. <br /><span className="text-purple-400">Start Growing.</span></h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Most businesses pour money into digital marketing and see very little in return. Fragmented strategies, generic content, and a constant scramble to keep up.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            You're losing sales, missing opportunities, and wondering if there's a better way to grow. <strong>There is.</strong>
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white/5 p-8 rounded-2xl border border-white/10"
                    >
                        <h3 className="text-2xl font-semibold text-white mb-4">Social Samsara is your Partner.</h3>
                        <p className="text-gray-400 mb-6">
                            We deliver 360° digital transformation designed to explode your sales and build unshakable brand authority.
                        </p>
                        <p className="text-gray-400">
                            We're not just another agency. We're your dedicated growth engine, fusing cutting-edge AI with proven data strategies and compelling storytelling.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Logos Section - Carousel */}
            <section className="py-20 border-t border-white/10 z-10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center mb-10">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Trusted by the Brands You Know</p>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex w-max">
                        <motion.div
                            className="flex gap-16 px-8"
                            animate={{ x: "-50%" }}
                            transition={{
                                duration: 40,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {/* Duplicate list for seamless loop */}
                            {[...brandLogos, ...brandLogos].map((src, i) => (
                                <div key={i} className="flex-shrink-0 grayscale transition-all duration-500 hover:filter-none opacity-60 hover:opacity-100">
                                    <img
                                        src={src}
                                        alt="brand logo"
                                        className="h-12 md:h-16 w-auto object-contain pointer-events-none"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services/Features Grid */}
            <section className="py-24 z-10 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How We Drive Your Revenue</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We guide your brand through its own cycle of growth: Analyse → Adapt → Transform → Thrive.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "AI-Powered Sales Funnels", desc: "From LLM optimization to privacy-compliant ad targeting, we build pathways that lead directly to sales." },
                            { title: "Predictive Revenue Growth", desc: "We analyze data to identify your most profitable customers and optimize every touchpoint." },
                            { title: "Brand Authority & Trust", desc: "Through reputation and sentiment analysis and expert influencer matchmaking, we build a brand that buyers trust." },
                            { title: "Seamless Marketing Power", desc: "Our retainer-based model gives you an entire marketing team focused on increasing your bottom line." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors"
                            >
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-b from-[#121212] to-purple-900/20 z-10 relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Talk Revenue?</h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Stop leaving money on the table. It's time to transform your digital presence into a powerful sales machine.
                    </p>
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 inline-block w-full max-w-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Discover Your Sales Potential</h3>
                        <p className="text-gray-300 mb-8">
                            Ready to see how a strategic partnership can directly boost your sales and revenue? Click below to use our instant retainer fee calculator.
                        </p>
                        <motion.button
                            onClick={() => navigate('/calculator')}
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
                            className="w-full md:w-auto px-10 py-4 bg-white text-black text-lg font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all group relative"
                        >
                            Cost Calculator
                            {/* Ripple Effect Ring */}
                            <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping pointer-events-none" />
                        </motion.button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
