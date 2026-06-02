import { useEffect, useState } from "react"
import Loading from '../components/loadingPage'
import { getDocs, collection } from "firebase/firestore"
import { db } from '../auth/firebase'
import { Play } from "lucide-react"

const About = () => {
    const [user, setUser] = useState()
    const [education, setEducation] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const [userFetch, educationFetch, paperFetch, specialityFetch] = await Promise.all([
                    getDocs(collection(db, 'user')),
                    getDocs(collection(db, 'education'))
                ])

                setUser(userFetch.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0])
                setEducation(educationFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Loading></Loading>
    if (!user || !education) return

    return (
        <div className="page user-page">
            <div className="text-4xl font-bold m-4">About me</div>
            <div className="min-[900px]:m-4 max-[900px]:m-2">
                <div className="flex bg-[var(--app-bar-bg)] max-w-[900px] rounded max-[600px]:flex-wrap shadow-[0_0_25px_rgb(0,0,0,0.5)]">
                    <p className="text-justify min-w-[300px] m-3">{user?.about}</p>
                    <img src={user?.aboutImage} alt="" className="border-4 border-sky-900 object-cover rounded-xl w-[300px] max-h-[400px] m-3 " />
                </div>

                <div className="flex flex-wrap">
                    <div className="bg-[rgba(0,0,0,0.2)] m-2 flex-1 max-[600px]:pl-2 min-[600px]:pl-4 pr-4 rounded pr-5 min-w-[300px]">
                        <div className="text-4xl font-bold m-4">Education</div>
                        {
                            education?.map(educ => (
                                <div className="border-b p-2 ">
                                    <div className="flex">
                                        <Play ></Play><span className="font-bold">{educ.startDate} {educ.startDate !== educ.endDate && < span className="font-bold"> - {educ.endDate}</span >} : {<span>{educ.diploma}</span>} </span>
                                    </div>
                                    <div className="italic text-sky-900 ml-6">
                                        <span >{educ.school}</span> - <span className="font-bold">{educ.location}</span>
                                    </div>
                                    <div className="text-justify ml-6 mb-2 text-sm text-jstify text-white">
                                        {educ.description}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {
                                            educ?.tools.map(tool => (
                                                <span className={`${tool && "m-1 p-1 bg-blue-100 text-sm rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        {
                            education?.map(educ => (
                                <div className="border-b">
                                    <div className="flex">
                                        <Play ></Play><span className="font-bold">{educ.startDate} {educ.startDate !== educ.endDate && < span className="font-bold"> - {educ.endDate}</span >} : {<span>{educ.diploma}</span>} </span>
                                    </div>
                                    <div className="italic text-sky-900 ml-6">
                                        <span >{educ.school}</span> - <span className="font-bold">{educ.location}</span>
                                    </div>
                                    <div className="text-justify ml-6 mb-2 text-sm text-jstify text-white">
                                        {educ.description}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {
                                            educ?.tools.map(tool => (
                                                <span className={`${tool && "m-1 p-1 bg-blue-100 text-sm rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-[rgba(0,0,0,0.2)] m-2 flex-1 p-2 rounded pr-5 min-w-[300px]">
                        <div className="text-4xl font-bold m-4">Experiences</div>
                        {
                            education?.map(educ => (
                                <div className="">
                                    <span className="font-bold">{educ.startDate} {educ.startDate !== educ.endDate && < span className="font-bold"> - {educ.endDate}</span >} : {<span>{educ.diploma}</span>} </span>
                                    <div>
                                        <span className="italic text-sky-900">{educ.school}</span> - <span className="font-bold">{educ.location}</span>
                                    </div>
                                    <div className="text-justify mb-2 text-sm text-jstify text-white">
                                        {educ.description}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {
                                            educ?.tools.map(tool => (
                                                <span className={`${tool && "m-1 p-1 bg-blue-100 text-sm rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default About