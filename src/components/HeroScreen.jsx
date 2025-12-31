// src/components/HeroScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../data/copy.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar.jsx';

const HeroScreen = () => {
    const { nextStage } = useCalculator();
    const { headline, subtext, cta, secondary } = COPY.LANDING;

    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Header / Navbar */}
            <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
            </div>

            {/* Animated Background */}

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {headline.split('\n').map((line, i) => (
                            <span key={i} className={`block ${i === 1 ? 'xl:whitespace-nowrap' : ''}`}>{line}</span>
                        ))}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {subtext.split(/(\(.*?\))/).map((part, index) =>
                            part.startsWith('(') && part.endsWith(')') ? (
                                <span key={index} className="text-white font-medium">
                                    {part.slice(1, -1)}
                                </span>
                            ) : (
                                <span key={index}>{part}</span>
                            )
                        )}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.button
                        onClick={nextStage}
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
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-lg font-medium tracking-wide hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
                    >
                        {cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                        {/* Ripple Effect Ring (Pseudo-like element for extra wave) */}
                        <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping pointer-events-none" />
                    </motion.button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-sm text-gray-600"
                >
                    {secondary}
                </motion.p>
            </div>
        </div>
    );
};

export default HeroScreen;

