'use client';

import React from 'react';
import { Resume as ResumeType } from '@/types/resume';
import { EditableText } from './EditableText';
import { EditableBullet } from './EditableBullet';
import { Section } from './Section';
import { Plus, Trash2 } from 'lucide-react';

interface ResumeProps {
    data: ResumeType;
    onChange: (data: ResumeType) => void;
    settings: {
        font: 'sans' | 'serif' | 'mono' | 'montserrat';
        visibleSections: {
            summary: boolean;
            experience: boolean;
            education: boolean;
            projects: boolean;
            skills: boolean;
        };
        viewMode: 'edit' | 'preview';
        margins: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
    };
}

export function Resume({ data, onChange, settings }: ResumeProps) {
    const isPreview = settings.viewMode === 'preview';

    const updateHeader = (field: keyof ResumeType['header'], value: string) => {
        onChange({
            ...data,
            header: { ...data.header, [field]: value },
        });
    };

    const updateSummary = (value: string) => {
        onChange({ ...data, summary: value });
    };

    const updateSkills = (category: keyof ResumeType['skills'], val: string) => {
        onChange({
            ...data,
            skills: { ...data.skills, [category]: val.split(',').map(s => s.trim()) }
        })
    };

    const updateItemField = (section: 'education' | 'experience' | 'projects', index: number, field: string, value: any) => {
        const list = [...data[section]] as any[];
        list[index] = { ...list[index], [field]: value };
        onChange({ ...data, [section]: list });
    };

    const updateBullet = (section: 'education' | 'experience' | 'projects', itemIndex: number, bulletIndex: number, value: string) => {
        const list = [...data[section]] as any[];
        const bullets = [...list[itemIndex].bullets];
        bullets[bulletIndex] = value;
        list[itemIndex] = { ...list[itemIndex], bullets };
        onChange({ ...data, [section]: list });
    };

    const addBullet = (section: 'education' | 'experience' | 'projects', itemIndex: number) => {
        const list = [...data[section]] as any[];
        const bullets = [...list[itemIndex].bullets, 'New bullet'];
        list[itemIndex] = { ...list[itemIndex], bullets };
        onChange({ ...data, [section]: list });
    }

    const deleteBullet = (section: 'education' | 'experience' | 'projects', itemIndex: number, bulletIndex: number) => {
        const list = [...data[section]] as any[];
        const bullets = [...list[itemIndex].bullets];
        bullets.splice(bulletIndex, 1);
        list[itemIndex] = { ...list[itemIndex], bullets };
        onChange({ ...data, [section]: list });
    }

    const addArrayItem = (section: 'education' | 'experience' | 'projects') => {
        const emptyItem: any = section === 'experience' ? { role: 'Role', company: 'Company', location: 'Location', dates: 'Dates', bullets: ['New bullet'] } :
            section === 'education' ? { institution: 'Institution', degree: 'Degree', location: 'Location', dates: 'Dates', bullets: [] } :
                { title: 'Project Title', tech: 'Technologies', dates: 'Dates', bullets: ['Feature 1'] };

        onChange({ ...data, [section]: [...data[section], emptyItem] });
    }

    const removeArrayItem = (section: 'education' | 'experience' | 'projects', index: number) => {
        const list = [...data[section]];
        list.splice(index, 1);
        onChange({ ...data, [section]: list });
    }

    const getFontClass = () => {
        switch (settings.font) {
            case 'montserrat': return 'font-[family-name:var(--font-montserrat)]';
            case 'sans': return 'font-sans';
            case 'serif': return 'font-serif';
            case 'mono': return 'font-mono';
            default: return 'font-sans';
        }
    };

    return (
        <div id="resume-preview" className={`resume-canvas ${getFontClass()}`}>
            <div
                className="resume-content text-gray-800 leading-relaxed selection:bg-indigo-100 selection:text-indigo-900"
                style={{
                    paddingTop: `${settings.margins.top}mm`,
                    paddingRight: `${settings.margins.right}mm`,
                    paddingBottom: `${settings.margins.bottom}mm`,
                    paddingLeft: `${settings.margins.left}mm`,
                }}
            >
                {/* Header */}
                <header className="text-center mb-6 border-b border-gray-300 pb-4">
                    <EditableText
                        tagName="h1"
                        initialValue={data.header.name}
                        onSave={(val) => updateHeader('name', val)}
                        className="text-3xl font-bold text-center mb-1 text-gray-900"
                        placeholder="Your Name"
                        readOnly={isPreview}
                    />
                    <div className="flex justify-center flex-wrap gap-2 text-gray-600 text-sm items-center">
                        <EditableText tagName="span" initialValue={data.header.email} onSave={(val) => updateHeader('email', val)} readOnly={isPreview} />
                        <span className="text-gray-400">•</span>
                        <EditableText tagName="span" initialValue={data.header.linkedin} onSave={(val) => updateHeader('linkedin', val)} readOnly={isPreview} />
                        <span className="text-gray-400">•</span>
                        <EditableText tagName="span" initialValue={data.header.location} onSave={(val) => updateHeader('location', val)} readOnly={isPreview} />
                        {data.header.portfolio && (
                            <>
                                <span className="text-gray-400">•</span>
                                <EditableText tagName="span" initialValue={data.header.portfolio} onSave={(val) => updateHeader('portfolio', val)} readOnly={isPreview} />
                            </>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {settings.visibleSections.summary && (
                    <Section title="Summary">
                        <EditableText
                            initialValue={data.summary}
                            onSave={updateSummary}
                            multiline
                            className="w-full text-justify"
                            readOnly={isPreview}
                        />
                    </Section>
                )}

                {/* Education */}
                {settings.visibleSections.education && (
                    <Section title="Education">
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className={`group relative transition-all ${!isPreview && 'hover:bg-gray-50 -ml-2 -mr-2 p-2 rounded'}`}>
                                    {!isPreview && (
                                        <div className="absolute -left-8 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => removeArrayItem('education', idx)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}

                                    <div className="flex justify-between font-bold text-gray-900">
                                        <EditableText initialValue={edu.institution} onSave={(val) => updateItemField('education', idx, 'institution', val)} readOnly={isPreview} />
                                        <EditableText initialValue={edu.dates} onSave={(val) => updateItemField('education', idx, 'dates', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />
                                    </div>
                                    <div className="flex justify-between italic text-gray-700 mb-1">
                                        <EditableText initialValue={edu.degree} onSave={(val) => updateItemField('education', idx, 'degree', val)} readOnly={isPreview} />
                                        <EditableText initialValue={edu.location} onSave={(val) => updateItemField('education', idx, 'location', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />
                                    </div>
                                    <ul className="list-none space-y-0.5 mt-1">
                                        {edu.bullets.map((bullet, bIdx) => (
                                            <EditableBullet
                                                key={bIdx}
                                                initialValue={bullet}
                                                onSave={(val) => updateBullet('education', idx, bIdx, val)}
                                                onDelete={() => deleteBullet('education', idx, bIdx)}
                                                onEnter={() => addBullet('education', idx)}
                                                readOnly={isPreview}
                                            />
                                        ))}
                                        {edu.bullets.length === 0 && !isPreview && (
                                            <button onClick={() => addBullet('education', idx)} className="text-xs text-indigo-400 hover:text-indigo-600 mt-1 opacity-0 group-hover:opacity-100 flex items-center gap-1">+ Add Bullet</button>
                                        )}
                                    </ul>
                                </div>
                            ))}
                            {!isPreview && (
                                <button onClick={() => addArrayItem('education')} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-2 transition-colors mt-2 opacity-50 hover:opacity-100">
                                    <Plus className="w-4 h-4" /> Add Education
                                </button>
                            )}
                        </div>
                    </Section>
                )}

                {/* Experience */}
                {settings.visibleSections.experience && (
                    <Section title="Experience">
                        <div className="space-y-4">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className={`group relative transition-all ${!isPreview && 'hover:bg-gray-50 -ml-2 -mr-2 p-2 rounded'}`}>
                                    {!isPreview && (
                                        <div className="absolute -left-8 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => removeArrayItem('experience', idx)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}

                                    <div className="flex justify-between font-bold text-gray-900">
                                        <EditableText initialValue={exp.company} onSave={(val) => updateItemField('experience', idx, 'company', val)} readOnly={isPreview} />
                                        <EditableText initialValue={exp.dates} onSave={(val) => updateItemField('experience', idx, 'dates', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />
                                    </div>
                                    <div className="flex justify-between italic text-gray-700 mb-1">
                                        <EditableText initialValue={exp.role} onSave={(val) => updateItemField('experience', idx, 'role', val)} readOnly={isPreview} />
                                        <EditableText initialValue={exp.location} onSave={(val) => updateItemField('experience', idx, 'location', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />
                                    </div>
                                    <ul className="list-none space-y-0.5 mt-1">
                                        {exp.bullets.map((bullet, bIdx) => (
                                            <EditableBullet
                                                key={bIdx}
                                                initialValue={bullet}
                                                onSave={(val) => updateBullet('experience', idx, bIdx, val)}
                                                onDelete={() => deleteBullet('experience', idx, bIdx)}
                                                onEnter={() => addBullet('experience', idx)}
                                                readOnly={isPreview}
                                            />
                                        ))}
                                        {exp.bullets.length === 0 && !isPreview && (
                                            <button onClick={() => addBullet('experience', idx)} className="text-xs text-indigo-400 hover:text-indigo-600 mt-1 opacity-0 group-hover:opacity-100 flex items-center gap-1">+ Add Bullet</button>
                                        )}
                                    </ul>
                                </div>
                            ))}
                            {!isPreview && (
                                <button onClick={() => addArrayItem('experience')} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-2 transition-colors mt-2 opacity-50 hover:opacity-100">
                                    <Plus className="w-4 h-4" /> Add Experience
                                </button>
                            )}
                        </div>
                    </Section>
                )}

                {/* Projects */}
                {settings.visibleSections.projects && (
                    <Section title="Projects">
                        <div className="space-y-4">
                            {data.projects.map((proj, idx) => (
                                <div key={idx} className={`group relative transition-all ${!isPreview && 'hover:bg-gray-50 -ml-2 -mr-2 p-2 rounded'}`}>
                                    {!isPreview && (
                                        <div className="absolute -left-8 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => removeArrayItem('projects', idx)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-gray-900">
                                        <EditableText initialValue={proj.title} onSave={(val) => updateItemField('projects', idx, 'title', val)} readOnly={isPreview} />
                                        <EditableText initialValue={proj.dates} onSave={(val) => updateItemField('projects', idx, 'dates', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />
                                    </div>
                                    <div className="mb-1 text-sm">
                                        <span className="font-semibold text-gray-700 mr-2">Tech:</span>
                                        <EditableText initialValue={proj.tech} onSave={(val) => updateItemField('projects', idx, 'tech', val)} className="inline font-mono text-xs text-gray-600" readOnly={isPreview} />
                                    </div>
                                    <ul className="list-none space-y-0.5 mt-1">
                                        {proj.bullets.map((bullet, bIdx) => (
                                            <EditableBullet
                                                key={bIdx}
                                                initialValue={bullet}
                                                onSave={(val) => updateBullet('projects', idx, bIdx, val)}
                                                onDelete={() => deleteBullet('projects', idx, bIdx)}
                                                onEnter={() => addBullet('projects', idx)}
                                                readOnly={isPreview}
                                            />
                                        ))}
                                        {proj.bullets.length === 0 && !isPreview && (
                                            <button onClick={() => addBullet('projects', idx)} className="text-xs text-indigo-400 hover:text-indigo-600 mt-1 opacity-0 group-hover:opacity-100 flex items-center gap-1">+ Add Bullet</button>
                                        )}
                                    </ul>
                                </div>
                            ))}
                            {!isPreview && (
                                <button onClick={() => addArrayItem('projects')} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-2 transition-colors mt-2 opacity-50 hover:opacity-100">
                                    <Plus className="w-4 h-4" /> Add Project
                                </button>
                            )}
                        </div>
                    </Section>
                )}

                {/* Skills */}
                {settings.visibleSections.skills && (
                    <Section title="Skills">
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <span className="font-semibold text-gray-700 w-32 shrink-0">Programming:</span>
                                <EditableText initialValue={data.skills.programming.join(', ')} onSave={(val) => updateSkills('programming', val)} className="grow" readOnly={isPreview} />
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold text-gray-700 w-32 shrink-0">Design:</span>
                                <EditableText initialValue={data.skills.design.join(', ')} onSave={(val) => updateSkills('design', val)} className="grow" readOnly={isPreview} />
                            </div>
                            <div className="flex gap-2">
                                <span className="font-semibold text-gray-700 w-32 shrink-0">Tools:</span>
                                <EditableText initialValue={data.skills.tools.join(', ')} onSave={(val) => updateSkills('tools', val)} className="grow" readOnly={isPreview} />
                            </div>
                        </div>
                    </Section>
                )}
            </div>
        </div>
    );
}
