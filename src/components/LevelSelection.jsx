// src/components/LevelSelection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { LEVELS } from '../data/pricingData.js';
import { getServiceById, calculateModuleCost } from '../utils/pricingEngine.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowLeft, Check } from 'lucide-react';

const LevelSelection = () => {
    const {
        activeServiceId, nextStage, prevStage,
        addModule, selectedModules
    } = useCalculator();

    const service = getServiceById(activeServiceId);

    // Safety check
    if (!service) return <div className="p-20 text-center">Service not found.</div>;

    const currentLevel = selectedModules[service.id];

    const handleSelectLevel = (levelKey) => {
        addModule(service.id, levelKey);
        nextStage(); // Go to Cost Reveal (Stage 5)
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-5xl mx-auto">
            <div className="w-full flex justify-center mb-12">
                <button
                    onClick={prevStage}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all shadow-lg backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Modules
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center flex flex-col items-center"
            >
                <span className="text-gray-500 text-sm uppercase tracking-widest mb-2 block">Configuring</span>
                <h2 className="text-4xl md:text-5xl font-light mb-4">{service.name}</h2>
                <p className="text-xl text-gray-400">
                    Different levels suit different stages.<br />
                    This isn’t about volume. It’s about intent.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                {Object.entries(LEVELS).map(([key, level], index) => {
                    const isSelected = currentLevel === key;
                    const details = calculateModuleCost(service.id, key); // Calculate live cost

                    return (
                        <motion.button
                            key={key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleSelectLevel(key)}
                            className={`
                                relative text-left p-8 rounded-2xl border transition-all group w-full
                                ${isSelected
                                    ? 'bg-white/10 border-white'
                                    : 'bg-[#1a1a1a] border-white/10 hover:border-white/40'
                                }
                            `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className={`text-2xl font-medium block ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                        {level.label}
                                    </span>
                                    <span className="text-sm text-gray-500 mt-1 block">
                                        Includes {details.quantity} {service.unit}s
                                    </span>
                                </div>
                                {isSelected && <Check className="w-6 h-6 text-green-400" />}
                            </div>

                            <p className="text-gray-400 mb-6 leading-relaxed text-sm h-10">
                                {level.description}
                            </p>

                            <div className="flex items-end justify-between border-t border-white/5 pt-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</div>
                                    <div className={`text-xl font-light ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                        ₹{details.cost.toLocaleString('en-IN')}
                                    </div>
                                </div>

                                <div className={`
                                    text-sm font-medium transition-colors px-3 py-1 rounded-full border
                                    ${isSelected
                                        ? 'bg-white text-black border-white'
                                        : 'border-white/20 text-white/50 group-hover:text-white group-hover:border-white/40'
                                    }
                                `}>
                                    {isSelected ? 'Selected' : 'Select'}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default LevelSelection;
