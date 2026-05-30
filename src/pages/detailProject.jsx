import { useParams } from "react-router-dom"
import "./css/details-page.scss"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import Loading from "../components/loadingPage";
import Page404 from "./404";

const DetailsProject = () => {
    const params = useParams()
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const querry = await getDoc(doc(db, 'project', params.id))
                if (querry.exists()) {
                    setProject({ id: querry.id, ...querry.data() })
                } else {
                    setProject(null)
                    return
                }
            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) return <Loading></Loading>
    if (!project) return <Page404 prev={'Go back to projects'} prevLink={"/projects"} message={"Project not found !"}></Page404>

    return (
        <div className="page details-page">
            <div className="flex justify-center flex-wrap">
                <div className="description">
                    <h1 className="name">{project?.name}</h1>
                    <p>{project?.description}</p>
                    <div className="flex justify-between mt-5">
                        <div>
                            <div>{project?.tools && project?.tools.map(tool => (<span style={{ border: "1px solid var(--text-2)", borderRadius: 3, padding: 2, margin: 2 }}>{tool}</span>))}</div>
                            <span> Year: {project?.startDate}</span>
                            {project?.startDate !== project?.endDate && <span> - {project?.endDate}</span>}
                        </div>
                    </div>
                </div>
                <div className="m-3">
                    <img className="max-w-[30vw] min-w-[300px] w-[50vw] rounded-md border" src={project?.image} alt={project?.name} />
                </div>
            </div>
        </div >
    )
}

export default DetailsProject