// src/components/CostReveal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { getServiceById, calculateModuleCost } from '../utils/pricingEngine.js';
import { LEVELS } from '../data/pricingData.js';
import { ArrowLeft, CheckCircle, Info } from 'lucide-react';

const CostReveal = () => {
    const {
        activeServiceId, selectedModules, nextStage, prevStage,
        goToStage, STAGES
    } = useCalculator();

    const [showBreakdown, setShowBreakdown] = useState(false);

    const service = getServiceById(activeServiceId);
    const levelKey = selectedModules[activeServiceId];

    // Safety check
    if (!service || !levelKey) return <div className="p-20">Configuration missing.</div>;

    const level = LEVELS[levelKey];
    const costDetails = calculateModuleCost(service.id, levelKey);

    const handleConfirm = () => {
        // Return to Module Selection? Or World Map?
        // Usually back to Module Selection to add more.
        goToStage(STAGES.MODULE_SELECTION);
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-4xl mx-auto flex flex-col justify-center items-center text-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1e1e1e] p-10 md:p-16 rounded-3xl border border-white/10 w-full max-w-2xl"
            >
                <div className="mb-8">
                    <span className="text-gray-500 uppercase tracking-widest text-sm mb-4 block">
                        Added to System
                    </span>
                    <h2 className="text-3xl font-light mb-2">{service.name}</h2>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-sm text-gray-300">
                        {level.label}
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className="text-xl text-gray-400">₹</span>
                        <span className="text-6xl font-light text-white">
                            {costDetails.cost.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xl text-gray-400">/ month</span>
                    </div>
                    {/* {costDetails.savings > 0 && (
                        <div className="mt-2 text-green-400 text-sm">
                            Efficient at this level. You save ₹{costDetails.savings.toLocaleString('en-IN')}
                        </div>
                    )} */}
                    <div className="mt-2 text-green-400 text-sm">
                        Most efficient at this level
                    </div>
                </div>

                {/* Breakdown Toggle */}
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="flex items-center gap-2 mx-auto text-sm text-gray-500 hover:text-white transition-colors mb-6"
                >
                    <Info className="w-4 h-4" /> Why this costs this much
                </button>

                <AnimatePresence>
                    {showBreakdown && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/20 rounded-xl p-6 text-left mb-8 overflow-hidden"
                        >
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The initial cost includes thinking, setup, and learning.<br />
                                As the system understands your business, effort per unit reduces.<br />
                                You’re not paying less for less work. You’re paying less because the system gets smarter.
                                <br /><br />
                                <span className="text-white/60">Reason: {costDetails.pricingReason}</span>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={handleConfirm}
                    className="w-full py-4 bg-white text-black rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                    <CheckCircle className="w-5 h-5" />
                    Continue Building
                </button>
            </motion.div>

            <button
                onClick={() => goToStage(STAGES.LEVEL_SELECTION)}
                className="mt-8 text-gray-500 hover:text-white transition-colors"
            >
                Change Level
            </button>
        </div>
    );
};

export default CostReveal;
