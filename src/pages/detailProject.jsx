import { useParams } from "react-router-dom"
import { projects } from "../data";

const DetailsProject = () => {
    const params = useParams()

    const project = projects.find(e => e.id === params.id)

    return (
        <div className="page details-page">
            <div className="flex"
                style={{
                    flexWrap: 'wrap',
                    paddingTop: 80
                }}>
                <div style={{
                    flex: 1,
                    border: '1px solid grey',
                    borderRadius: 10,
                    minWidth: '500px',
                    margin: '5px',
                }}>
                    <h1 style={{ fontSize: '30px', justifySelf: 'center' }}>{project.name}</h1>
                    <p style={{
                        textAlign: 'center'
                    }}> Le générateur de paragraphes IA est un outil en ligne gratuit conçu pour aider les utilisateurs à créer des paragraphes captivants, uniques et bien structurés sur n'importe quel sujet.</p>
                    {
                        project.tools &&
                        < div style={{
                            display: 'flex',
                        }}>
                            {
                                project.tools.map(tool => (
                                    <div
                                        style={{
                                            border: '1px solid grey',
                                            marginLeft: '5px',
                                            padding: 3,
                                            borderRadius: 5
                                        }}
                                    >{tool}</div>
                                ))
                            }
                        </div>
                    }
                    {
                        project.startDate &&
                        <>
                            <span>Période : {project.startDate}</span>{
                                project.endDate > project.startDate &&
                                - project.endDate
                            }
                        </>
                    }
                </div>
                <div style={{
                    flex: 1,
                    // border: '1px solid green',
                    margin: '5px'

                }}>
                    <img
                        style={{
                            maxWidth: '50vw',
                            minWidth: '500px',
                            width: '50vw',
                            borderRadius: 10,
                            border : '1px solid'
                        }}
                        src={project.images[0]} alt={project.name}
                    />
                </div>
            </div>
        </div >
    )
}

export default DetailsProject