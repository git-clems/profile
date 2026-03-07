// import { collection, doc, Firestore, getDoc, getFirestore } from "firebase/firestore"
// import { app } from "../../firebase"
// import { useState } from "react"
import "./css/home.scss";
import { user, speciality, projects, publish } from "../data.jsx";
import { Project } from "../components/project.jsx";
import { Publication } from "../components/publication.jsx";
import { Link } from "react-router-dom";
import MyButton from "../components/buttton.jsx";
// const db = getFirestore(app)

// const user = collection(db, 'user')
// const querry = await getDoc(user)

const Home = () => {
  // const [data, setData] = useState([])

  return (
    <div className="page home-page">
      <header style={{
        paddingTop: 100,
      }}>
        <div className="description">
          <span className="user-name" style={{ color: 'var(--text-color)' }}>{user.lname} {user.fname}</span>
          <p className="text-[var(--text-2)]"
            style={{
              fontSize: '16px',
              borderRadius: 8
            }}>
            {user.description}
          </p>
          <div className="speciality-content mt-3"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              // width : '100%'
            }}>
            {
              speciality.map(e => (
                <span
                  style={{
                    backgroundColor: "var(--primary-color-reverse)",
                    // border: '1px solid var(--primary-color-reverse)',
                    marginLeft: '10px',
                    // marginRight: '10px',
                    textWrap: 'nowrap',
                    padding: '2px',
                    margin: 2,
                    borderRadius: '5px',
                    color: 'var(--box-color)'
                  }}> {e}
                </span>
              ))
            }
          </div>
        </div>
        <div className="profile">
          <img src={user.images[0]} alt="" />
        </div>
      </header>

      <section className="last-projects-publications"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          paddingTop: 80,
          // borderTop: '2px solid grey'
        }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}>
          <span style={{
            fontSize: "5vh",
            borderLeft: '3px solid red',
          }}>
            Last projects
          </span>

          <div
            className="flex wrap justify-center"
            style={{
              flexWrap: "wrap",
            }}
          >
            <Project ID={projects[projects.length - 1].id}></Project>
          </div>
          <MyButton goTo={"/projects"} name={"See more projects"} />
        </div>
        <div className="last-publications"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "5vh",
              borderLeft: "3px solid red",
            }}
          >
            Last publications
          </span>

          <Publication publishID={publish[publish.length - 1].id}></Publication>
          <MyButton name={"See more papers"} goTo={"/publications"} />
        </div>
      </section>
    </div>
  );
};

export default Home;
