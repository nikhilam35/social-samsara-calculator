// src/App.jsx
import React from 'react';
import { CalculatorProvider, useCalculator } from './context/CalculatorContext.jsx';
import HeroScreen from './components/HeroScreen.jsx';
import ContextPriming from './components/ContextPriming.jsx';
import WorldMap from './components/WorldMap.jsx';
import ModuleSelection from './components/ModuleSelection.jsx';
import LevelSelection from './components/LevelSelection.jsx';
import CostReveal from './components/CostReveal.jsx';
import EfficiencyMeter from './components/EfficiencyMeter.jsx';
import Playground from './components/Playground.jsx';
import RetainerPath from './components/RetainerPath.jsx';
import FinalSummary from './components/FinalSummary.jsx';

import InteractiveBackground from './components/InteractiveBackground.jsx';

import ContactForm from './components/ContactForm.jsx';
import SuccessScreen from './components/SuccessScreen.jsx';

import { AnimatePresence, motion } from 'framer-motion';

const StageController = () => {
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
  );
};

function App() {
  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-purple-500/30 relative">
        <InteractiveBackground />
        <div className="relative z-10">
          <StageController />
        </div>
        <EfficiencyMeter />
      </div>
    </CalculatorProvider>
  );
}

export default App;
