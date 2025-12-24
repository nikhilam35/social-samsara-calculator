// src/components/FinalSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { Download, MessageSquare } from 'lucide-react';

const FinalSummary = () => {
    const { pkgTotal, efficiency } = useCalculator();

    return (
        <div className="min-h-screen py-20 px-6 w-full flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl bg-[#1e1e1e] rounded-3xl p-10 md:p-16 border border-white/10 text-center"
            >
                <div className="mb-10 border-b border-white/10 pb-10">
                    <h2 className="text-4xl font-light mb-4 text-white">Your Growth System</h2>
                    <p className="text-gray-400">
                        This is not a quote. It’s a map of how your brand can grow responsibly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Investment</div>
                        <div className="text-3xl font-light">₹{pkgTotal.totalCost.toLocaleString('en-IN')}</div>
                        <div className="text-xs text-gray-500">per month</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Efficiency</div>
                        <div className="text-3xl font-light text-yellow-500">{efficiency.score}%</div>
                        <div className="text-xs text-gray-500">{efficiency.label} State</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Horizon</div>
                        <div className="text-3xl font-light text-purple-400">Long</div>
                        <div className="text-xs text-gray-500">Compounding Growth</div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <button className="w-full py-4 bg-white text-black rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" /> Download System Summary
                    </button>
                    <button className="w-full py-4 border border-white/20 rounded-xl font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                        <MessageSquare className="w-5 h-5" /> Talk this through with us
                    </button>
                    <button className="text-sm text-gray-500 hover:text-white transition-colors mt-2">
                        Save and revisit later
                    </button>
                </div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 text-gray-500 max-w-lg text-center leading-relaxed"
            >
                Most brands fail not because they spend too little — but because they spend without a system.
                You’ve taken the time to understand yours.
            </motion.p>
        </div>
    );
};

export default FinalSummary;
