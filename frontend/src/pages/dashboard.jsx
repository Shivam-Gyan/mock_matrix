

import { useAuth } from "../context/context";
import Loader from "../common/Loader.common";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectTab from "../components/ProjectTab";
import InsightTab from "../components/InsightTab";
import Account from "../components/Account";
import Generate from "../components/Generate";

// navbar item
const navbar = [
    {
        name: "Dashboard",
        items: [
            {
                name: "Insights",
            },
            {
                name: "Projects",
            },
            {
                name:"Generate",
            }
        ]
    },
    {
        name: "Settings",
        items: [
            {
                name: "Account",
            },
            {
                name: "Logout",
            }
        ]
    }
]



const Dashboard = () => {

    const { user: auth, setUser } = useAuth();
    const navigate = useNavigate();

    const [activetab, setActiveTab] = useState("Projects");
    const [showSidebar, setShowSidebar] = useState(false);

    // auth check
    if (!auth) {
        return <main className="flex items-center justify-center h-[calc(100vh-5rem)]"><Loader /></main>; // Or a spinner
    }

    // logout handler
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null); // from useAuth context
        navigate("/");
    }


    return (
        <main className="min-h-[calc(100vh-4rem)] py-5 pt-5 overflow-hidden bg-slate-800 relative flex max-lg:flex-col items-start lg:items-start px-2 ">

            {/* side navbar */}

            <section className="w-56 max-lg:hidden h-[calc(100vh-5rem)] bg-gray-400/10 rounded-lg shadow-md flex flex-col justify-between">
                <nav className="p-4">
                    {
                        navbar.map((item) => (
                            <div className="" key={item.name}>
                                <h3 className="font-quicksand my-2 pointer-events-none text-gray-200 text-lg font-bold">{item.name}</h3>
                                <ul className="ml-5  py-2 font-inconsolata font-bold text-gray-100 ">
                                    {item.items.map((subItem) => (
                                        <li key={subItem.name} className="my-3 w-fit hover:border-b-2 hover:border-gray-100">
                                            {
                                                subItem.name == "Logout" ?
                                                    <button onClick={handleLogout} className="text-gray-100 cursor-pointer hover:text-red-500 ">Logout</button>
                                                    :
                                                    <button onClick={() => setActiveTab(subItem.name)} className="text-gray-100 cursor-pointer">{subItem.name}</button>
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                </nav>

                <div className="p-4 flex flex-col items-start gap-2">
                    <div className="rounded-full w-10 h-10  p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                        <div className="overflow-hidden rounded-full bg-gray-200">
                            <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                        </div>
                    </div>
                    <span className="text-gray-200 font-inconsolata font-semibold text-md">@{auth?.username}</span>
                </div>
            </section>
            {
                showSidebar && (
                    <section className={`w-48 lg:hidden absolute z-40 bg-gray-900 h-[calc(100vh-5rem)] rounded-lg shadow-md flex flex-col justify-between`}>
                        <button onClick={() => setShowSidebar(false)} className="absolute top-6 right-7 cursor-pointer lg:hidden text-gray-200 hover:text-gray-100">
                            <i className="fi fi-br-cross text-sm" />
                        </button>
                        <nav className="p-4">
                            {
                                navbar.map((item) => (
                                    <div className="" key={item.name}>
                                        <h3 className="font-quicksand my-2 pointer-events-none text-gray-200 text-lg font-bold">{item.name}</h3>
                                        <ul className="ml-5 py-2 font-inconsolata font-bold text-gray-100 ">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.name} className="my-2 w-fit hover:border-b-2 hover:border-gray-100">
                                                    {
                                                        subItem.name == "Logout" ?
                                                            <button onClick={handleLogout} className="text-gray-100 cursor-pointer hover:text-red-500 ">Logout</button>
                                                            :
                                                            <button onClick={() => {setActiveTab(subItem.name); setShowSidebar(false)}} className="text-gray-100 cursor-pointer">{subItem.name}</button>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}

                        </nav>

                        <div className="p-4 flex flex-col items-start gap-2">
                            <div className="rounded-full w-10 h-10  p-[2px] bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                                <div className="overflow-hidden rounded-full bg-gray-200">
                                    <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                                </div>
                            </div>
                            <span className="text-gray-200 font-inconsolata font-semibold text-md">@{auth?.username}</span>
                        </div>
                    </section>
                )
            }


            <button
                onClick={() => setShowSidebar(true)}
                className=" lg:hidden ml-2 mb-4 w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
                aria-label="Open menu"
            >
                <i className="fi fi-br-bars-staggered text-lg  ml-1 mt-1 text-gray-600" />
            </button>

            {/* right content section */}
            <section className="w-full  ml-1 lg:ml-5 p-4 min-h-[calc(100vh-5rem)] bg-gray-400/10 rounded-lg shadow-md ">

                <div className="w-full ml-1 md:ml-10 flex items-center gap-2">
                    <h1 className="text-gray-200 font-quicksand text-2xl font-bold">Dashboard </h1>
                    {
                        activetab && (<h2 className="text-gray-200  font-quicksand text-lg font-bold capitalize mt-1"><span className="text-xl">{"->"}</span> {activetab}</h2>)
                    }
                </div>

                <div className="w-full h-full  ">
                    {activetab === "Projects" ? <ProjectTab /> : activetab === "Insights" ? <InsightTab setActivetab={setActiveTab} /> : activetab === "Account" ? <Account /> : activetab === "Generate" && <Generate setActivetab={setActiveTab} />}
                </div>

            </section>

        </main>
    )
}

export default Dashboard;