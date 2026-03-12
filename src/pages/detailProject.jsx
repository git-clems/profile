import { useParams } from "react-router-dom"
import { projects } from "../data";
import "./css/details-page.scss"

const DetailsProject = () => {
    const params = useParams()

    const project = projects.find(e => e.id === params.id)

    return (
        <div className="page details-page flex pt-[100px]">
            <div className="description m-5 p-2" style={{
                border: '1px solid grey',
                borderRadius: 10,
            }}>
                <h1 className="text-[30px]" style={{justifySelf: 'center' }}>{project.name}</h1>
                <p> {project.description}</p>
                {
                    project.tools &&
                    < div style={{
                        display: 'flex',
                    }}>
                        {
                            project.tools.map(tool => (
                                <div className="text-[var(--text-2)]"
                                    style={{
                                        border: '1px solid var(--text-2)',
                                        marginLeft: '5px',
                                        padding: 3,
                                        borderRadius: 5,
                                        textWrap: 'nowrap'
                                    }}
                                >{tool}</div>
                            ))
                        }
                    </div>
                }
                {
                    project.startDate &&
                    <>
                        <span>Période : {project.startDate}</span>{project.endDate > project.startDate && - project.endDate}
                    </>
                }
            </div>
            <div className="image m-5">
                <img
                    style={{
                        borderRadius: 10,
                        boxShadow: '0 0 15px grey'
                    }}
                    src={project.images[0]} alt={project.name}
                />
            </div>
        </div >
    )
}

export default DetailsProject