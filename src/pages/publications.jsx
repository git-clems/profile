import { Publication } from "../components/publication"
import { publish } from "../data"

const Publications = () => {
    return (
        <div className="page projects-page">
            <div style={{
                paddingTop: 80
            }}>

                <h1 style={{ fontSize: 30 }}>My publications</h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    // border: '2px solid grey'
                }}>
                    {publish.map(project => (<Publication publishID={project.id} />))}
                </div>
            </div>
        </div>
    )
}

export default Publications