// src/components/RetainerPath.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowRight, Check, X } from 'lucide-react';

const RetainerPath = () => {
    const { pkgTotal, nextStage } = useCalculator();

    // Fabricate a "Transactional" price for comparison (e.g. 1.4x the system price)
    // In reality, this would be calculated by summing up non-bundled base prices.
    // For now we simulate the markup.
    const transactionalPrice = Math.round(pkgTotal.totalCost * 1.45);
    const systemPrice = pkgTotal.totalCost;

    return (
        <div className="min-h-screen py-20 px-6 max-w-6xl mx-auto flex flex-col items-center">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16 max-w-2xl"
            >
                <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                    ✨ System Stability Unlocked
                </div>
                <h2 className="text-4xl md:text-5xl font-light mb-6">Compare Approaches</h2>
                <p className="text-xl text-gray-400">
                    Brands with interconnected systems work best on a monthly rhythm.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* Transactional Path */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-8 md:p-12 rounded-3xl border border-white/5 bg-[#1a1a1a] opacity-60 hover:opacity-100 transition-opacity"
                >
                    <h3 className="text-2xl font-light mb-2 text-gray-400">One-off Execution</h3>
                    <div className="text-4xl font-light mb-8">₹{transactionalPrice.toLocaleString('en-IN')}</div>

                    <ul className="space-y-4 mb-8 text-gray-400">
                        <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-400" /> Higher per-unit cost</li>
                        <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-400" /> Context resets monthly</li>
                        <li className="flex items-center gap-3"><X className="w-5 h-5 text-red-400" /> More coordination effort</li>
                    </ul>
                </motion.div>

                {/* System Path (Retainer) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative p-8 md:p-12 rounded-3xl border border-white/20 bg-gradient-to-b from-[#1e1e1e] to-black"
                >
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                    <h3 className="text-2xl font-light mb-2 text-white">Monthly System (Retainer)</h3>
                    <div className="text-4xl font-light mb-2 text-white">₹{systemPrice.toLocaleString('en-IN')} <span className="text-lg text-gray-500">/ month</span></div>
                    <div className="text-green-400 text-sm mb-8">Efficient System Savings Applied</div>

                    <ul className="space-y-4 mb-10 text-gray-300">
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400" /> Lower per-unit cost</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400" /> Continuous optimisation</li>
                        <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400" /> Shared learning across systems</li>
                    </ul>

                    <button
                        onClick={nextStage} // Moves to Stage 10 (Contact Form)
                        className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                    >
                        Choose System Path <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">Same ambition. Different outcomes.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default RetainerPath;
