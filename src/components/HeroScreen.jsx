// src/components/HeroScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../data/copy.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowRight } from 'lucide-react';
const HeroScreen = () => {
    const { nextStage } = useCalculator();
    const { headline, subtext, cta, secondary } = COPY.LANDING;

    return (
        <div className="relative h-screen w-full flex flex-col justify-center items-center text-center px-6 overflow-hidden">
            {/* Animated Background */}

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {headline}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        {subtext}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <button
                        onClick={nextStage}
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full text-lg font-medium tracking-wide hover:bg-gray-100 transition-all active:scale-95"
                    >
                        {cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
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

