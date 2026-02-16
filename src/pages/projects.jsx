import { Project } from "../components/project"
import { projects } from "../data"

const Projects = () => {
    return (
        <div className="page projects-page flex"
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <h1 style={{
                fontSize :30
            }}>My projects</h1>
            <div style={{
                display: 'flex'
            }}>
                {
                    projects.map(project => (
                        <Project projecID={project.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Projects