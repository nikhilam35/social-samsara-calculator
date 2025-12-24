// src/components/WorldMap.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../data/copy.js';
import { WORLDS } from '../data/pricingData.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const WorldMap = () => {
    const { nextStage, prevStage, setActiveWorld, activeWorld } = useCalculator();
    const { title, body, note } = COPY.WORLD_MAP;

    const handleEnterWorld = (worldId) => {
        setActiveWorld(worldId);
        nextStage(); // Go to Stage 3 (Module Selection)
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 max-w-3xl"
            >
                <div className="mb-6">
                    <button
                        onClick={prevStage}
                        className="text-sm text-gray-500 hover:text-white flex items-center gap-2 mx-auto transition-colors"
                    >
                        Start Over
                    </button>
                </div>
                <h2 className="text-4xl md:text-5xl font-light mb-6">{title}</h2>
                <p className="text-xl text-gray-400 leading-relaxed">{body}</p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-16">
                {Object.entries(WORLDS).map(([key, world], index) => (
                    <motion.div
                        key={world.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="group relative bg-[#1a1a1a] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all cursor-pointer flex flex-col h-full"
                        onClick={() => handleEnterWorld(key)}
                    >
                        {/* Status / Decor */}
                        <div
                            className="w-12 h-12 rounded-full mb-6 flex items-center justify-center text-xl"
                            style={{ backgroundColor: `${world.color}20`, color: world.color }}
                        >
                            {/* Icon placeholder - could be distinct per world */}
                            {world.name[0]}
                        </div>

                        <h3 className="text-2xl font-light mb-3">{world.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
                            {world.description}
                        </p>

                        <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                            Enter System <ArrowRight className="w-4 h-4 ml-2" />
                        </div>

                        {/* Hover Glow */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                            style={{ background: `radial-gradient(circle at center, ${world.color}, transparent 70%)` }}
                        />
                    </motion.div>
                ))}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-sm"
            >
                {note}
            </motion.p>
        </div>
    );
};

export default WorldMap;
