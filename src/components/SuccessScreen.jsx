// src/components/SuccessScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useCalculator } from '../context/CalculatorContext.jsx';
import { CheckCircle, ArrowLeft } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const SuccessScreen = () => {
    const { goToStage, STAGES } = useCalculator();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen py-20 px-6 w-full flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-[#1e1e1e] border border-green-500/20 rounded-full p-6 mb-8 bg-green-900/10"
            >
                <CheckCircle className="w-16 h-16 text-green-400" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-light mb-6 text-white"
            >
                System Locked.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-xl leading-relaxed mb-12"
            >
                We have received your configuration. Our team will review your system efficiency score and contact you ASAP.
            </motion.p>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleHome}
                className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors text-white"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </motion.button>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 opacity-50 text-sm font-mono text-gray-500"
            >
                samsara@exetera.in
            </motion.div>
        </div>
    );
};

export default SuccessScreen;
