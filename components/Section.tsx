import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ title, children, className = '' }: SectionProps) {
    return (
        <section className={` ${className}`} style={{ marginBottom: 'var(--resume-section-gap, 1.5rem)' }}>
            <h2 className="text-lg font-bold border-b border-gray-300 mb-2 text-gray-900 uppercase tracking-wider">
                {title}
            </h2>
            <div className="text-sm text-gray-800 leading-relaxed">
                {children}
            </div>
        </section>
    );
}
