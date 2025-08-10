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

// Ace modes/themes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
// Initial Data
const initialDocumentsData = [
    {
        id: 1,
        name: "users",
        title: "users-docs",
        description:
            "The users endpoint provides a versatile dataset of sample user information and related data like carts, posts, and todos, making it ideal for testing and prototyping user management functionalities in web applications.",
        steps: [
            {
                name: "get all",
                code: `
// Fetch all users
fetch('http://localhost:8000/api/v1/users')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/users?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/users?limit=5&fields=id,firstName,company')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 2,
        name: "posts",
        title: "posts-docs",
        description:
            "The posts endpoint provides a dataset of sample post information including users, comments, and likes, making it useful for testing and prototyping content management functionalities.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/posts')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/posts?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/posts?limit=5&fields=id,title,body')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 3,
        name: "comments",
        title: "comments-docs",
        description:
            "The comments endpoint provides a dataset of sample comments linked to posts and users, useful for testing comment sections or moderation systems.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/comments')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/comments?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/comments?limit=5&fields=id,body,postId')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 4,
        name: "todos",
        title: "todos-docs",
        description:
            "The todos endpoint provides a dataset of sample to-do items, making it ideal for testing and prototyping task management applications.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/todos')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/todos?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/todos?limit=5&fields=id,todo,completed')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 5,
        name: "products",
        title: "products-docs",
        description:
            "The products endpoint provides a dataset of sample products, ideal for testing and prototyping e-commerce applications.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/products')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/products?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/products?limit=5&fields=id,title,price')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 6,
        name: "carts",
        title: "carts-docs",
        description:
            "The carts endpoint provides a dataset of shopping carts containing product details, useful for testing checkout and cart systems.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/carts')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/carts?limit=3')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/carts?limit=3&fields=id,products,total')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 7,
        name: "images",
        title: "images-docs",
        description:
            "The images endpoint provides a dataset of sample image URLs with metadata, useful for testing gallery and image rendering functionalities.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/images')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/images?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/images?limit=5&fields=id,url,title')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 8,
        name: "quotes",
        title: "quotes-docs",
        description:
            "The quotes endpoint provides a dataset of famous quotes, useful for testing display of short text snippets.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/quotes')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/quotes?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/quotes?limit=5&fields=id,quote,author')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 9,
        name: "recipes",
        title: "recipes-docs",
        description:
            "The recipes endpoint provides a dataset of cooking recipes with ingredients and preparation steps, ideal for food-related app testing.",
        steps: [
            {
                name: "get all",
                code: `
fetch('http://localhost:8000/api/v1/recipes')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit",
                code: `
fetch('http://localhost:8000/api/v1/recipes?limit=5')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "query - limit and fields",
                code: `
fetch('http://localhost:8000/api/v1/recipes?limit=5&fields=id,title,ingredients')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 10,
        name: "http",
        title: "http-docs",
        description:
            "The http endpoint provides utilities for testing different HTTP status codes.",
        steps: [
            {
                name: "GET 200 OK",
                code: `
fetch('http://localhost:8000/api/v1/http/200')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "GET 404 Not Found",
                code: `
fetch('http://localhost:8000/api/v1/http/404')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "GET 500 Internal Server Error",
                code: `
fetch('http://localhost:8000/api/v1/http/500')
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    },
    {
        id: 11,
        name: "auth",
        title: "auth-docs",
        description:
            "The auth endpoint provides routes for authentication tasks like login and token verification.",
        steps: [
            {
                name: "Login example",
                code: `
fetch('http://localhost:8000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'test', password: '1234' })
})
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            },
            {
                name: "Verify token example",
                code: `
fetch('http://localhost:8000/api/v1/auth/verify', {
  headers: { 'Authorization': 'Bearer <your_token>' }
})
  .then(response => response.json())
  .then(data => console.log(data));
        `,
                output: ""
            }
        ]
    }
];


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
            alert("Error fetching data.");
        }
    };

    return (
        <main className="min-h-[calc(100vh-4rem)] relative py-8 bg-gray-100">
            <section className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-start gap-3 px-4 md:px-0">
                {/* Mobile Menu Button */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className=" mb-4 p-2 rounded bg-gray-200 hover:bg-gray-300"
                        aria-label="Open menu"
                    >
                        <i className="fi fi-sr-menu-burger text-xl text-gray-600" />
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
                fixed top-0 max-md:top-[4rem] left-0 max-md:left-1 h-full bg-gray-50 rounded-md shadow-lg border-2 border-gray-200
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
                                        key={doc.id}
                                        className={`cursor-pointer border-b-2 w-fit border-transparent capitalize nunito-600 ${selectedDoc.id === doc.id
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
                                fontSize={18}
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