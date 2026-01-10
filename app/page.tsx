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
  }>({
    font: 'sans',
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
      // 297mm in pixels at 96dpi is approx 1122.5px
      // We'll use a safer threshold or dynamic check
      const pageHeight = 1123;
      setIsOverflowing(resumeRef.current.scrollHeight > pageHeight);
    };

    // Check initially and on updates
    const observer = new ResizeObserver(checkOverflow);
    if (resumeRef.current) {
      observer.observe(resumeRef.current);
    }

    // Also check on resume data changes implicitly via effect
    checkOverflow();

    return () => observer.disconnect();
  }, [resume, settings]);


  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex justify-center py-8">
        <SkeletonResume />
      </main>
    );
  }

  return (
    <main className={`min-h-screen flex flex-col items-center py-8 print:py-0 print:bg-white view-mode-${settings.viewMode}`}>
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

      <div className="flex flex-col gap-4 items-center resume-wrapper mt-8 print:mt-0">
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
