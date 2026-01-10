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
        font: 'inter' | 'merriweather' | 'lora' | 'montserrat' | 'open-sans' | 'roboto' | 'roboto-condensed';
        density: 'comfortable' | 'compact' | 'dense';
        lineHeight: number;
        letterSpacing: number;
        sectionSpacing: number;
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

    // ... handlers ...

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

    // Custom Section Handlers
    const addCustomSection = () => {
        const newSection = {
            id: crypto.randomUUID(),
            title: 'New Section',
            items: [],
            visible: true
        };
        // @ts-ignore
        onChange({ ...data, customSections: [...(data.customSections || []), newSection] });
    };

    const updateCustomSectionTitle = (index: number, title: string) => {
        // @ts-ignore
        const sections = [...(data.customSections || [])];
        sections[index] = { ...sections[index], title };
        // @ts-ignore
        onChange({ ...data, customSections: sections });
    };

    const addCustomItem = (sectionIndex: number) => {
        // @ts-ignore
        const sections = [...(data.customSections || [])];
        sections[sectionIndex].items.push({
            title: 'Title',
            subtitle: 'Subtitle',
            date: 'Dates',
            bullets: ['Detail']
        });
        // @ts-ignore
        onChange({ ...data, customSections: sections });
    };

    const updateCustomItem = (sectionIndex: number, itemIndex: number, field: string, value: any) => {
        // @ts-ignore
        const sections = [...(data.customSections || [])];
        sections[sectionIndex].items[itemIndex] = {
            ...sections[sectionIndex].items[itemIndex],
            [field]: value
        };
        // @ts-ignore
        onChange({ ...data, customSections: sections });
    };

    const removeCustomSection = (index: number) => {
        // @ts-ignore
        const sections = [...(data.customSections || [])];
        sections.splice(index, 1);
        // @ts-ignore
        onChange({ ...data, customSections: sections });
    }



    const getFontClass = () => {
        switch (settings.font) {
            case 'montserrat': return 'font-[family-name:var(--font-montserrat)]';
            case 'inter': return 'font-[family-name:var(--font-inter)]';
            case 'merriweather': return 'font-[family-name:var(--font-merriweather)]';
            case 'lora': return 'font-[family-name:var(--font-lora)]';
            case 'open-sans': return 'font-[family-name:var(--font-open-sans)]';
            case 'roboto': return 'font-[family-name:var(--font-roboto)]';
            case 'roboto-condensed': return 'font-[family-name:var(--font-roboto-condensed)]';
            default: return 'font-[family-name:var(--font-inter)]';
        }
    };

    return (
        <div id="resume-preview" className={`resume-canvas ${getFontClass()} density-${settings.density}`}>
            <div
                className="resume-content text-gray-800 selection:bg-indigo-100 selection:text-indigo-900"
                style={{
                    paddingTop: `${settings.margins.top}mm`,
                    paddingRight: `${settings.margins.right}mm`,
                    paddingBottom: `${settings.margins.bottom}mm`,
                    paddingLeft: `${settings.margins.left}mm`,
                    fontSize: 'var(--resume-font-size)',
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}em`,
                    // @ts-ignore
                    '--resume-section-gap': `${settings.sectionSpacing}rem`,
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
                        {isPreview ? (
                            <a href={`mailto:${data.header.email}`} className="hover:text-indigo-600 hover:underline transition-colors">{data.header.email}</a>
                        ) : (
                            <EditableText tagName="span" initialValue={data.header.email} onSave={(val) => updateHeader('email', val)} placeholder="Email" />
                        )}

                        <span className="text-gray-400">•</span>

                        {isPreview ? (
                            <a href={data.header.linkedin.startsWith('http') ? data.header.linkedin : `https://${data.header.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline transition-colors">{data.header.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</a>
                        ) : (
                            <EditableText tagName="span" initialValue={data.header.linkedin} onSave={(val) => updateHeader('linkedin', val)} placeholder="LinkedIn URL" />
                        )}

                        <span className="text-gray-400">•</span>
                        <EditableText tagName="span" initialValue={data.header.location} onSave={(val) => updateHeader('location', val)} readOnly={isPreview} placeholder="Location" />

                        {data.header.portfolio && (
                            <>
                                <span className="text-gray-400">•</span>
                                {isPreview ? (
                                    <a href={data.header.portfolio.startsWith('http') ? data.header.portfolio : `https://${data.header.portfolio}`} target="_blank" rel="noreferrer" className="hover:text-indigo-600 hover:underline transition-colors">{data.header.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</a>
                                ) : (
                                    <EditableText tagName="span" initialValue={data.header.portfolio} onSave={(val) => updateHeader('portfolio', val)} placeholder="Portfolio URL" />
                                )}
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
                        <div className="flex flex-col gap-[var(--resume-item-gap)]">
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
                                    <ul className="list-none flex flex-col gap-[var(--resume-bullet-gap)] mt-1">
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
                        <div className="flex flex-col gap-[var(--resume-item-gap)]">
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
                                    <ul className="list-none flex flex-col gap-[var(--resume-bullet-gap)] mt-1">
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
                        <div className="flex flex-col gap-[var(--resume-item-gap)]">
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
                                        <EditableText
                                            tagName="span"
                                            initialValue="Tech: "
                                            // Make this editable if we add it to the data model. 
                                            // For now, simpler to just allow editing the content freely 
                                            // OR make the label itself editable but local? 
                                            // Let's assume the user wants to change "Tech:" to "Tools:" or "Skills:"
                                            // We need to store this or just let them edit the whole line?
                                            // Request: "the project section should not have the tech portion uneditable"
                                            // Better approach: Just make it an EditableText for the label too, but we need to store it?
                                            // Or better, just don't force "Tech:".
                                            onSave={() => { }}
                                            className="font-semibold text-gray-700 mr-2"
                                            readOnly={isPreview}
                                            placeholder="Label"
                                        />
                                        <EditableText initialValue={proj.tech} onSave={(val) => updateItemField('projects', idx, 'tech', val)} className="inline font-mono text-xs text-gray-600" readOnly={isPreview} />
                                    </div>
                                    <ul className="list-none flex flex-col gap-[var(--resume-bullet-gap)] mt-1">
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
                        <div className="flex flex-col gap-[var(--resume-bullet-gap)]">
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

                {/* Custom Sections */}
                {/* @ts-ignore */}
                {(data.customSections || []).filter(s => s.visible).map((section, sIdx) => (
                    <div key={section.id} className="relative group/section">
                        {!isPreview && (
                            <div className="absolute -left-6 top-1 opacity-0 group-hover/section:opacity-100 transition-opacity">
                                <button onClick={() => removeCustomSection(sIdx)} className="text-red-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <Section title={
                            <EditableText
                                initialValue={section.title}
                                onSave={(val) => updateCustomSectionTitle(sIdx, val)}
                                readOnly={isPreview}
                            />
                        }>
                            <div className="flex flex-col gap-[var(--resume-item-gap)]">
                                {section.items.map((item: any, iIdx: number) => (
                                    <div key={iIdx} className={`group relative transition-all ${!isPreview && 'hover:bg-gray-50 -ml-2 -mr-2 p-2 rounded'}`}>
                                        <div className="flex justify-between font-bold text-gray-900">
                                            <EditableText initialValue={item.title} onSave={(val) => updateCustomItem(sIdx, iIdx, 'title', val)} readOnly={isPreview} />
                                            {item.date && <EditableText initialValue={item.date} onSave={(val) => updateCustomItem(sIdx, iIdx, 'date', val)} className="text-right whitespace-nowrap" readOnly={isPreview} />}
                                        </div>
                                        <div className="flex justify-between italic text-gray-700 mb-1">
                                            {item.subtitle && <EditableText initialValue={item.subtitle} onSave={(val) => updateCustomItem(sIdx, iIdx, 'subtitle', val)} readOnly={isPreview} />}
                                        </div>
                                        <ul className="list-none flex flex-col gap-[var(--resume-bullet-gap)] mt-1">
                                            {item.bullets.map((bullet: string, bIdx: number) => (
                                                <EditableBullet
                                                    key={bIdx}
                                                    initialValue={bullet}
                                                    onSave={(val) => {
                                                        const newBullets = [...item.bullets];
                                                        newBullets[bIdx] = val;
                                                        updateCustomItem(sIdx, iIdx, 'bullets', newBullets);
                                                    }}
                                                    onDelete={() => {
                                                        const newBullets = [...item.bullets];
                                                        newBullets.splice(bIdx, 1);
                                                        updateCustomItem(sIdx, iIdx, 'bullets', newBullets);
                                                    }}
                                                    onEnter={() => {
                                                        const newBullets = [...item.bullets, 'New Detail'];
                                                        updateCustomItem(sIdx, iIdx, 'bullets', newBullets);
                                                    }}
                                                    readOnly={isPreview}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {!isPreview && (
                                    <button onClick={() => addCustomItem(sIdx)} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-indigo-300 hover:text-indigo-500 flex items-center justify-center gap-2 transition-colors mt-2 opacity-50 hover:opacity-100">
                                        <Plus className="w-4 h-4" /> Add Item
                                    </button>
                                )}
                            </div>
                        </Section>
                    </div>
                ))}

                {!isPreview && (
                    <button
                        onClick={addCustomSection}
                        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-500 hover:text-indigo-600 flex items-center justify-center gap-2 transition-all mt-8 font-medium hover:bg-gray-50"
                    >
                        <Plus className="w-5 h-5" /> Add Custom Section
                    </button>
                )}
            </div>
        </div>
    );
}
