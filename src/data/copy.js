// src/data/copy.js

export const COPY = {
    LANDING: {
        headline: 'Every Brand Runs On Systems.',
        subtext: 'Some systems compound over time. Some quietly create friction and waste. This tool helps you understand (what you need), (what it costs), and (why).',
        cta: 'Build Your Growth System',
        secondary: 'Takes about 3 minutes. No email required.'
    },
    PRIMING: {
        title: 'Before we begin',
        body: "There’s no single “right” setup. A good system depends on where you are and how you prefer to grow. Answering a few questions helps us guide you better."
    },
    WORLD_MAP: {
        title: 'Your Growth System',
        body: 'Think of your brand as an ecosystem. Each part affects the others. You can build this step by step.',
        note: 'You don’t need everything. You need what works together.'
    }
};

export const PRIMING_QUESTIONS = [
    {
        id: 'growth_stage',
        stepTitle: 'Growth Stage',
        prompt: 'Where is your business right now?',
        helper: 'There’s no right answer. This only helps us guide you better.',
        options: [
            { label: 'Early stage — finding direction', value: 'early' },
            { label: 'Growing — building consistency', value: 'growing' },
            { label: 'Scaling — optimising and expanding', value: 'scaling' }
        ]
    },
    {
        id: 'focus',
        stepTitle: 'Current Focus',
        prompt: 'What matters most right now?',
        helper: 'There’s no right answer. This only helps us guide you better.',
        options: [
            { label: 'Clarity and positioning', value: 'clarity' },
            { label: 'Visibility and discovery', value: 'visibility' },
            { label: 'Growth and acquisition', value: 'growth' },
            { label: 'Consistency and systems', value: 'consistency' }
        ]
    },
    {
        id: 'work_style',
        stepTitle: 'Working Style',
        prompt: 'How do you prefer to work?',
        helper: 'There’s no right answer. This only helps us guide you better.',
        options: [
            { label: 'Short experiments', value: 'experiments' },
            { label: 'Structured systems', value: 'systems' },
            { label: 'Long-term partnerships', value: 'partnerships' }
        ]
    }
];
