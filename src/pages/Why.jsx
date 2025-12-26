import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const Why = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <section className="py-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        Tired of Your Brand Just Existing?
                    </h1>
                    <p className="text-2xl text-white font-light">It's Time to Thrive.</p>
                </motion.div>
            </section>

            {/* The Problem */}
            <section className="py-16 bg-white/5 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">The Cycle of Frustration</h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            You've invested time, money, and energy into marketing. But are you seeing a clear return? Many businesses get stuck in a loop of fragmented campaigns, inconsistent messaging, and missed opportunities.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Your SEO, social media, and ad efforts often operate in silos. This isn't just inefficient; it's a roadblock to the growth you deserve.
                        </p>
                    </div>
                    <div className="bg-red-500/10 p-8 rounded-xl border border-red-500/20">
                        <h3 className="text-xl font-bold text-red-400 mb-4">Signs You're Stuck:</h3>
                        <ul className="space-y-3">
                            {["Fragmented strategies", "Generic content", "Wasted ad spend", "No clear ROI"].map((item, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* The Solution */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Break the Cycle with Social Samsara</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                            We're your all-in-one growth engine. Inspired by the concept of Saṃsāra, we guide your brand through its own cycles of evolution: <span className="text-purple-400 font-bold">Analyse → Adapt → Transform → Thrive</span>.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "AI-Powered Content", desc: "Say goodbye to generic content. We craft engaging, high-performing content that resonates." },
                            { title: "SEO & Social Domination", desc: "Get found, get seen, and own your online space." },
                            { title: "LLM Optimization", desc: "Leverage the latest language models to connect with your audience on a deeper level." },
                            { title: "Privacy-Compliant Ads", desc: "Reach the right people, ethically and effectively." },
                            { title: "Influencer Matchmaking", desc: "Connect with powerful voices to amplify your brand's message." },
                            { title: "Predictive Analytics", desc: "Identify and nurture your most valuable customers for lasting growth." }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors"
                            >
                                <CheckCircle2 className="text-purple-500 mb-4 w-8 h-8" />
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-t from-purple-900/20 to-transparent text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">Discover Your Growth Path</h2>
                    <p className="text-gray-300 mb-10 text-lg">
                        Curious how a dedicated, AI-powered partnership can redefine your brand's growth? It's time to break free from the old cycles.
                    </p>
                    <motion.button
                        onClick={() => navigate('/calculator')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(255, 255, 255, 0)",
                                "0 0 0 10px rgba(255, 255, 255, 0.1)",
                                "0 0 0 20px rgba(255, 255, 255, 0)"
                            ]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all"
                    >
                        Cost Calculator
                        {/* Ripple Effect Ring */}
                        <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping pointer-events-none" />
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default Why;
