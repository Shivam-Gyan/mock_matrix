import React from 'react';

const ModalInstruction = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    actionLabel, 
    onAction 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-100/50 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative border border-gray-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                    &times;
                </button>

                {/* Title */}
                <h2 className="text-xl font-semibold text-slate-700 mb-4">{title}</h2>

                {/* Content */}
                <div className="text-sm text-gray-700 font-inconsolata space-y-2">
                    {children}
                </div>

                {/* Optional Action Button */}
                {actionLabel && onAction && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onAction}
                            className="bg-slate-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-slate-800"
                        >
                            {actionLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalInstruction;
