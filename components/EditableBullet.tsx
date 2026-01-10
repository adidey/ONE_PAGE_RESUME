'use client';

import { useState, useRef, useEffect } from 'react';
import { X, CornerDownLeft } from 'lucide-react';

interface EditableBulletProps {
    initialValue: string;
    onSave: (value: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    readOnly?: boolean;
}

export function EditableBullet({ initialValue, onSave, onDelete, onEnter, readOnly = false }: EditableBulletProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleBlur = () => {
        setIsEditing(false);
        if (value !== initialValue) {
            onSave(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
            onEnter();
        }
        if (e.key === 'Backspace' && value === '') {
            e.preventDefault();
            onDelete();
        }
    };

    if (readOnly) {
        return <li className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-gray-400 text-gray-700">{value}</li>;
    }

    if (isEditing) {
        return (
            <li className="relative flex items-center group">
                <span className="absolute left-0 text-gray-400">•</span>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="ml-3 w-full bg-white border border-blue-400 rounded px-1 outline-none text-gray-700"
                />
                <div className="absolute right-0 top-0 hidden group-hover:flex gap-1 z-10">
                    <button onMouseDown={(e) => { e.preventDefault(); onDelete(); }} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                </div>
            </li>
        );
    }

    return (
        <li
            onClick={() => setIsEditing(true)}
            className="relative pl-3 before:content-['•'] before:absolute before:left-0 before:text-gray-400 cursor-text hover:bg-gray-100 rounded text-gray-700 group transition-colors"
        >
            {value}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1 pr-1">
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-0.5 text-gray-300 hover:text-red-500 rounded"><X className="w-3 h-3" /></button>
            </div>
        </li>
    );
}
