// src/components/ContextPriming.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COPY, PRIMING_QUESTIONS } from '../data/copy.js';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { ArrowRight, Check } from 'lucide-react';

const ContextPriming = () => {
    const { nextStage, userProfile, setUserProfile } = useCalculator();
    const [currentQIndex, setCurrentQIndex] = useState(0);

    const currentQuestion = PRIMING_QUESTIONS[currentQIndex];
    const isLastQuestion = currentQIndex === PRIMING_QUESTIONS.length - 1;

    const handleSelect = (value) => {
        setUserProfile(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        // Auto advance after short delay for better flow
        setTimeout(() => {
            if (isLastQuestion) {
                nextStage();
            } else {
                setCurrentQIndex(prev => prev + 1);
            }
        }, 250);
    };

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center px-6 max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mb-12"
            >
                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2 block">
                    Step 1 • Context
                </span>
            </motion.div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-center mb-10 leading-snug">
                        {currentQuestion.prompt}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {currentQuestion.options.map((option) => {
                            const isActive = userProfile[currentQuestion.id] === option.value;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                    w-full p-5 rounded-xl border text-left flex justify-between items-center transition-all duration-200
                    ${isActive
                                            ? 'border-white bg-white/10 text-white'
                                            : 'border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5'
                                        }
                  `}
                                >
                                    <span className="text-lg">{option.label}</span>
                                    {isActive && <Check className="w-5 h-5 text-white" />}
                                </button>
                            );
                        })}
                    </div>

                    {currentQuestion.helper && (
                        <p className="text-center mt-6 text-gray-500 text-sm">
                            {currentQuestion.helper}
                        </p>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex gap-2">
                {PRIMING_QUESTIONS.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentQIndex ? 'w-8 bg-white' : 'w-2 bg-gray-700'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContextPriming;
