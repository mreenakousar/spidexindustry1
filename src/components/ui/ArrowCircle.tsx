"use client";

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ArrowCircleProps {
    className?: string;
}

export default function ArrowCircle({ className = "" }: ArrowCircleProps) {
    return (
        <div
            className={`
        flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-blue-600  text-white 
        transition-all duration-300 ease-out shrink-0
        
        /* Parent (group) hover styles */
        group-hover:border-blue-500 
        group-hover:bg-blue-600 
        group-hover:text-white 
        group-hover:scale-110
        ${className}
      `}
        >
            <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
        </div>
    );
}