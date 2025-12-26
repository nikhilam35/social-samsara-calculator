import React from 'react';
import { useCalculator } from '../context/CalculatorContext.jsx';
import HeroScreen from './HeroScreen.jsx';
import ContextPriming from './ContextPriming.jsx';
import WorldMap from './WorldMap.jsx';
import ModuleSelection from './ModuleSelection.jsx';
import LevelSelection from './LevelSelection.jsx';
import CostReveal from './CostReveal.jsx';
import EfficiencyMeter from './EfficiencyMeter.jsx';
import Playground from './Playground.jsx';
import RetainerPath from './RetainerPath.jsx';
import FinalSummary from './FinalSummary.jsx';
import ContactForm from './ContactForm.jsx';
import SuccessScreen from './SuccessScreen.jsx';
import InteractiveBackground from './InteractiveBackground.jsx';
import { AnimatePresence, motion } from 'framer-motion';

import HeroBackground from './HeroBackground.jsx';

const CalculatorWrapper = () => {
    const { currentStage, STAGES } = useCalculator();

    const renderStage = () => {
        switch (currentStage) {
            case STAGES.LANDING: return <HeroScreen />;
            case STAGES.PRIMING: return <ContextPriming />;
            case STAGES.WORLD_MAP: return <WorldMap />;
            case STAGES.MODULE_SELECTION: return <ModuleSelection />;
            case STAGES.LEVEL_SELECTION: return <LevelSelection />;
            case STAGES.COST_REVEAL: return <CostReveal />;
            case STAGES.PLAYGROUND: return <Playground />;
            case STAGES.RETAINER_PATH: return <RetainerPath />;
            case STAGES.CONTACT_FORM: return <ContactForm />;
            case STAGES.SUCCESS: return <SuccessScreen />;
            case STAGES.FINAL_SUMMARY: return <FinalSummary />;
            default: return <div className="text-center pt-20">Stage {currentStage} Not Implemented</div>;
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Gradient Background */}
            <div className="fixed inset-0 z-0">
                <HeroBackground />
            </div>
            {/* Particles Layer */}
            <InteractiveBackground />
            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStage}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                    >
                        {renderStage()}
                    </motion.div>
                </AnimatePresence>
            </div>
            <EfficiencyMeter />
        </div>
    );
};

export default CalculatorWrapper;
