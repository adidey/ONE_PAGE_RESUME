import React from 'react';

export function SkeletonResume() {
    return (
        <div className="bg-white shadow-lg p-8 mx-auto my-8 max-w-[210mm] min-h-[297mm] animate-pulse">
            {/* Header Skeleton */}
            <div className="text-center mb-8 border-b pb-4">
                <div className="h-8 bg-gray-200 w-1/2 mx-auto mb-3 rounded" />
                <div className="flex justify-center gap-2">
                    <div className="h-3 bg-gray-200 w-16 rounded" />
                    <div className="h-3 bg-gray-200 w-4 rounded" />
                    <div className="h-3 bg-gray-200 w-16 rounded" />
                    <div className="h-3 bg-gray-200 w-4 rounded" />
                    <div className="h-3 bg-gray-200 w-16 rounded" />
                </div>
            </div>

            {/* Summary Skeleton */}
            <div className="mb-8">
                <div className="h-5 bg-gray-200 w-24 mb-3 rounded" />
                <div className="h-3 bg-gray-200 w-full mb-2 rounded" />
                <div className="h-3 bg-gray-200 w-full mb-2 rounded" />
                <div className="h-3 bg-gray-200 w-3/4 rounded" />
            </div>

            {/* Experience Skeleton */}
            <div className="mb-8">
                <div className="h-5 bg-gray-200 w-24 mb-4 rounded" />
                {[1, 2].map((i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between mb-2">
                            <div className="h-4 bg-gray-200 w-1/3 rounded" />
                            <div className="h-4 bg-gray-200 w-24 rounded" />
                        </div>
                        <div className="flex justify-between mb-2">
                            <div className="h-3 bg-gray-200 w-1/4 rounded" />
                            <div className="h-3 bg-gray-200 w-20 rounded" />
                        </div>
                        <div className="pl-4 space-y-2 mt-2">
                            <div className="h-2 bg-gray-200 w-full rounded" />
                            <div className="h-2 bg-gray-200 w-5/6 rounded" />
                            <div className="h-2 bg-gray-200 w-4/5 rounded" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Education Skeleton */}
            <div className="mb-8">
                <div className="h-5 bg-gray-200 w-24 mb-4 rounded" />
                <div className="mb-4">
                    <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 w-1/3 rounded" />
                        <div className="h-4 bg-gray-200 w-24 rounded" />
                    </div>
                    <div className="h-3 bg-gray-200 w-1/4 rounded mb-2" />
                </div>
            </div>
        </div>
    );
}
