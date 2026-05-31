import { useEffect, useState } from "react"
import Loading from '../components/loadingPage'
import { getDocs, collection } from "firebase/firestore"
import { db } from '../auth/firebase'

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
            <div className="m-4">
                <div className="">
                    <img src={user?.aboutImage} alt="" className="border-4 border-sky-900 object-cover rounded-xl w-[300px] max-h-[400px] m-3 float-right" />
                    <p className="text-justify">{user?.about}</p>
                </div>

                <div className="text-4xl font-bold m-4">Education</div>
                <li className="max-w-[500px]">
                    {
                        education?.map(educ => (
                            <ul>
                                <span className="font-bold">{educ.startDate} {educ.startDate !== educ.endDate && < span className="font-bold"> - {educ.endDate}</span >} : {<span>{educ.diploma}</span>} </span>
                                <div>
                                    <span className="italic text-sky-900">{educ.school}</span> - <span className="font-bold">{educ.location}</span>
                                </div>
                                <div className="text-justify mb-2">
                                    <span className="text-sm text-[var(--text-2)]">{educ.description}</span>
                                </div>
                                <div className="flex flex-wrap">
                                    {
                                        educ?.tools.map(tool => (
                                            <span className={`${tool && "m-1 p-1 bg-blue-100 rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
                                        ))
                                    }
                                </div>
                            </ul>
                        ))
                    }
                </li>
            </div>
        </div >
    )
}

export default About