import { useEffect, useState } from "react"
import Loading from '../components/loadingPage'
import { getDocs, collection } from "firebase/firestore"
import { db } from '../auth/firebase'
import { Play } from "lucide-react"

const About = () => {
    const [user, setUser] = useState()
    const [education, setEducation] = useState()
    const [experiences, setExperiences] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const [userFetch, educationFetch, experienceFetch] = await Promise.all([
                    getDocs(collection(db, 'user')),
                    getDocs(collection(db, 'education')),
                    getDocs(collection(db, 'experience')),
                ])

                setUser(userFetch.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0])
                setEducation(educationFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                setExperiences(experienceFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))

            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Loading></Loading>
    if (!user || !education || !experiences) return

    return (
        <div className="page user-page">
            <div className="text-4xl font-bold m-4">About me</div>
            <div className="min-[900px]:m-4 max-[900px]:m-2">
                <div className="flex bg-[var(--app-bar-bg)] max-w-[900px rounded max-[600px]:flex-wrap shadow-[0_0_4px_var(--primary-color-reverse)]">
                    <div className="min-w-[300px] m-3">
                        {user.about.split('\n').map(paragraph => (
                            <p className="first-letter:ml-2">{paragraph}</p>
                        ))}
                    </div>
                    <img src={user?.aboutImage} alt="" className="border-4 border-sky-900 object-cover rounded-xl w-[300px] max-h-[400px] m-3 " />
                </div>

                <div className="flex flex-wrap">
                    <div className="border-4 border-sky-200 mt-4 m-2 max-h-[max-content] flex-1 max-[600px]:pl-1 min-[600px]:pl-4 pr-4 rounded pr-5 min-w-[300px]">
                        <div className="text-4xl font-bold mt-2">Education</div>
                        {
                            education?.map(educ => (
                                <div className="border-b p-2 ">
                                    <div className="flex">
                                        <Play ></Play>
                                        {
                                            !educ.endDate
                                                ? <span className="font-bold ml-2">Since {educ.startDate}: </span>
                                                : <span className="font-bold ml-2"> {educ.startDate} {educ.startDate !== educ.endDate && ` - ${educ.endDate}`}: {educ.diploma}</span>
                                        }
                                        {/* <span className="font-bold ml-2">{educ.startDate} {educ.startDate !== educ.endDate && < span className="font-bold"> - {educ.endDate}</span >} : {<span>{educ.diploma}</span>} </span> */}
                                    </div>
                                    <div className="italic text-yellow-600 ml-6 font-bold">
                                        <span >{educ.school}</span> - <span className="">{educ.location}</span>
                                    </div>
                                    <div className="ml-6 mb-2 text-sm text- text-[var(--text-2)]">
                                        {educ.description}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {
                                            educ?.tools?.map(tool => (
                                                <span className={`${tool && "m-1 pl-1 pr-1 font-bold bg-blue-100 text-sm rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="border-4 border-sky-200 mt-4 m-2 flex-2 max-[600px]:pl-2 min-[600px]:pl-4 pr-4 rounded pr-5 min-w-[300px]">
                        <div className="text-4xl font-bold mt-2">Experiences</div>
                        {
                            experiences?.map(experience => (
                                <div className="border-b p-2 ">
                                    <div className="flex items-center">
                                        <img src={experience.logo} alt="" className="w-10 bg-[var(--primary-color-reverse)] h-10 rounded border-sky-200" />
                                        <div className="font-bold ml-2">
                                            {
                                                !experience.endDate ?
                                                    `Since ${experience.startDate}: : ${experience.title}`
                                                    : `${experience.startDate} ${experience.startDate !== experience.endDate && ` - ${experience.endDate}`}: ${experience.title}`
                                            }
                                            <div>
                                                <span className="italic text-yellow-600 font-bold">{experience.organization} ** {experience.location && ` ${experience.location}`}</span>
                                                <span className="m-1 pl-1 pr-1 font-bold bg-green-100 text-sm rounded text-green-700 border-green-400 border-3">{experience.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-justify ml-6 mb-2 text-sm text-jstify text-[var(--text-2)]">
                                        {experience.subject && experience.subject}
                                    </div>

                                    {experience.team &&
                                        <div className="flex flex-wrap">
                                            {

                                                experience?.team.map(member => (
                                                    <div className="flex flex-col justify-center items-center">
                                                        {
                                                            member.image
                                                                ? <img src={member.image} alt="" className="max-w-21 rounded-full border-4 border-[var(--primary-color-reverse)]" />
                                                                : <img src={'src/assets/bg/collab.png'} alt="" className="max-w-21 object-cover rounded-full" />
                                                        }
                                                        <span className="bg-blue-100 m-1 p-1 text-nowrap text-xs rounded text-black">{member.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                    <div>
                                        {experience?.description?.split('\n').map(paragraph =>
                                            <p className="first-letter:ml-3 text-justify text-sm">{paragraph}</p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap">
                                        {
                                            experience?.tools?.map(tool => (
                                                <span className={`${tool && "m-1 pl-1 pr-1 font-bold bg-blue-100 text-sm rounded text-blue-700 border-blue-400 border-3"}`}>{tool}</span>
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