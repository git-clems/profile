import { useEffect, useState } from "react"
import { Project } from "../components/project"
// import { projects } from "../data"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../auth/firebase"
import Loading from "../components/loadingPage"
import Page404 from "./404"

const Projects = () => {
    const [projects, setProjects] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const querry = await getDocs(collection(db, 'project'))
                const data = querry.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setProjects(data)
                
            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [])



    if (loading) return <Loading></Loading>
    if (!projects) return null
    if(projects.length === 0) return <Page404 message={'No project to display here'}></Page404>

    return (
        <div className="page projects-page" >
            <div>
                <div className="text-4xl font-bold m-4">My projects</div>
                <div className="flex flex-wrap">
                    {projects.map(project => (<Project key={project?.id} projectID={project.id} />))}
                </div>
            </div>
        </div>
    )
}

export default Projects