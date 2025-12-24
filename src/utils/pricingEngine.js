// src/utils/pricingEngine.js
import { LEVELS, WORLDS } from '../data/pricingData.js';

// Flatten services for easier lookup
const servicesMap = {};
Object.values(WORLDS).forEach(world => {
    world.services.forEach(service => {
        servicesMap[service.id] = service;
    });
});

export const getServiceById = (id) => servicesMap[id];

/**
 * Calculates the cost for a specific service at a given level.
 * @param {string} serviceId 
 * @param {string} levelKey key of LEVELS (e.g., 'EXPERIMENT')
 */
export const calculateModuleCost = (serviceId, levelKey) => {
    const service = servicesMap[serviceId];
    const level = LEVELS[levelKey];

    if (!service || !level) return { cost: 0, unitPrice: 0, quantity: 0, savings: 0 };

    const quantity = level.multiplier;

    // Find applicable tier
    // Sort tiers by min quantity desc to find the highest match 
    // (Assuming tiers are overlapping ranges like 1+, 5+, 10+)
    // Tiers in data are like: { min: 1, price: 75000 }, { min: 5, price: 65000 }
    const sortedTiers = [...service.tiers].sort((a, b) => b.min - a.min);

    const applicableTier = sortedTiers.find(tier => quantity >= tier.min) || sortedTiers[sortedTiers.length - 1]; // Fallback to lowest

    const unitPrice = applicableTier.price;
    const cost = unitPrice * quantity;

    // Calculate savings vs base price
    const basePrice = service.basePrice; // Usually the tier with min: 1
    const potentialCost = basePrice * quantity;
    const savings = potentialCost - cost;

    return {
        cost,
        unitPrice,
        quantity,
        basePrice,
        savings,
        pricingReason: service.reason
    };
};

/**
 * Calculates total cost and details for the entire system selections.
 * @param {Object} selectedModules Map of serviceId -> levelKey (e.g. { 'seo_audit': 'CONSISTENCY' })
 */
export const calculateSystemTotal = (selectedModules) => {
    let totalCost = 0;
    let totalSavings = 0;
    let breakdown = [];

    Object.entries(selectedModules).forEach(([serviceId, levelKey]) => {
        if (!levelKey) return;
        const details = calculateModuleCost(serviceId, levelKey);
        totalCost += details.cost;
        totalSavings += details.savings;
        breakdown.push({ serviceId, ...details });
    });

    return {
        totalCost,
        totalSavings,
        breakdown
    };
};

export const getEfficiencyLevel = (selectedModules) => {
    const count = Object.keys(selectedModules).length;
    if (count <= 1) return { level: 'low', label: 'Fragmented', score: 20 };
    if (count <= 3) return { level: 'medium', label: 'Aligned', score: 60 };
    return { level: 'high', label: 'Compounding', score: 95 };
};

// Define compatible connections
const CONNECTIONS = [
    {
        ids: ['content_strategy_blueprint', 'seo_audit'],
        name: 'Content + SEO',
        desc: 'Shared research and assets.'
    },
    {
        ids: ['seo_audit', 'llm_content_opt'],
        name: 'SEO + LLM',
        desc: 'Optimised for search and AI discovery.'
    },
    {
        ids: ['short_form_video_scripts', 'social_media_mgmt'],
        name: 'Video + Social',
        desc: 'Seamless production to distribution.'
    },
    {
        ids: ['brand_strategy_sprint', 'logo_system'],
        name: 'Strategy + Design',
        desc: 'Visuals rooted in core strategy.'
    }
];

export const getSystemConnections = (selectedModules) => {
    const activeIds = Object.keys(selectedModules);
    const activeConnections = [];

    CONNECTIONS.forEach(conn => {
        // Check if current connection's required IDs are all in the active sets
        // Actually, usually a connection is just a pair or group. 
        // We check if at least 2 items from a group are present? 
        // Or strictly all? Let's say all defined IDs must be present.
        const isConnected = conn.ids.every(id => activeIds.includes(id));
        if (isConnected) {
            activeConnections.push(conn);
        }
    });

    return activeConnections;
};
