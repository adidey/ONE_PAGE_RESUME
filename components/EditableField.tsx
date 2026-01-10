'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface EditableFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    placeholder?: string;
}

export function EditableField({ value, onChange, className, placeholder, ...props }: EditableFieldProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            className={twMerge(
                'bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 w-full',
                className
            )}
            placeholder={placeholder}
            {...props}
        />
    );
}

export function EditableTextArea({ value, onChange, className, placeholder, ...props }: { value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, className?: string, placeholder?: string }) {
    // Simple auto-resize text area could be added here, currently just standard textarea
    return (
        <textarea
            value={value}
            onChange={onChange}
            className={twMerge(
                'bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 w-full resize-none overflow-hidden',
                className
            )}
            placeholder={placeholder}
            rows={3} // default
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
            }}
            {...props}
        />
    );
}
