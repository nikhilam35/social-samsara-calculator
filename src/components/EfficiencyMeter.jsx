// src/components/EfficiencyMeter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { getServiceById } from '../utils/pricingEngine.js';
import clsx from 'clsx';
import { ShoppingCart } from 'lucide-react';

const EfficiencyMeter = () => {
    const { efficiency, pkgTotal, goToStage, STAGES } = useCalculator();

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
            {/* Only show if modules selected */}
            {pkgTotal.totalCost > 0 && (
                <div
                    onClick={() => goToStage(STAGES.PLAYGROUND)}
                    className="pointer-events-auto cursor-pointer bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 shadow-2xl w-96 backdrop-blur-lg bg-opacity-95 hover:border-white/30 transition-colors"
                >
                    <div className="flex justify-between items-center mb-3 gap-4">
                        <div className="flex items-center gap-2 text-white font-medium whitespace-nowrap">
                            <div className="p-1.5 bg-purple-500/20 rounded-md">
                                <ShoppingCart className="w-4 h-4 text-purple-400" />
                            </div>
                            Cart Summary
                        </div>
                        <div className="text-right">
                            <span className="text-xs text-gray-400 block">System Health</span>
                            <span className="text-sm font-medium text-white">{efficiency.label}</span>
                        </div>
                    </div>

                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                        <motion.div
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${efficiency.score}%` }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                    <p className="text-xs text-gray-500 leading-tight">
                        {efficiency.level === 'low' && "Your systems are isolated. Costs are higher."}
                        {efficiency.level === 'medium' && "Partial overlap. Some learning is shared."}
                        {efficiency.level === 'high' && "High integration. Costs per outcome are dropping."}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 min-h-[1.5rem] items-center">
                        {Object.entries(pkgTotal.breakdown || {}).map((item, i) => {
                            const service = getServiceById(item.serviceId);
                            if (!service) return null;

                            return (
                                <motion.div
                                    key={item.serviceId}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="group/item relative"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover/item:bg-white group-hover/item:scale-150 transition-all cursor-help" />

                                    {/* Tooltip */}
                                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-black border border-white/20 rounded text-[10px] text-gray-300 opacity-0 group-hover/item:unmount-0 group-hover/item:opacity-100 transition-opacity pointer-events-none z-10">
                                        {service.name}
                                    </div>
                                </motion.div>
                            );
                        })}
                        {Object.keys(pkgTotal.breakdown || {}).length === 0 && (
                            <span className="text-[10px] text-gray-600 italic">No modules added yet</span>
                        )}
                        {Object.keys(pkgTotal.breakdown || {}).length > 0 && (
                            <span className="text-[10px] text-gray-500 ml-1">
                                {Object.keys(pkgTotal.breakdown || {}).length} active
                            </span>
                        )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-end">
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Est. Monthly Investment</div>
                        <div className="text-lg font-medium text-white">
                            ₹{pkgTotal.totalCost.toLocaleString('en-IN')}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default EfficiencyMeter;
