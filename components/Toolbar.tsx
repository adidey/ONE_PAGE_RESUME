'use client';

import { Settings, Download, Eye, EyeOff, LayoutTemplate, Printer, Type, Monitor, Edit3 } from 'lucide-react';
import { Resume } from '@/types/resume';

interface SettingsToolbarProps {
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
    onUpdate: (newSettings: any) => void;
    onExport: () => void;
}

export function SettingsToolbar({ settings, onUpdate, onExport }: SettingsToolbarProps) {
    const toggleSection = (section: keyof typeof settings.visibleSections) => {
        onUpdate({
            ...settings,
            visibleSections: {
                ...settings.visibleSections,
                [section]: !settings.visibleSections[section]
            }
        });
    };

    const updateMargin = (side: keyof typeof settings.margins, value: number) => {
        onUpdate({
            ...settings,
            margins: {
                ...settings.margins,
                [side]: value
            }
        });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <aside id="toolbar" className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-0 p-6 flex flex-col gap-8 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50">
            <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                    <LayoutTemplate className="w-6 h-6 text-indigo-600" />
                    Resume Editor
                </h2>

                <div className="space-y-6">
                    {/* View Mode Toggle */}
                    <div className="bg-gray-100 p-1 rounded-lg flex relative">
                        <button
                            onClick={() => onUpdate({ ...settings, viewMode: 'edit' })}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${settings.viewMode === 'edit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button
                            onClick={() => onUpdate({ ...settings, viewMode: 'preview' })}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${settings.viewMode === 'preview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Monitor className="w-4 h-4" /> Preview
                        </button>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Fonts */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Type className="w-3 h-3" /> Typography
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {['montserrat', 'serif', 'sans', 'mono'].map((font) => (
                                <button
                                    key={font}
                                    onClick={() => onUpdate({ ...settings, font })}
                                    className={`px-3 py-2 text-sm border rounded-lg transition-all text-left capitalize ${settings.font === font
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                        }`}
                                >
                                    {font}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Sections */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Settings className="w-3 h-3" /> Sections
                        </h3>
                        <div className="space-y-2">
                            {Object.entries(settings.visibleSections).map(([key, isVisible]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleSection(key as any)}
                                    className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group transition-colors"
                                >
                                    <span className="text-sm text-gray-600 capitalize">{key}</span>
                                    {isVisible ? (
                                        <Eye className="w-4 h-4 text-indigo-600" />
                                    ) : (
                                        <EyeOff className="w-4 h-4 text-gray-300 group-hover:text-gray-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Margins */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <LayoutTemplate className="w-3 h-3" /> Margins (mm)
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {['top', 'right', 'bottom', 'left'].map((side) => (
                                <div key={side} className="flex flex-col gap-1">
                                    <label className="text-[10px] text-gray-500 uppercase">{side}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={settings.margins[side as keyof typeof settings.margins]}
                                        onChange={(e) => updateMargin(side as any, parseInt(e.target.value) || 0)}
                                        className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-100">
                <button
                    onClick={handlePrint}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                    <Printer className="w-4 h-4" />
                    Print / PDF
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                    Use &quot;Save as PDF&quot; in dialog
                </p>
            </div>
        </aside>
    );
}
