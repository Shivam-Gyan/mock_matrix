import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../common/Loader.common';

const ModalProject = ({
  isOpen,
  onClose,
  setLoading,
  loading,
  generatedUrl,
  setProjectData,
  projectData,
  handleGenerate
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(projectData.projectUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose(); // Close modal after copy
      }, 1000);
    });
  };

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
        <div className="bg-slate-900 rounded-lg shadow-xl max-w-lg w-full p-6 relative border border-slate-700">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-slate-400 hover:text-white text-xl font-bold"
            >
                &times;
            </button>

            <h2 className="text-xl font-nunito font-semibold text-white mb-2">Generate URL</h2>
            <p className="text-sm font-inconsolata text-slate-400 mb-4">
                This section is for review purposes only. Please carefully verify all project details below before proceeding to generate the project URL. If you wish to modify any information, kindly use the edit option provided for each project in the row. Once you are satisfied with the details, you may generate and copy the project link.
            </p>

            <div className="space-y-4">
                <div className="mt-1 block w-full border border-slate-700 rounded-md px-3 py-2 text-sm bg-slate-800">
                    <p className="font-inconsolata text-slate-300">
                        id: {projectData.projectId}
                    </p>
                </div>
                <div className="mt-1 block w-full border border-slate-700 rounded-md px-3 py-2 text-sm bg-slate-800">
                    <p className="font-inconsolata text-slate-300">
                        type: {projectData.projectType === 'custom' ? 'Basic mode' : 'Smart mode'}
                    </p>
                </div>
                <div className="mt-1 block w-full border border-slate-700 rounded-md px-3 py-2 text-sm bg-slate-800">
                    <p className="font-inconsolata text-slate-300">
                        name: {projectData.projectName}
                    </p>
                </div>
                <div className="mt-1 block w-full border border-slate-700 rounded-md px-3 py-2 text-sm bg-slate-800">
                    <p className="font-inconsolata text-slate-300">
                        origin: {projectData.originIp}
                    </p>
                </div>

                {projectData.JsonFile && (
                    <div className="mt-1 block w-full border border-slate-700 overflow-hidden rounded-md px-3 py-2 text-sm bg-slate-800">
                        <div className="font-inconsolata text-slate-300">
                            project url:{' '}
                            {projectData.projectUrl || <Loader size={50} />}
                        </div>
                    </div>
                )}
            </div>

            {projectData.JsonFile && projectData.projectUrl && (
                <button
                    onClick={handleCopy}
                    className="mt-4 bg-slate-700 font-inconsolata hover:bg-slate-600 border border-slate-600 px-4 py-1 rounded-lg font-semibold text-white"
                >
                    {copied ? 'Copied!' : 'Copy url'}
                </button>
            )}
        </div>
    </div>
);
};

export default ModalProject;
