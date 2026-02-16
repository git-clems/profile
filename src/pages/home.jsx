import { collection, doc, Firestore, getDoc, getFirestore } from "firebase/firestore"
import { app } from "../../firebase"
import { useState } from "react"
import "./css/home.scss"
import { user, speciality, projects } from '../data.jsx'
import { Project } from "../components/project.jsx"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
// const db = getFirestore(app)

// const user = collection(db, 'user')
// const querry = await getDoc(user)



const Home = () => {
    const [data, setData] = useState([])

    return (
        <div className="page home-page">
            <header>
                <div className="description">
                    <span style={{
                        fontSize: "5vh",
                        // fontFamily: "Orbitron",
                    }}>
                        {user.lname} {user.fname}
                    </span>
                    <p className=""
                        style={{
                            // fontFamily: "Orbitron",
                            fontSize: '3.2vh',
                            borderRadius: 8
                        }}
                    >
                        Le générateur de paragraphes IA est un outil en ligne gratuit conçu pour aider les utilisateurs à créer des paragraphes captivants, uniques et bien structurés sur n'importe quel sujet.
                    </p>
                    <div
                        className="speciality"
                        style={{
                            marginTop: '20px',
                            textWrap: 'nowrap',
                            fontSize: '3vh'
                        }}>
                        <div className="speciality-content">
                            {
                                speciality.map(e => (
                                    <span
                                        style={{
                                            backgroundColor: "purple",
                                            marginLeft: '10px',
                                            padding: '2px',
                                            borderRadius: '5px',
                                            color: 'white'
                                        }}>{e}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="profile">
                    <img src={user.images[0]} alt="" />
                </div>
            </header>

            <section
                style={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>

                    <span
                        style={{
                            fontSize: "5vh",
                            // fontFamily: "Orbitron",
                        }}>Last projects
                    </span>


                    <Link to={'projects'}
                        style={{
                            width: '200px',
                            fontSize: '30px',
                            backgroundColor: 'purple',
                            cursor: 'pointer',
                            borderRadius: '20px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            height: '40px',
                            margin: '20px',
                            color: 'white'
                        }}>
                        <span>Voir plus</span><ArrowRight />
                    </Link>
                </div>

                <div className="flex wrap justify-center"
                    style={{
                        flexWrap: 'wrap',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    {
                        projects.map(project => (<Project projecID={project.id}></Project>))
                    }
                </div>
            </section>
        </div>
    )
}

export default Home