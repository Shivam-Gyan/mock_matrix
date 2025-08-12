// const Documents = [
//     { id: 1, name: "users" },
//     { id: 2, name: "posts" },
//     { id: 3, name: "comments" },
//     { id: 4, name: "todos" },
//     { id: 5, name: "products" },
//     { id: 6, name: "carts" },
//     { id: 7, name: "images" },
//     { id: 8, name: "quotes" },
//     { id: 9, name: "receipes" },
//     { id: 10, name: "http" },
//     { id: 11, name: "Auth" }
// ];


import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { customJson,initialDocumentsData } from '../utils/docs.js'

// Ace modes/themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
// Initial Data



const Modal = ({ isOpen, onClose, output }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-quicksand capitalize font-bold text-gray-700">Output</h2>
                    <button
                        onClick={onClose}
                        className="text-red-500 w-8 h-8 flex cursor-pointer items-center justify-center bg-red-50 rounded-full hover:text-red-700 text-xl"
                        aria-label="Close modal"
                    >
                        <i className="fi fi-br-cross-small text-md mt-1 font-bold" />
                    </button>
                </div>

                {output ? (
                    <>
                        <AceEditor
                            mode="json"
                            theme="monokai"
                            value={output}
                            name="modal-output"
                            width="100%"
                            height="300px"
                            readOnly
                            setOptions={{ useWorker: false }}
                            className="rounded overflow-hidden"
                            style={{ paddingTop: "20px" }}
                        />
                        <button
                            onClick={handleCopy}
                            className="mt-4 px-4 py-2 text-sm nunito-600 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
                        >
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">No output available.</p>
                )}
            </div>
        </div>
    );
};

const Documentation = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [docs, setDocs] = useState(initialDocumentsData);
    const [selectedDoc, setSelectedDoc] = useState(initialDocumentsData[0]);
    const [modalData, setModalData] = useState({ open: false, output: "" });

    // Optional: close sidebar on window resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setShowSidebar(true);
            else setShowSidebar(false);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleRunStep = async (docId, stepIndex) => {
        try {

            if (docId == 11) {
                const step = docs.find((d) => d.id === docId).steps[stepIndex];
                const outputString = step.output || "No output available.";

                setDocs((prevDocs) =>
                    prevDocs.map((doc) =>
                        doc.id === docId
                            ? {
                                ...doc,
                                steps: doc.steps.map((s, i) =>
                                    i === stepIndex ? { ...s, output: outputString } : s
                                )
                            }
                            : doc
                    )
                );

                if (selectedDoc.id === docId) {
                    setSelectedDoc((prev) => ({
                        ...prev,
                        steps: prev.steps.map((s, i) =>
                            i === stepIndex ? { ...s, output: outputString } : s
                        )
                    }));
                }

                setModalData({ open: true, output: outputString });
                return;
            }

            const step = docs.find((d) => d.id === docId).steps[stepIndex];
            const urlMatch = step.code.match(/fetch\(['"`](.*?)['"`]\)/);
            if (!urlMatch) return alert("No valid fetch URL found.");

            const url = urlMatch[1];
            const res = await fetch(url);
            const data = await res.json();

            const outputString = JSON.stringify(data, null, 2);

            setDocs((prevDocs) =>
                prevDocs.map((doc) =>
                    doc.id === docId
                        ? {
                            ...doc,
                            steps: doc.steps.map((s, i) =>
                                i === stepIndex ? { ...s, output: outputString } : s
                            )
                        }
                        : doc
                )
            );

            if (selectedDoc.id === docId) {
                setSelectedDoc((prev) => ({
                    ...prev,
                    steps: prev.steps.map((s, i) =>
                        i === stepIndex ? { ...s, output: outputString } : s
                    )
                }));
            }

            setModalData({ open: true, output: outputString });
        } catch (err) {
            console.error(err);
            toast.error("Error fetching data.");
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] relative py-8 bg-gray-100">
            <section className="max-w-7xl  mx-auto flex flex-col md:flex-row justify-center items-start gap-3 px-4 md:px-3">
                {/* Mobile Menu Button */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className=" mb-4 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
                        aria-label="Open menu"
                    >
                        <i className="fi fi-br-bars-staggered text-lg ml-1 mt-1 text-gray-600" />
                    </button>
                )}

                {/* Sidebar with Framer Motion */}
                <AnimatePresence>
                    {showSidebar && (
                        <motion.nav
                            key="sidebar"
                            initial={{ x: "-200%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-200%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="
                fixed max-md:top-[4rem] max-md:left-1 h-full bg-gray-50 rounded-md shadow-lg border-2 border-gray-200
                w-64 p-4 z-50 md:relative md:translate-x-0 md:h-auto md:w-48 md:p-3 md:shadow-none md:border-0
                flex flex-col
              "
                            style={{ maxHeight: "calc(100vh - 4rem)" }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="nunito-600 text-lg text-gray-400 select-none">
                                    Plain JSON
                                </h1>
                                {/* Close button only on mobile */}
                                <button
                                    onClick={() => setShowSidebar(false)}
                                    className="text-red-500 w-8 h-8 flex cursor-pointer items-center justify-center bg-red-50 rounded-full hover:text-red-700 text-xl"
                                    aria-label="Close modal"
                                >
                                    <i className="fi fi-br-cross-small text-md mt-1 font-bold" />
                                </button>
                            </div>

                            <ul className="flex ml-4 flex-col gap-2 overflow-y-auto">
                                {docs.map((doc) => (
                                    <li
                                        key={doc["id"]}
                                        className={`cursor-pointer border-b-2 w-fit border-transparent capitalize font-inconsolata font-semibold ${selectedDoc.id === doc.id
                                            ? "text-blue-600 font-bold border-blue-600"
                                            : "text-gray-600 hover:text-gray-800 hover:border-gray-700"
                                            }`}
                                        onClick={() => setSelectedDoc(doc)}
                                    >
                                        {doc["name"]}
                                    </li>
                                ))}
                            </ul>

                            <h1 className="nunito-600 mt-4 mb-3 text-lg text-gray-400 select-none">
                                Custom Json
                            </h1>

                            <ul className="flex ml-4 flex-col gap-2 overflow-y-auto">
                                {customJson.map((doc) => (
                                    <li
                                        key={doc.id}
                                        className={`cursor-pointer border-b-2 w-fit border-transparent capitalize font-inconsolata font-semibold ${selectedDoc.id === doc.id
                                            ? "text-blue-600 font-bold border-blue-600"
                                            : "text-gray-600 hover:text-gray-800 hover:border-gray-700"
                                            }`}
                                        onClick={() => setSelectedDoc(doc)}
                                    >
                                        {doc.name}
                                    </li>
                                ))}
                            </ul>


                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                {
                    (selectedDoc["id"] == 12 || selectedDoc["id"] == 13) ?
                        <article className="flex-1 min-h-screen border-2 border-gray-200 rounded-md shadow-xl p-4 bg-gray-50 overflow-y-auto max-w-full md:max-w-none">
                            {/* Header */}
                            <header className="mb-6">
                                <h2 className="text-2xl font-nunito font-bold text-gray-900">{selectedDoc.name}</h2>
                                <p className="text-lg font-inconsolata font-semibold text-gray-600">{selectedDoc.title}</p>
                            </header>

                            {/* Description */}
                            <section className="space-y-4 font-inconsolata">
                                {selectedDoc.description.map((item, index) => {
                                    if (typeof item === "string") {
                                        // Function to randomly highlight important words
                                        const highlightImportantWords = (text) => {
                                            const words = text.split(" ");
                                            const colorClasses = ["text-red-500", "text-green-500", "text-amber-700"];

                                            return words
                                                .map((word) => {
                                                    // Pick a few impactful words to highlight
                                                    if (word.length > 6 && Math.random() < 0.25) { // ~25% chance
                                                        const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
                                                        return `<span class="${color} font-semibold">${word}</span>`;
                                                    }
                                                    return word;
                                                })
                                                .join(" ");
                                        };

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-start"
                                                dangerouslySetInnerHTML={{
                                                    __html: `<span class="text-blue-500 mt-1 mr-2">•</span><p class="text-gray-800 leading-relaxed">${highlightImportantWords(
                                                        item
                                                    )}</p>`,
                                                }}
                                            />
                                        );
                                    }

                                    if (typeof item === "object") {
                                        return (
                                            <div key={index} className="my-4">
                                                <pre className="bg-gray-900 text-green-300 text-sm p-4 rounded-lg overflow-x-auto">
                                                    {JSON.stringify(item, null, 2)}
                                                </pre>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </section>
                        </article>

                        : (
                            <section className="flex-1 min-h-screen border-2 border-gray-200 rounded-md shadow-xl p-4 bg-gray-50 overflow-y-auto max-w-full md:max-w-none">
                                <h1 className="text-gray-700 font-nunito capitalize text-2xl font-bold">
                                    {selectedDoc.title}
                                </h1>
                                <p className="text-gray-600 font-inconsolata mt-2">
                                    {selectedDoc.description}
                                </p>

                                {selectedDoc.steps.map((step, idx) => (
                                    <div key={idx} className="mt-6">
                                        <h2 className="text-xl font-nunito capitalize font-semibold text-gray-700">
                                            {step.name}
                                        </h2>

                                        <h3 className="text-sm font-inconsolata text-gray-500 mt-2 mb-1">
                                            fetching example
                                        </h3>
                                        <AceEditor
                                            mode="javascript"
                                            theme="monokai"
                                            value={step.code.trim()}
                                            name={`code-${idx}`}
                                            width="100%"
                                            height="150px"
                                            fontSize={selectedDoc.id ===11 ? 10 : 15}
                                            readOnly
                                            setOptions={{ useWorker: false }}
                                            className="rounded overflow-hidden"
                                            style={{ paddingTop: "20px" }}
                                        />

                                        <button
                                            onClick={() => handleRunStep(selectedDoc.id, idx)}
                                            className="mt-2 px-4 py-1 bg-slate-700 nunito-400 text-sm text-white rounded-md hover:bg-slate-600"
                                        >
                                            Output
                                        </button>
                                    </div>
                                ))}
                            </section>
                        )
                }
            </section>

            {/* Output Modal */}
            <Modal
                isOpen={modalData.open}
                output={modalData.output}
                onClose={() => setModalData({ open: false, output: "" })}
            />
        </main>
    );
};

export default Documentation;