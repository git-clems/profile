import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
// import { projects, publish } from "../data"
import { Link } from "react-router-dom"
import { db } from "../auth/firebase"

export const Project = ({ projectID }) => {

    const [project, setProject] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const querry = await getDoc(doc(db, 'project', projectID))
                if (querry.exists()) {
                    setProject({ id: querry.id, ...querry.data() })
                } else {
                    setProject(null)
                    return
                }
            } catch (error) {
                console.log(error);
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])


    if (loading) {
        return (
            <div class="card" aria-hidden="true" className="min-w-[23vw] max-w-[300px] h-[300px] mt-2 rounded shadow-[0_0_5px_var(--text-2)]">
                <div class="card-body">
                    <h5 class="card-title placeholder-glow">
                        <span class="placeholder col-6"></span>
                    </h5>
                    <p class="card-text placeholder-glow">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                    </p>
                    <a class="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                </div>
            </div>
        )
    }
    if (!project) return

    return (
        <Link
            className="text-[var(--text-color)] 
            hover:shadow-[0_0_15px_var(--text-2)] 
            shadow-[0_0_5px_var(--text-2)] 
            bg-[var(--box-color)] rounded overflow-hidden min-w-[23vw] max-w-[300px] m-2"
            to={`/projects/${project?.id}`}>
            <img src={project?.image} alt="" className="h-[300px] w-[100%] object-cover self-center" />
            <div className="p-2 truncate">
                {project?.name}
            </div>
            <div className="pl-2 pb-2">
                <span className="text-[var(--text-2)]">{project?.startDate} </span>
                {(project?.endDate && project?.endDate !== project?.startDate) && <span className="text-[var(--text-2)]">- {project?.endDate}</span>}
            </div>
        </Link>
    )
}