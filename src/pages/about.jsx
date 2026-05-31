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
                const userQuerry = await getDocs(collection(db, "user"))
                const eductionQuerry = await getDocs(collection(db, "education"))

                const userData = userQuerry.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const educationData = userQuerry.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                if (education || userData) {
                    setUser(userData)
                    setEducation(educationData)
                } else {
                    setUser(null)
                    setEducation(null)
                }

            } catch (error) {
                setUser(null)
                setEducation(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData
    }, [])
    console.log(user);

    if (loading) return <Loading></Loading>
    if (!user || !education) return



    return (
        <div className="page user-page">
            <div className="text-4xl font-bold m-4">User me</div>
            <div>
                <p className="float">
                    {user?.about}
                    <img src={user?.aboutImage} alt="" className="object-cover rounded-xl w-[300px] m-3" />
                </p>
            </div>
        </div>
    )
}

export default About