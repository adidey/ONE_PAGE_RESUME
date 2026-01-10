import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface EditableTextProps {
    initialValue: string;
    onSave: (value: string) => void;
    className?: string;
    placeholder?: string;
    tagName?: React.ElementType;
    multiline?: boolean;
    readOnly?: boolean;
}

export function EditableText({
    initialValue,
    onSave,
    className,
    placeholder = 'Click to edit...',
    tagName: Tag = 'div',
    multiline = false,
    readOnly = false
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
        if (e.key === 'Enter' && !multiline) {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setValue(initialValue);
            setIsEditing(false);
        }
    };

    if (readOnly) {
        return <Tag className={className}>{value}</Tag>;
    }

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-white border border-blue-400 rounded px-1 outline-none resize-none ${className}`}
                    rows={4}
                />
            );
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={`w-full bg-white border border-blue-400 rounded px-1 outline-none ${className}`}
            />
        );
    }

    return (
        <Tag
            onClick={() => setIsEditing(true)}
            className={`cursor-text hover:bg-gray-100 rounded px-0.5 min-w-[20px] transition-colors ${!value && 'text-gray-400 italic'} ${className}`}
        >
            {value || placeholder}
        </Tag>
    );
}
