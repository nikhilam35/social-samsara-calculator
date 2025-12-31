// src/components/EfficiencyMeter.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence
import { useCalculator } from '../context/CalculatorContext.jsx';
import { getServiceById } from '../utils/pricingEngine.js';
import clsx from 'clsx';
import { ShoppingCart, ChevronDown, X } from 'lucide-react'; // Added X for close icon

const EfficiencyMeter = () => {
    const { efficiency, pkgTotal, goToStage, STAGES } = useCalculator();
    const [isOpen, setIsOpen] = React.useState(false);

    // Removed isMobile state and auto-open logic. 
    // The drawer is always collapsible now.

    return (
        <>
            {/* FAB Toggle Button - Visible when closed */}
            <AnimatePresence>
                {pkgTotal.totalCost > 0 && !isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 bg-[#1a1a1a] text-white p-0 rounded-full shadow-2xl border border-white/20 backdrop-blur-md flex items-center justify-center w-16 h-16 group"
                    >
                        {/* Progress Ring */}
                        <div className="absolute inset-0">
                            <svg className="w-full h-full -rotate-90 p-1">
                                {/* Background Track */}
                                <circle
                                    cx="50%" cy="50%" r="26"
                                    stroke="currentColor" strokeWidth="4"
                                    fill="transparent"
                                    className="text-white/10"
                                />
                                {/* Progress Indicator */}
                                <motion.circle
                                    cx="50%" cy="50%" r="26"
                                    stroke="currentColor" strokeWidth="4"
                                    fill="transparent"
                                    strokeLinecap="round"
                                    className={clsx(
                                        "transition-colors duration-500",
                                        efficiency.level === 'low' ? "text-red-500" :
                                            efficiency.level === 'medium' ? "text-yellow-500" : "text-green-500"
                                    )}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: efficiency.score / 100 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </svg>
                        </div>

                        <ShoppingCart className="w-6 h-6 relative z-10 text-white group-hover:scale-110 transition-transform" />

                        {/* Badge for item count */}
                        {Object.keys(pkgTotal.breakdown || {}).length > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-[#1a1a1a]">
                                {Object.keys(pkgTotal.breakdown || {}).length}
                            </div>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Cart Drawer Panel */}
            <AnimatePresence>
                {isOpen && pkgTotal.totalCost > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
                    >
                        <div
                            onClick={() => goToStage(STAGES.PLAYGROUND)}
                            className="relative cursor-pointer bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-lg bg-opacity-95 hover:border-white/30 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/20 rounded-lg">
                                        <ShoppingCart className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium text-lg leading-none">Cart Summary</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={clsx(
                                                "w-2 h-2 rounded-full",
                                                efficiency.level === 'low' ? "bg-red-500" :
                                                    efficiency.level === 'medium' ? "bg-yellow-500" : "bg-green-500"
                                            )} />
                                            <span className="text-xs text-gray-400">{efficiency.label} System</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                                >
                                    <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                </button>
                            </div>

                            {/* Efficiency Bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-gray-500">Integration Score</span>
                                    <span className="text-white font-mono">{efficiency.score}%</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${efficiency.score}%` }}
                                        transition={{ duration: 1 }}
                                    />
                                </div>
                                <p className="text-[11px] text-gray-500 mt-2 leading-tight">
                                    {efficiency.level === 'low' && "Systems isolated. High fragmentation."}
                                    {efficiency.level === 'medium' && "Partial overlap. Emerging efficiency."}
                                    {efficiency.level === 'high' && "High integration. Maximum value flow."}
                                </p>
                            </div>

                            {/* Module Dots */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {Object.entries(pkgTotal.breakdown || {}).map((item) => {
                                    const service = getServiceById(item.serviceId);
                                    if (!service) return null;
                                    return (
                                        <div
                                            key={item.serviceId}
                                            className="group/tooltip relative"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-white/40 group-hover/tooltip:bg-white transition-colors" />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/20 rounded text-[10px] text-white whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity">
                                                {service.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Footer: Price */}
                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Monthly Investment</div>
                                    <div className="text-xs text-gray-600">excl. taxes</div>
                                </div>
                                <div className="text-2xl font-light text-white">
                                    ₹{pkgTotal.totalCost.toLocaleString('en-IN')}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EfficiencyMeter;
