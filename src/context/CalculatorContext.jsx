// src/context/CalculatorContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateSystemTotal, getEfficiencyLevel } from '../utils/pricingEngine.js';

const CalculatorContext = createContext();

export const useCalculator = () => useContext(CalculatorContext);

const STAGES = {
    LANDING: 0,
    PRIMING: 1,
    WORLD_MAP: 2,
    MODULE_SELECTION: 3,
    LEVEL_SELECTION: 4,
    COST_REVEAL: 5,
    EFFICIENCY_METER: 6,
    PLAYGROUND: 8,
    RETAINER_PATH: 9,
    CONTACT_FORM: 10,
    SUCCESS: 11,
    FINAL_SUMMARY: 12
};

export const CalculatorProvider = ({ children }) => {
    const [currentStage, setCurrentStage] = useState(STAGES.LANDING);
    const [userProfile, setUserProfile] = useState({});
    const [selectedModules, setSelectedModules] = useState({}); // { serviceId: levelKey }
    const [activeWorld, setActiveWorld] = useState(null); // For Stage 3
    const [activeServiceId, setActiveServiceId] = useState(null); // For Stage 4

    // Derived state
    const [pkgTotal, setPkgTotal] = useState({ totalCost: 0, totalSavings: 0, breakdown: [] });
    const [efficiency, setEfficiency] = useState({ level: 'low', label: 'Fragmented', score: 20 });

    useEffect(() => {
        setPkgTotal(calculateSystemTotal(selectedModules));
        setEfficiency(getEfficiencyLevel(selectedModules));
    }, [selectedModules]);

    const addModule = (serviceId, levelKey = 'EXPERIMENT') => {
        setSelectedModules(prev => ({
            ...prev,
            [serviceId]: levelKey
        }));
    };

    const removeModule = (serviceId) => {
        setSelectedModules(prev => {
            const next = { ...prev };
            delete next[serviceId];
            return next;
        });
    };

    const nextStage = () => setCurrentStage(prev => prev + 1);
    const prevStage = () => setCurrentStage(prev => Math.max(0, prev - 1));
    const goToStage = (stage) => setCurrentStage(stage);

    return (
        <CalculatorContext.Provider value={{
            currentStage,
            nextStage,
            prevStage,
            goToStage,
            userProfile,
            setUserProfile,
            selectedModules,
            addModule,
            removeModule,
            activeWorld,
            setActiveWorld,
            activeServiceId,
            setActiveServiceId,
            pkgTotal,
            efficiency,
            STAGES
        }}>
            {children}
        </CalculatorContext.Provider>
    );
};
