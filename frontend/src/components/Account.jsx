import { useAuth } from '../context/context.jsx'

const Account = () => {
    const { user: auth, projects } = useAuth();

    return (
        <div className="ml-1 md:ml-10 mt-12 flex flex-col gap-6 text-white">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <section className="flex items-start justify-center h-full gap-5">
                {/* image left side  */}
                {/* <div className='w-48 h-48 border-4 border-gray-600 rounded-full overflow-hidden mb-4'>
                    <img src={auth.picture} alt={auth.username} className='w-full h-full object-cover' />
                </div> */}
                <div className="rounded-full p-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500">
                    <div className="w-48 h-48 flex items-center justify-center overflow-hidden rounded-full bg-gray-200">
                        <img src={auth?.picture || "https://tse2.mm.bing.net/th/id/OIP.MNYMRopweKA9axhd73z_GwHaE8?pid=Api&P=0&h=180"} alt="" className='w-full h-full object-cover' />
                    </div>
                </div>

                {/* right information */}
                <section className="flex pointer-events-none flex-col gap-4 bg-gray-300/10 p-4 rounded-lg text-white">
                    <div className='mb-1'>
                        <h2 className="text-xl font-nunito font-semibold mb-2">Account Information</h2>
                        <div className='ml-5 font-inconsolata'>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Email: {auth.email}</p>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Username: {auth.username}</p>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Account Created: {new Date(auth.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className=''>
                        <h2 className="text-xl font-nunito font-semibold mb-2">Account Details</h2>
                        <div className='ml-5 font-inconsolata'>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Ai limit: {auth.aiLimit||"_"}/5</p>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Custom limit: {auth.customLimit||"_"}/10</p>
                            <p className='text-md p-2 bg-gray-600 rounded-lg mb-2'>Total projects: {projects.length ||"_"}/15</p>
                        </div>
                    </div>
                </section>
            </section>

            <p className="mt-4 text-sm text-gray-300 font-inconsolata w-fit bg-gray-700 rounded-lg p-3 max-w-7xl">
                <span className='font-bold'>Please note</span>: The total project count does not represent your quota limit. If you generate multiple JSON files within the same project, your project count will remain lower, but your generation quotas—such as custom limit and AI limit—will still decrease. If you have any questions, feel free to reach out. We're here to help!
            </p>
        </div>
    )
}


export default Account