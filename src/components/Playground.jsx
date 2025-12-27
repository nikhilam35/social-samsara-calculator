// src/components/Playground.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { getServiceById, calculateModuleCost } from '../utils/pricingEngine.js';
import { Trash2, AlertCircle, ArrowRight } from 'lucide-react';

const Playground = () => {
    const {
        selectedModules, removeModule, nextStage, prevStage,
        pkgTotal, efficiency, goToStage, STAGES
    } = useCalculator();

    const handleRemove = (serviceId) => {
        removeModule(serviceId);
    };

    const handleContinue = () => {
        nextStage(); // Go to Retainer Path
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
            {/* Left: Module List */}
            <div className="flex-1">
                <button
                    onClick={() => goToStage(STAGES.WORLD_MAP)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all mb-8 shadow-lg backdrop-blur-sm"
                >
                    &larr; Add more modules
                </button>

                <h2 className="text-4xl font-light mb-2">Explore trade-offs</h2>
                <p className="text-gray-400 mb-8">
                    You can remove or adjust anything. Watch how it affects the system.
                </p>

                <div className="space-y-4">
                    <AnimatePresence>
                        {Object.entries(selectedModules).map(([serviceId, levelKey]) => {
                            const service = getServiceById(serviceId);
                            if (!service) return null;
                            const details = calculateModuleCost(serviceId, levelKey);

                            return (
                                <motion.div
                                    key={serviceId}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 flex items-center justify-between group"
                                >
                                    <div>
                                        <h4 className="font-medium text-lg">{service.name}</h4>
                                        <span className="text-sm text-gray-500">{levelKey} Level</span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="text-white">₹{details.cost.toLocaleString('en-IN')}</div>
                                            {/* <div className="text-xs text-green-400">Save ₹{details.savings.toLocaleString()}</div> */}
                                        </div>

                                        <button
                                            onClick={() => handleRemove(serviceId)}
                                            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {Object.keys(selectedModules).length === 0 && (
                        <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-gray-500">
                            No modules selected. Go back to add some.
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Impact Panel */}
            <div className="w-full md:w-96 sticky top-20 h-fit">
                <div className="bg-[#1e1e1e] border border-white/10 rounded-3xl p-8">
                    <h3 className="text-xl font-light mb-6">System Impact</h3>

                    <div className="mb-8">
                        <div className="text-sm text-gray-500 mb-1">Efficiency System</div>
                        <div className="text-2xl text-white mb-2">{efficiency.label}</div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-yellow-500"
                                animate={{ width: `${efficiency.score}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {efficiency.level === 'high' ? 'Maximum compounding.' : 'Add more compatible modules to increase efficiency.'}
                        </p>
                    </div>

                    <div className="mb-8 pt-6 border-t border-white/10">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-400">Total Monthly</span>
                            <span className="text-3xl font-light text-white">₹{pkgTotal.totalCost.toLocaleString('en-IN')}</span>
                        </div>
                        {/* <div className="text-right text-sm text-green-400">
                             Total Savings: ₹{pkgTotal.totalSavings.toLocaleString('en-IN')}
                         </div> */}
                    </div>

                    {Object.keys(selectedModules).length >= 1 && (
                        <button
                            onClick={handleContinue}
                            className="w-full py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors flex justify-center items-center gap-2"
                        >
                            Analyze Stability <ArrowRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Warnings Section (Example) */}
                {/* <div className="mt-6 flex gap-3 text-sm text-gray-400">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <p>Removing SEO reduces long-term discoverability.</p>
                </div> */}
            </div>
        </div>
    );
};

export default Playground;
