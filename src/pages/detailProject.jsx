import { useParams } from "react-router-dom"
import { projects } from "../data";
import "./css/details-page.scss"

const DetailsProject = () => {
    const params = useParams()

    const project = projects.find(e => e.id === params.id)

    return (
        <div className="page details-page">
            <div className="flex justify-center"
                style={{
                    flexWrap: 'wrap',
                    paddingTop: 80,
                }}>
                <div className="description">
                    <h1 className="name">{project.name}</h1>
                    <p>{project.description}</p>
                    <div className="flex justify-between mt-5">
                        <div>
                            <div>{project.tools && project.tools.map(tool => (<span style={{ border: "1px solid var(--text-2)", borderRadius: 3, padding: 2, margin: 2 }}>{tool}</span>))}</div>
                            <span> Period: {project.startDate}</span>
                            {project.startDate !== project.endDate && <span> - {project.endDate}</span>}
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
                        src={project.images[0]} alt={project.name}
                    />
                </div>
            </div>
        </div >
    )
}

export default DetailsProject