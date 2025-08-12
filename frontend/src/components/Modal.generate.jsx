import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../common/Loader.common';

const ModalGenerateProject = ({ isOpen, onClose, setLoading,setGeneratedUrl, loading, generatedUrl, setProjectData, projectData, handleGenerate }) => {

    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!projectData.projectId || !projectData.projectName || !projectData.originIp) {
            toast.error("Please a create project first");
            return;
        }
        setLoading(true);
        await handleGenerate();
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                onClose(); // Close modal after copy
            }, 1000);
        });
    };

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

                <h2 className="text-xl font-nunito font-semibold text-slate-700 mb-2">Generate URL</h2>
                <p className="text-sm font-inconsolata text-gray-500 mb-4">
                    cross check all the below details before generating the project. wait few second to copy the link.
                </p>

                <div className="space-y-4">
                    <div className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100'>
                        <p className='font-inconsolata text-slate-500'> id: {projectData.projectId}</p>
                    </div>
                    <div className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100'>
                        <p className='font-inconsolata text-slate-500'> type: {projectData.projectType == "custom"?"Basic mode":"Smart mode"}</p>
                    </div>
                    <div className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100'>
                        <p className='font-inconsolata text-slate-500'> name: {projectData.projectName}</p>
                    </div>
                    <div className='mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100'>
                        <p className='font-inconsolata text-slate-500'> origin: {projectData.originIp}</p>
                    </div>

                        <div className='mt-1 block w-full border border-gray-300 overflow-hidden rounded-md px-3 py-2 text-sm bg-gray-100'>
                            <div className='font-inconsolata text-slate-500'> {generatedUrl || <Loader size={50} />}</div>
                            {generatedUrl && (
                                <button
                                    onClick={() => setGeneratedUrl("")}
                                    className="mt-3 inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-700/80 hover:bg-slate-300 rounded transition"
                                    type="button"
                                    title="Refresh"
                                >
                                    &#x21bb; Refresh
                                </button>
                            )}
                        </div>
                    {/* {generatedUrl && (
                    )} */}
                </div>

                <div className="mt-6 flex justify-end">
                    {!generatedUrl ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-slate-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-slate-800 flex items-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Generating...
                                </span>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={handleCopy}
                            className="bg-slate-700 text-white px-4 py-1.5 rounded-md text-sm hover:bg-slate-800"
                        >
                            {copied ? 'Copied!' : 'Copy URL'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalGenerateProject;
