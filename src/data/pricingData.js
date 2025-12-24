// src/data/pricingData.js

export const WORLDS = {
  FOUNDATION: {
    id: 'foundation',
    name: 'Foundation',
    description: 'Strategy, brand, and direction. Everything else depends on this.',
    color: '#E0E0E0', 
    services: [
      {
        id: 'brand_strategy_sprint',
        name: 'Brand Strategy Sprint',
        category: 'Strategy & Brand Foundations',
        description: 'Positioning, narrative, GTM clarity',
        basePrice: 75000,
        unit: 'Sprint',
        tiers: [
          { min: 1, price: 75000 },
          { min: 5, price: 65000 },
          { min: 10, price: 55000 }
        ],
        reason: 'Reuse of research & frameworks across sessions'
      },
      {
        id: 'brand_naming',
        name: 'Brand Naming',
        category: 'Strategy & Brand Foundations',
        description: 'Brand or product naming',
        basePrice: 45000,
        unit: 'Name', // Assumption
        tiers: [
          { min: 1, price: 45000 },
          { min: 5, price: 38000 },
          { min: 10, price: 30000 }
        ],
        reason: 'Shared linguistic & market analysis'
      },
      {
        id: 'brand_architecture',
        name: 'Brand Architecture',
        category: 'Strategy & Brand Foundations',
        description: 'Multi-brand / product structuring',
        basePrice: 60000,
        unit: 'Architecture',
        tiers: [
            { min: 1, price: 60000 },
            { min: 5, price: 52000 },
            { min: 10, price: 45000 }
        ],
        reason: 'Modular architecture reduces effort per unit'
      },
      {
        id: 'purpose_story_workshop',
        name: 'Purpose & Story Workshop',
        category: 'Strategy & Brand Foundations',
        description: 'Founder / mission storytelling',
        basePrice: 40000,
        unit: 'Workshop',
        tiers: [
            { min: 1, price: 40000 },
            { min: 5, price: 35000 },
            { min: 10, price: 28000 }
        ],
        reason: 'Workshop templates scale efficiently'
      }
    ]
  },
  VISIBILITY: {
    id: 'visibility',
    name: 'Visibility',
    description: 'SEO, AI discovery, content, digital presence. How people find and understand you.',
    color: '#4CAF50', // Example Green
    services: [
      // SEO
       {
        id: 'seo_audit',
        name: 'SEO Audit & Roadmapper',
        category: 'SEO',
        description: 'Reusable audit frameworks',
        basePrice: 35000,
        unit: 'Website',
        tiers: [
            { min: 1, price: 35000 },
            { min: 3, price: 30000 },
            { min: 6, price: 25000 },
            { min: 12, price: 20000 }
        ],
        reason: 'Reusable audit frameworks'
      },
      {
        id: 'keyword_research',
        name: 'Keyword Research',
        category: 'SEO',
        description: 'Shared datasets',
        basePrice: 20000,
        unit: 'Market',
        tiers: [
            { min: 1, price: 20000 },
            { min: 3, price: 17000 },
            { min: 6, price: 14000 },
            { min: 12, price: 12000 }
        ],
        reason: 'Shared datasets'
      },
      {
        id: 'on_page_opt',
        name: 'On-page Optimisation',
        category: 'SEO',
        description: 'Pattern-based execution',
        basePrice: 4000,
        unit: 'Page',
        tiers: [
             { min: 1, price: 4000 },
             { min: 3, price: 3200 },
             { min: 6, price: 2500 },
             { min: 12, price: 2000 }
        ],
        reason: 'Pattern-based execution'
      },
      {
        id: 'tech_seo',
        name: 'Technical SEO',
        category: 'SEO',
        description: 'Reduced setup overhead',
        basePrice: 40000,
        unit: 'Sprint',
        tiers: [
             { min: 1, price: 40000 },
             { min: 3, price: 35000 },
             { min: 6, price: 30000 },
             { min: 12, price: 25000 }
        ],
        reason: 'Reduced setup overhead'
      },
       // AI / LLM
      {
        id: 'ai_brand_audit',
        name: 'AI Brand Audit',
        category: 'LLM / AI Visibility',
        description: 'Reusable prompts & tests',
        basePrice: 30000,
        unit: 'Brand',
        tiers: [
            { min: 1, price: 30000 },
            { min: 3, price: 26000 },
            { min: 6, price: 22000 },
            { min: 12, price: 18000 }
        ],
        reason: 'Reusable prompts & tests'
      },
      {
        id: 'llm_content_opt',
        name: 'LLM Content Optimisation',
        category: 'LLM / AI Visibility',
        description: 'Prompt batching',
        basePrice: 6000,
        unit: 'Page',
        tiers: [
             { min: 1, price: 6000 },
             { min: 3, price: 5000 },
             { min: 6, price: 4000 },
             { min: 12, price: 3200 }
        ],
        reason: 'Prompt batching'
      },
      {
        id: 'ai_knowledge_seeding',
        name: 'AI Knowledge Seeding',
        category: 'LLM / AI Visibility',
        description: 'Platform familiarity',
        basePrice: 20000,
        unit: 'Platform',
        tiers: [
            { min: 1, price: 20000 },
             { min: 3, price: 17000 },
             { min: 6, price: 14000 },
             { min: 12, price: 12000 }
        ],
        reason: 'Platform familiarity'
      },
      // Content & Systems
      {
        id: 'content_strategy_blueprint',
        name: 'Content Strategy Blueprint',
        category: 'Content, Media & Social Systems',
        description: 'Platforms, formats, cadence',
        basePrice: 35000,
        unit: 'Blueprint',
        tiers: [
            { min: 1, price: 35000 },
            { min: 5, price: 30000 },
            { min: 10, price: 25000 }
        ],
        reason: 'Strategy reused across content batches'
      },
       {
        id: 'short_form_video_scripts',
        name: 'Short-form Video Scripts',
        category: 'Content, Media & Social Systems',
        description: 'Reels / Shorts / TikTok',
        basePrice: 4000,
        unit: 'Script',
        tiers: [
             { min: 1, price: 4000 },
             { min: 5, price: 3200 },
             { min: 10, price: 2500 }
        ],
        reason: 'Ideation velocity increases with context'
      },
       {
        id: 'long_form_video_script',
        name: 'Long-form Video Script',
        category: 'Content, Media & Social Systems',
        description: 'YouTube / Documentary',
        basePrice: 12000,
        unit: 'Script',
        tiers: [
             { min: 1, price: 12000 },
             { min: 5, price: 10000 },
             { min: 10, price: 8000 }
        ],
        reason: 'Research amortised across scripts'
      },
      // Digital Marketing
      {
        id: 'digital_marketing_strategy',
        name: 'Digital Marketing Strategy',
        category: 'Digital Marketing',
        description: 'Strategy templates',
        basePrice: 40000,
        unit: 'Brand',
        tiers: [
            { min: 1, price: 40000 },
            { min: 3, price: 35000 },
            { min: 6, price: 30000 },
            { min: 12, price: 25000 }
        ],
        reason: 'Strategy templates'
      },
       {
        id: 'monthly_content_planning',
        name: 'Monthly Content Planning',
        category: 'Digital Marketing',
        description: 'Systemised planning',
        basePrice: 30000,
        unit: 'Month',
        tiers: [
             { min: 1, price: 30000 },
            { min: 3, price: 26000 },
            { min: 6, price: 22000 },
            { min: 12, price: 18000 }
        ],
        reason: 'Systemised planning'
      },
      {
        id: 'social_media_mgmt',
        name: 'Social Media Management',
        category: 'Digital Marketing',
        description: 'Cross-platform reuse',
        basePrice: 25000,
        unit: 'Platform',
        tiers: [
             { min: 1, price: 25000 },
            { min: 3, price: 22000 },
            { min: 6, price: 19000 },
            { min: 12, price: 16000 }
        ],
        reason: 'Cross-platform reuse'
      },
       {
        id: 'community_mgmt',
        name: 'Community Management',
        category: 'Digital Marketing',
         description: 'Playbook driven',
        basePrice: 20000,
        unit: 'Community',
        tiers: [
             { min: 1, price: 20000 },
            { min: 3, price: 18000 },
            { min: 6, price: 15000 },
            { min: 12, price: 12000 }
        ],
        reason: 'Playbook driven'
      }
    ]
  },
  ACCELERATION: {
    id: 'acceleration',
    name: 'Acceleration',
    description: 'Paid growth, campaigns, and performance. When you want to move faster.',
    color: '#FF5722', // Example Orange
    services: [
        // Growth & Campaigns
      {
        id: 'campaign_concept',
        name: 'Campaign Concept',
        category: 'Growth, Campaigns & Distribution',
        description: 'Campaign narrative & hooks',
        basePrice: 35000,
        unit: 'Campaign',
        tiers: [
             { min: 1, price: 35000 },
             { min: 3, price: 30000 },
             { min: 6, price: 25000 }
        ],
        reason: 'Idea ecosystem compounds'
      },
       {
        id: 'influencer_strategy',
        name: 'Influencer Strategy',
        category: 'Growth, Campaigns & Distribution',
        description: 'Creator mapping & outreach',
        basePrice: 25000,
        unit: 'Strategy',
        tiers: [
             { min: 1, price: 25000 },
             { min: 3, price: 22000 },
             { min: 6, price: 18000 }
        ],
        reason: 'Relationship reuse across campaigns'
      },
      {
        id: 'launch_playbook',
        name: 'Launch Playbook',
        category: 'Growth, Campaigns & Distribution',
        description: 'Product / brand launch',
        basePrice: 60000,
        unit: 'Playbook',
        tiers: [
             { min: 1, price: 60000 },
             { min: 3, price: 52000 },
             { min: 6, price: 45000 }
        ],
        reason: 'Playbooks adapt faster after first launch'
      },
      {
        id: 'community_growth_plan',
        name: 'Community Growth Plan',
        category: 'Growth, Campaigns & Distribution',
        description: 'Discord / WhatsApp / Circle',
        basePrice: 30000,
        unit: 'Plan',
        tiers: [
             { min: 1, price: 30000 },
             { min: 3, price: 25000 },
             { min: 6, price: 20000 }
        ],
        reason: 'Systems scale better than one-offs'
      },
       // PPC
       {
        id: 'ppc_strategy',
        name: 'PPC Strategy & Setup',
        category: 'PPC & Paid Advertising',
        description: 'Setup reuse',
        basePrice: 35000,
        unit: 'Account',
        tiers: [
             { min: 1, price: 35000 },
             { min: 3, price: 30000 },
             { min: 6, price: 25000 },
             { min: 12, price: 20000 }
        ],
        reason: 'Setup reuse'
      },
      {
        id: 'ad_creative_strategy',
        name: 'Ad Creative Strategy',
        category: 'PPC & Paid Advertising',
        description: 'Creative frameworks',
        basePrice: 25000,
        unit: 'Campaign',
        tiers: [
             { min: 1, price: 25000 },
             { min: 3, price: 22000 },
             { min: 6, price: 18000 },
             { min: 12, price: 15000 }
        ],
        reason: 'Creative frameworks'
      },
      {
        id: 'campaign_management',
        name: 'Campaign Management',
        category: 'PPC & Paid Advertising',
        description: 'Optimisation learning',
        basePrice: 30000,
        unit: 'Month',
        tiers: [
             { min: 1, price: 30000 },
             { min: 3, price: 26000 },
             { min: 6, price: 22000 },
             { min: 12, price: 18000 }
        ],
        reason: 'Optimisation learning'
      },
      {
        id: 'performance_reporting',
        name: 'Performance Reporting',
        category: 'PPC & Paid Advertising',
        description: 'Automated dashboards',
        basePrice: 10000,
        unit: 'Report',
        tiers: [
             { min: 1, price: 10000 },
             { min: 3, price: 8000 },
             { min: 6, price: 6500 },
             { min: 12, price: 5000 }
        ],
        reason: 'Automated dashboards'
      }
    ]
  },
  EXPRESSION: {
    id: 'expression',
    name: 'Expression',
    description: 'Design, shoots, video, storytelling. How your brand feels and looks.',
    color: '#9C27B0', // Example Purple
    services: [
        // Design
      {
        id: 'logo_system',
        name: 'Logo System',
        category: 'Design & Visual Identity',
        description: 'Logo + usage rules',
        basePrice: 50000,
        unit: 'System',
        tiers: [
             { min: 1, price: 50000 },
             { min: 5, price: 42000 },
             { min: 10, price: 35000 }
        ],
        reason: 'Brand familiarity speeds iterations'
      },
      {
        id: 'brand_identity_kit',
        name: 'Brand Identity Kit',
        category: 'Design & Visual Identity',
        description: 'Colors, typography, layouts',
        basePrice: 75000,
        unit: 'Kit',
        tiers: [
             { min: 1, price: 75000 },
             { min: 5, price: 65000 },
             { min: 10, price: 55000 }
        ],
        reason: 'Shared visual language across brands'
      },
      {
        id: 'social_media_post_design',
        name: 'Social Media Post Design',
        category: 'Design & Visual Identity',
        description: 'Static / carousel',
        basePrice: 3000,
        unit: 'Post',
        tiers: [
             { min: 1, price: 3000 },
             { min: 5, price: 2400 },
             { min: 10, price: 1800 }
        ],
        reason: 'Design systems reduce creation time'
      },
      {
        id: 'presentation_design',
        name: 'Presentation Design',
        category: 'Design & Visual Identity',
        description: 'Pitch / decks',
        basePrice: 4500,
        unit: 'Deck',
        tiers: [
             { min: 1, price: 4500 },
             { min: 5, price: 3800 },
             { min: 10, price: 3000 }
        ],
        reason: 'Template-driven efficiency'
      },
      // Product Shoots
      {
        id: 'product_shoot_basic',
        name: 'Product Shoot (Basic)',
        category: 'Product Photography Shoots',
        description: 'Setup amortisation',
        basePrice: 6000,
        unit: 'Product',
        tiers: [
             { min: 1, price: 6000 },
             { min: 5, price: 5000 },
             { min: 10, price: 4000 },
             { min: 20, price: 3200 }
        ],
        reason: 'Setup amortisation'
      },
      {
        id: 'product_shoot_premium',
        name: 'Product Shoot (Premium)',
        category: 'Product Photography Shoots',
        description: 'Lighting reuse',
        basePrice: 12000,
        unit: 'Product',
        tiers: [
             { min: 1, price: 12000 },
             { min: 5, price: 10000 },
             { min: 10, price: 8500 },
             { min: 20, price: 7000 }
        ],
        reason: 'Lighting reuse'
      },
       // Video Shoots
       {
        id: 'short_form_video_shoot',
        name: 'Short-form Video Shoot',
        category: 'Video Shoots',
        description: 'Same setup',
        basePrice: 15000,
        unit: 'Video',
        tiers: [
             { min: 1, price: 15000 },
             { min: 3, price: 13000 },
             { min: 6, price: 11000 },
             { min: 10, price: 9000 }
        ],
        reason: 'Same setup'
      },
       {
        id: 'brand_film_shoot',
        name: 'Brand Film Shoot',
        category: 'Video Shoots',
        description: 'Crew continuity',
        basePrice: 60000,
        unit: 'Day',
        tiers: [
             { min: 1, price: 60000 },
             { min: 3, price: 55000 },
             { min: 6, price: 48000 },
             { min: 10, price: 40000 }
        ],
        reason: 'Crew continuity'
      },
       // TVC
       {
        id: 'tvc_concept',
        name: 'TVC Concept & Script',
        category: 'TVC',
        description: 'Creative universe reuse',
        basePrice: 75000,
        unit: 'Concept',
        tiers: [
             { min: 1, price: 75000 },
             { min: 2, price: 65000 },
             { min: 4, price: 55000 },
             { min: 6, price: 45000 }
        ],
        reason: 'Creative universe reuse'
      }
    ]
  }
};

export const LEVELS = {
  EXPERIMENT: { name: 'Experiment', label: '🌱 Experiment', multiplier: 1, description: 'For testing fundamentals' },
  CONSISTENCY: { name: 'Consistency', label: '🌿 Consistency', multiplier: 3, description: 'For steady improvement' },
  MOMENTUM: { name: 'Momentum', label: '🌳 Momentum', multiplier: 6, description: 'For multi-page optimisation' },
  SCALE: { name: 'Scale', label: '🌲 Scale', multiplier: 12, description: 'For long-term dominance' }
};
