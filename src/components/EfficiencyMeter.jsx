// src/components/EfficiencyMeter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { getServiceById } from '../utils/pricingEngine.js';
import clsx from 'clsx';
import { ShoppingCart, ChevronDown } from 'lucide-react';

const EfficiencyMeter = () => {
    const { efficiency, pkgTotal, goToStage, STAGES } = useCalculator();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    // Initial check and event listener for screen size
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-open on desktop, controlled on mobile
    React.useEffect(() => {
        if (!isMobile) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [isMobile]);

    return (
        <>
            {/* Mobile Toggle Button (Widget) */}
            {pkgTotal.totalCost > 0 && isMobile && !isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed top-6 right-6 z-50 bg-[#1a1a1a] text-white p-3 rounded-full shadow-lg border border-white/20 backdrop-blur-md flex items-center justify-center w-14 h-14"
                >
                    {/* Progress Ring */}
                    <div className="absolute inset-0">
                        <svg className="w-full h-full -rotate-90 p-1">
                            {/* Background Track */}
                            <circle
                                cx="50%" cy="50%" r="22" // Adjusted radius to fit inside padding
                                stroke="currentColor" strokeWidth="3"
                                fill="transparent"
                                className="text-gray-700"
                            />
                            {/* Progress Indicator */}
                            <motion.circle
                                cx="50%" cy="50%" r="22"
                                stroke="currentColor" strokeWidth="3"
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

                    <ShoppingCart className="w-5 h-5 relative z-10" />
                </motion.button>
            )}

            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{
                    y: (!isOpen && isMobile) ? 100 : 0,
                    opacity: (!isOpen && isMobile) ? 0 : 1,
                    pointerEvents: (!isOpen && isMobile) ? 'none' : 'auto'
                }}
                className={clsx(
                    "fixed z-50 transition-all duration-300",
                    isMobile ? "bottom-0 left-0 right-0 p-4 flex justify-center pointer-events-none" : "bottom-6 right-6 pointer-events-none"
                )}
            >
                {/* Only show if modules selected */}
                {pkgTotal.totalCost > 0 && (
                    <div
                        onClick={() => goToStage(STAGES.PLAYGROUND)}
                        className={clsx(
                            "relative cursor-pointer bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-lg bg-opacity-95 hover:border-white/30 transition-colors pt-12", // Added pt-12 for space
                            isMobile ? "w-full max-w-sm" : "w-96 pointer-events-auto"
                        )}
                    >
                        {/* Mobile Close Button (Pulsing Arrow) */}
                        {isMobile && (
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="absolute -top-5 left-1/2 -translate-x-1/2 focus:outline-none z-50"
                            >
                                <div className="animate-bounce bg-[#1a1a1a] text-white p-2 rounded-full border border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
                                    <ChevronDown className="w-6 h-6" />
                                </div>
                            </button>
                        )}
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
            </motion.div >
        </>
    );
};

export default EfficiencyMeter;
