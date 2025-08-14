import { useState } from 'react';
import CodeEditor from './Code.block.jsx'
import ModalInstruction from './modal.instruction.jsx'
import { createData } from '../services/database.services.jsx';
import { toast } from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';
import { useAuth } from '../context/context.jsx';
import ModalGenerateProject from './Modal.generate.jsx';
import { Link, useNavigate } from 'react-router-dom';

// const auth = true;

const Craft = () => {
    const { projects, user: auth } = useAuth();
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [projectData, setProjectData] = useState({
        projectName: "",
        projectPassword: "",
        originIp: "",
        projectType: "custom",
        projectId: ""
    });
    const [code, setCode] = useState(
        `
// below code is testing purpose
// Please replace with your actual data
// don't add any comments 
// just plain schema/ plain json

// this object for smart mode
{
    "name":"string",
    "email":"string",
    "password":"string"
}
// this object for basic 
{
    "name":"mock-matrix",
    "email":"mock-matrix@contact.com",
    "password":"mockmatrix123"
}`);

    const handleGenerate = async () => {
        if (!code) {
            toast.error('Please enter valid JSON schema');
            return;
        }

        setLoading(true);
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
            setGeneratedUrl(response?.projectUrl);
            toast.success('Project created successfully! URL copied to clipboard.');
        } catch (error) {
            toast.error('Error generating project. Please try again.');
            console.error('Error generating project:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProjectChange = (e) => {
        // set selected projects
        setSelectedProject(e.target.value);

        // find project from projects
        const project = projects.find((proj) => proj.projectId === e.target.value);

        // set project data
        setProjectData({
            projectName: project.projectName,
            projectPassword: project.projectPassword,
            originIp: project.originIp,
            projectType: project.projectType,
            projectId: project.projectId
        });

    };

    const handleNavigateToDashboard = () => {
        // Navigate to the dashboard
        if(auth){
            navigate('/dashboard');
        }else{
            toast.error('Please login to access the dashboard');
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
                        Upload your JSON <span className="font-semibold text-red-500">schema </span>
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

            <ModalGenerateProject
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

            <div className="flex gap-4 justify-evenly mb-3 w-fit max-md:justify-center md:w-2xl p-4 mx-auto">
                <select
                    value={selectedProject}
                    onChange={handleProjectChange}
                    disabled={projects.length === 0}
                    className="px-3 py-2 font-nunito max-md:hidden w-64 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
                >
                    <option className='' value="">{projects.length === 0 ? "No projects" : "Select a project"}</option>
                    {projects.map((proj) => (
                        <option key={proj.projectId} value={proj.projectId}>
                            {proj.projectName} {" "} {proj.projectType === "custom" ? "(Basic Mode)" : "(Smart Mode)"}
                        </option>
                    ))}
                </select>

                <button onClick={handleNavigateToDashboard}
                    className="flex items-center gap-2 bg-gray-100 border border-gray-300 px-4 py-1 rounded-lg font-semibold"
                >
                    <span className="text-lg font-bold">+</span> Create New Project
                </button>

                <HashLink
                    smooth
                    to="/#services"
                    className={
                        (projectData.projectType === 'plain'
                            ? 'bg-slate-800 text-white'
                            : 'bg-gray-100') +
                        ' px-4 py-2 mt-1 border border-gray-300 rounded-lg text-sm nunito-600 hover:shadow-md'
                    }
                >
                    Plain JSON?
                </HashLink>
            </div>

            <section className="w-fit max-md:flex max-md:flex-col max-md:justify-center md:w-3xl p-4 mx-auto border-[1px] z-10 border-gray-200 shadow-xl shadow-slate-500 bg-gray-100/70 backdrop-blur-3xl rounded-lg overflow-hidden">


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

export default Craft;
