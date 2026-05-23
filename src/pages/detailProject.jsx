import { useParams } from "react-router-dom"
// import { projects } from "../data";
import "./css/details-page.scss"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import Loading from "../components/loadingPage";

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

    if(loading) return <Loading></Loading>
    if(!project) return

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
                <div style={{
                    margin: '5px'
                }}>
                    <img
                        style={{
                            maxWidth: '30vw',
                            minWidth: '300px',
                            width: '50vw',
                            borderRadius: 7,
                            border: '1px solid'
                        }}
                        src={project?.image} alt={project?.name}
                    />
                </div>
            </div>
        </div >
    )
}

export default DetailsProject