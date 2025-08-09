import React from 'react'
import CodeEditor from './Code.block.jsx'

const Craft = () => {
    return (
        // <section className="relative  h-[calc(100vh-4rem)] overflow-hidden max-sm:px-5 px-16 py-10">
        <main id="generate" className="h-screen">
            <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-16 pb-8">
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


            {/* <CodeEditor/> */}

            <section className='w-fit max-md:flex max-md:justify-center md:w-3xl p-4 mx-auto border-2 z-10 border-gray-200 shadow-xl bg-gray-200/70 rounded-lg overflow-hidden'>
                <div className='flex max-md:flex-col gap-5'>
                    <CodeEditor />
                    <div className='flex max-md:gap-5 flex-col justify-around'>
                        <div className=''>
                            <h1 className='nunito-600 text-lg'>Quick Guide</h1>
                            <p className='nunito-400 text-sm text-gray-600'>get quick introduction about our schema format and data entries.</p>
                            <button className='bg-slate-700 text-white text-sm font-nunito mt-4 px-3 py-1 rounded-md'>Learn More</button>
                        </div>

                        <div>
                            <h1 className='nunito-600 text-lg'>Generate JSON</h1>
                            <p className='nunito-400 text-sm text-gray-600'>Quickly generate JSON data based on your schema.</p>
                            <button className='bg-slate-700 text-white text-sm font-nunito mt-4 px-3 py-1 rounded-md'>Generate</button>
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