import { Project } from "../components/project"
import { projects } from "../data"

const Projects = () => {
    return (
        <div className="page projects-page" >
            <div style={{ paddingTop: 80 }}>

                <h1 style={{
                    fontSize: 30
                }}>My projects</h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent :'space-evenly'
                }}>
                    {
                        projects.map(project => (
                            <Project ID={project.id} />
                        ))
                    }
                    {
                        projects.map(project => (
                            <Project ID={project.id} />
                        ))
                    }
                    {
                        projects.map(project => (
                            <Project ID={project.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects