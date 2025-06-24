'use client'
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import { Code, Zap, Smartphone, Package, Rocket, List } from 'lucide-react';

const features = [
    {
        title: 'Declarative Syntax',
        description: 'Write UI using XML-like tags, reducing boilerplate and improving readability.',
        icon: Code,
    },
    {
        title: 'Automatic State Management',
        description: 'Smart state inference and generation with TypeScript types and setters.',
        icon: Zap,
    },
    {
        title: 'Flexible Imports',
        description: 'Support for any npm package with default, named, and namespace imports.',
        icon: Package,
    },
    {
        title: 'Built-in Navigation',
        description: 'Simple navigation declarations that generate React Navigation code.',
        icon: Smartphone,
    },
    {
        title: 'Hot Reloading',
        description: 'Real-time compilation during development with instant feedback.',
        icon: Rocket,
    },
    {
        title: 'Type Safety',
        description: 'Generated code with TypeScript support and comprehensive error handling.',
        icon: Code,
    },
    {
        title: 'Tab Navigation',
        description: 'Easy tab-based navigation setup with custom icons and ordering.',
        icon: List,
    },
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-ignite-charcoal">
            <NavBar />
            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-10 text-center gradient-text">Features</h1>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <FeatureCard
                                key={feature.title}
                                title={feature.title}
                                description={feature.description}
                                Icon={feature.icon}
                            />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
} 