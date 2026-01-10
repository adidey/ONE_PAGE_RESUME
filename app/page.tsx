'use client';

import { useState, useRef, useEffect } from 'react';
import { SettingsToolbar } from '@/components/Toolbar';
import { Resume } from '@/components/Resume';
import { defaultResume } from '@/lib/defaultResume';
import { Resume as ResumeType } from '@/types/resume';
import { SkeletonResume } from '@/components/SkeletonResume';

export default function Home() {
  const [resume, setResume] = useState<ResumeType>(defaultResume);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<{
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
  }>({
    font: 'inter',
    density: 'comfortable',
    lineHeight: 1.5,
    letterSpacing: 0,
    sectionSpacing: 1.5,
    visibleSections: {
      summary: true,
      experience: true,
      education: true,
      projects: true,
      skills: true,
    },
    viewMode: 'edit',
    margins: {
      top: 16,
      right: 16,
      bottom: 16,
      left: 16,
    }
  });

  const resumeRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    // Simulate loading for better UX
    setTimeout(() => setLoading(false), 800);
  }, []);

  useEffect(() => {
    const checkOverflow = () => {
      if (!resumeRef.current) return;
      // A4 height in pixels at 96 DPI is approx 1123px (297mm).
      // Since we allow the canvas to grow now, we check if its height exceeds this threshold.
      // We add a small buffer (e.g., 5px) to avoid false positives from rounding.
      const A4_HEIGHT_PX = 1123;
      const isOver = resumeRef.current.scrollHeight > (A4_HEIGHT_PX + 5);
      setIsOverflowing(isOver);

      // Auto-density downscale logic (simplified/disabled for now if we allow multi-page, 
      // OR we keeping it to try to fit? Request says "user will be prompted... allowed to download two page".
      // So we keep the warning, but maybe less aggressive on auto-scaling?
      // Actually, let's keep the auto-scaling as a helper, but simply allow the overflow if it fails.
      // The original logic was: if overflow, try compact, then dense.
      // If the user explicity allows 2 pages, maybe we shouldn't force dense?
      // But "automatic density resolution" was a key feature. Let's keep it but ensure it doesn't block editing.

      if (isOver && settings.viewMode === 'edit') {
        if (settings.density === 'comfortable') {
          setSettings(s => ({ ...s, density: 'compact' }));
        } else if (settings.density === 'compact') {
          setSettings(s => ({ ...s, density: 'dense' }));
        }
      }
    };

    // Check initially and on updates
    const observer = new ResizeObserver(checkOverflow);
    if (resumeRef.current) {
      observer.observe(resumeRef.current);
    }

    // Also check on resume data changes implicitly via effect
    checkOverflow();

    return () => observer.disconnect();
  }, [resume, settings.density, settings.lineHeight, settings.letterSpacing, settings.margins, settings.font, settings.viewMode]);


  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex justify-center py-8">
        <SkeletonResume />
      </main>
    );
  }

  return (
    <main className={`min-h-screen flex flex-col items-center py-8 print:py-0 print:bg-white view-mode-${settings.viewMode} pl-80`}>
      {!settings.viewMode.includes('preview') && (
        <div className="fixed top-0 left-0 right-0 p-4 z-40 flex justify-between items-center pointer-events-none">
          <div className="text-xs font-bold tracking-widest text-gray-400 uppercase ml-20">
            Resume Editor
          </div>
          {isOverflowing && (
            <div className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-xs font-medium border border-amber-200 shadow-sm flex items-center gap-2 pointer-events-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Exceeds one page
            </div>
          )}
        </div>
      )}

      <SettingsToolbar
        settings={settings}
        onUpdate={setSettings}
        onExport={() => window.print()}
      />

      <div className="flex flex-col gap-4 items-center resume-wrapper mt-8 print:mt-0 pb-32">
        <div ref={resumeRef} className="origin-top transition-transform duration-200">
          <Resume
            data={resume}
            onChange={setResume}
            settings={settings}
          />
        </div>
      </div>
    </main>
  );
}
