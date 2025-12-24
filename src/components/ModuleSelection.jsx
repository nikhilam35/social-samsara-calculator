// src/components/ModuleSelection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { WORLDS } from '../data/pricingData.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowLeft, Plus } from 'lucide-react';

const ModuleSelection = () => {
    const {
        activeWorld, setActiveServiceId, nextStage, prevStage,
        selectedModules, goToStage, STAGES
    } = useCalculator();

    // Fallback if no world selected (shouldn't happen in normal flow)
    const world = WORLDS[activeWorld] || WORLDS.FOUNDATION;

    const handleBack = () => {
        // Go back to World Map
        goToStage(STAGES.WORLD_MAP);
    };

    const handleSelectModule = (serviceId) => {
        setActiveServiceId(serviceId);
        nextStage(); // Go to Level Selection (Stage 4)
    };

    return (
        <div className="min-h-screen py-20 px-6 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-12 text-center flex flex-col items-center"
            >
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to System Map
                </button>
                <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ color: world.color }}>
                    {world.name}
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                    {world.description} <br />
                    <span className="text-sm text-gray-500 mt-2 block">Choose what you want to build.</span>
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {world.services.map((service, index) => {
                    const isSelected = !!selectedModules[service.id];
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`
                                relative p-8 rounded-2xl border transition-all flex flex-col items-start
                                ${isSelected
                                    ? 'bg-white/10 border-white/40'
                                    : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'
                                }
                            `}
                        >
                            <h3 className="text-2xl font-light mb-2">{service.name}</h3>
                            <p className="text-gray-500 text-sm mb-6 flex-grow">
                                {service.description}
                                <span className="block mt-2 italic opacity-60">"Works best with..." hints would go here</span>
                            </p>

                            <button
                                onClick={() => handleSelectModule(service.id)}
                                className={`
                                    w-full py-3 rounded-lg border font-medium transition-all flex items-center justify-center gap-2
                                    ${isSelected
                                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                                        : 'border-white/20 hover:bg-white hover:text-black hover:border-white'
                                    }
                                `}
                            >
                                {isSelected ? 'Update Level' : 'Add to System'}
                                {!isSelected && <Plus className="w-4 h-4" />}
                            </button>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ModuleSelection;
