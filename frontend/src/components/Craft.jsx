import { useState } from 'react';
import CodeEditor from './Code.block.jsx'
import ModalInstruction from './modal.instruction.jsx'
import ModalProject from './Modal.Project.jsx';
import { createData } from '../services/database.services.jsx';
import { toast } from 'react-hot-toast';

const auth = true;

const Craft = () => {
    const [showModal, setShowModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [projectData, setProjectData] = useState({
        projectName: "",
        projectType: "aicustom",
        projectPassword: "",
    })
    const [code, setCode] = useState(
        `
// below code is testing purpose
// Please replace with your actual data
{
    "name":"mock-matrix",
    "email":"mock-matrix@contact.com",
    "password":"mock-matrix123"
}`);

    const handleGenerate = async () => {
        if (!code) {
            toast.error('Please enter valid JSON schema');
            return;
        }

        setLoading(true);
        // await setProjectData({ ...projectData, json: JSON.parse(code), schema: JSON.parse(code) });
        try {
            let response;
            switch (projectData.projectType) {
                case "aicustom":
                    response = await createData('/projects/custom-ai', {
                        ...projectData,
                        schema: JSON.parse(code)
                    });
                    break;
                case "custom":
                    response = await createData('/projects/custom', {
                        ...projectData,
                        json: JSON.parse(code)
                    });
                    break;
                default:
                    throw new Error("Unknown project type");
            }
            console.log('Project created:', response);
            setGeneratedUrl(response?.projectUrl);
            toast.success('Project created successfully! URL copied to clipboard.');
        } catch (error) {
            console.error('Error generating project:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        // <section className="relative  h-[calc(100vh-4rem)] overflow-hidden max-sm:px-5 px-16 py-10">
        <main id="generate" className="min-h-screen mb-10">
            <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-12 pb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito tracking-tight text-slate-700">
                    Generate <span className="text-slate-500">JSON</span> <i className='fi fi-br-bracket-curly text-4xl' /> <i className='fi fi-br-bracket-curly-right text-4xl' />
                </h1>
                <p className="mt-4 max-w-2xl font-inconsolata text-gray-500">
                    Generate a live data URL in seconds. Simply provide your JSON schema, and Mock Matrix will instantly give you a URL with your schema and perfectly structured dummy JSON, ready for testing and development.
                </p>
                <div className=" z-30 flex w-fit items-center mt-4 gap-2 bg-gray-100/70 backdrop-blur-3xl p-3 rounded-lg border-[1px] border-gray-200">
                    <span className="w-2 h-2  rounded-full bg-red-500"></span>
                    <p className="font-inconsolata text-sm">Build JSON, share in seconds</p>
                </div>
            </section>

            {/*format of json modal instruction */}
            <ModalInstruction isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Smart Mode JSON Schema Guide"
                actionLabel="Next → Generate Instruction"
                onAction={() => {
                    setShowModal(false);       // close current modal
                    setShowGenerateModal(true) // open generate modal
                }}
            >
                <p>
                    To use<span className='text-amber-800 font-bold'> Mock Matrix</span>, your JSON schema should follow this format:
                </p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {`{
    "name": "string",
    "email": "string",
    "age": "number",
    "isActive": "boolean",
    "user":{
        "createdAt": "date",
        "id": "uuid"
    }
}`}
                </pre>
                <ul className="list-disc list-inside mt-2 text-xs text-gray-600">
                    <li>All keys must be <span className='font-bold text-red-500'>strings</span>.</li>
                    <li>Each value defines the expected <span className='font-bold text-red-500'>data type</span>.</li>
                    <li>Supported types: <code className='font-bold text-green-800'>string</code>, <code className='font-bold text-green-800'>number</code>, <code className='font-bold text-green-800'>boolean</code>, <code className='font-bold text-green-800'>date</code>, <code className='font-bold text-green-800'>uuid</code>.</li>
                    <li>You can nest <span className='font-bold text-red-500'>objects</span> and <span className='font-bold text-red-500'>arrays</span> for more complex structures.</li>
                </ul>
            </ModalInstruction>


            {/* generate modal instructions */}
            <ModalInstruction
                isOpen={showGenerateModal}
                onClose={() => setShowGenerateModal(false)}
                title="Generate JSON – Instructions"
            >
                <p className="text-sm text-gray-700 font-inconsolata">
                    Choose how you want to generate your JSON data. We offer two modes:
                </p>

                {/* Option 1: Basic Mode */}
                <div className="border border-gray-200 rounded-md p-4 mb-4 hover:border-slate-400 transition">
                    <h3 className="text-lg font-semibold text-slate-800">1. Basic Mode</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Paste your own prebuilt JSON. We’ll give you a sharable API URL instantly.
                        <br />
                        <span className="text-green-600 font-medium">No AI needed</span>.
                    </p>
                    <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-auto">
                        {`{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 28
}`}
                    </pre>
                </div>

                {/* Option 2: Smart Mode */}
                <div className="border border-gray-200 rounded-md p-4 hover:border-slate-400 transition">
                    <h3 className="text-lg font-semibold text-slate-800">2. Smart Mode</h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Upload your JSON <span className="font-semibold text-red-500">schema</span>
                        and our AI will generate perfectly structured dummy JSON for you.
                        You’ll receive an API URL to fetch the AI-generated data.
                    </p>
                    <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-auto">
                        {`{
    "name": "string",
    "email": "string",
    "age": "number"
}`}
                    </pre>
                </div>
            </ModalInstruction>

            {/* generate modal which take project name,password,type */}

            <ModalProject
                isOpen={showProjectModal}
                onClose={() => setShowProjectModal(false)}
                setLoading={setLoading}
                loading={loading}
                generatedUrl={generatedUrl}
                setProjectData={setProjectData}
                projectData={projectData}
                handleGenerate={handleGenerate}
            />

            {/* <CodeEditor/> */}

            <section className="w-fit max-md:flex max-md:flex-col max-md:justify-center md:w-2xl p-4 mx-auto border-[1px] z-10 border-gray-200 shadow-xl bg-gray-100/70 backdrop-blur-3xl rounded-lg overflow-hidden">
                <div>
                    <span className="block text-slate-800 font-semibold mb-2">Project Type</span>
                    <div className="flex gap-6">
                        {/* AI Custom */}
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={projectData.projectType === "aicustom"}
                                onChange={() => {
                                    setGeneratedUrl("")

                                    setProjectData((prev) => ({
                                        projectName: "",
                                        projectPassword: "",
                                        projectType: "aicustom",
                                    }));
                                }}
                                className="peer hidden"
                            />
                            <span className="w-3 h-3 flex items-center justify-center rounded-full border border-gray-400 bg-white peer-checked:bg-red-500 peer-checked:border-red-100 peer-checked:text-white transition-all duration-200">
                                <svg
                                    className="w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="text-sm text-gray-800 group-hover:text-slate-700 transition-colors">Smart Mode</span>
                        </label>

                        {/* Custom (Free) */}
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={projectData.projectType === "custom"}
                                onChange={() => {
                                    setGeneratedUrl("")

                                    setProjectData((prev) => ({
                                        projectName: "",
                                        projectPassword: "",
                                        projectType: "custom",
                                    }));
                                }}
                                className="peer hidden"
                            />
                            <span className="w-3 h-3 flex items-center justify-center rounded-full border border-gray-400 bg-white peer-checked:bg-red-500 peer-checked:border-red-100 peer-checked:text-white transition-all duration-200">
                                <svg
                                    className="w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span className="text-sm text-gray-800 group-hover:text-slate-700 transition-colors">Basic Mode</span>
                        </label>
                    </div>
                </div>

                <div className="flex max-md:flex-col gap-5 mt-4">
                    <CodeEditor setCode={setCode} code={code} />
                    <div className="flex max-md:gap-5 flex-col justify-around">
                        <div>
                            <h1 className="nunito-600 text-lg">Quick Guide</h1>
                            <p className="nunito-400 text-sm text-gray-600">
                                Get a quick introduction about our schema format and data entries.
                            </p>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-nunito mt-4 px-3 py-1 rounded-md transition-colors"
                            >
                                Learn More
                            </button>
                        </div>

                        <div>
                            <h1 className="nunito-600 text-lg">Generate JSON</h1>
                            <p className="nunito-400 text-sm text-gray-600">
                                Quickly generate JSON data based on your schema.
                            </p>
                            <button
                                onClick={() => {
                                    if (!auth) {
                                        toast.error('Please login to generate project');
                                        return;
                                    }
                                    if (!code) {
                                        toast.error('Please enter valid JSON schema');
                                        return;
                                    }
                                    setShowProjectModal(true);
                                }}
                                className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-nunito mt-4 px-3 py-1 rounded-md transition-colors"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Craft


// <svg
//     className="absolute inset-0 z-0 w-full h-full"
//     viewBox="0 0 100 100"
//     preserveAspectRatio="none"
// >
//     {/* Desktop / tablet elbow path */}
//     <path
//         className=""
//         d="M0,60 H55 L70,45 H100" // moved from 70→60 and 55→45
//         fill="none"
//         stroke="#E5E7EB" // solid Tailwind gray-200
//         //  stroke="#D1D5DB" // solid Tailwind gray-300
//         strokeWidth="20"
//         vectorEffect="non-scaling-stroke"
//         strokeLinecap="round"
//     />
// </svg>