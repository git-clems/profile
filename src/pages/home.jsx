// import { collection, doc, Firestore, getDoc, getFirestore } from "firebase/firestore"
// import { app } from "../../firebase"
// import { useState } from "react"
import "./css/home.scss";
// import { user, speciality, projects, publish } from "../data.jsx";
import { Project } from "../components/project.jsx";
import { Paper } from "../components/paper.jsx";
import { Link } from "react-router-dom";
import MyButton from "../components/buttton.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase.jsx";
import { useEffect, useState } from "react";
import Loading from "../components/loadingPage.jsx";

const Home = () => {

  const [user, setUser] = useState()
  const [projects, setProjects] = useState()
  const [papers, setPapers] = useState()
  const [specialities, setSpecialities] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      try {
        const [userFetch, projectFetch, paperFetch, specialityFetch] = await Promise.all([
          getDocs(collection(db, 'user')),
          getDocs(collection(db, 'project')),
          getDocs(collection(db, 'paper')),
          getDocs(collection(db, 'speciality')),
        ])

        setUser(userFetch.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0])
        setProjects(projectFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        setPapers(paperFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        setSpecialities(specialityFetch.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      } catch (error) {
        return
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />

  if (!user || !projects || !papers || !specialities) return

  return (
    <div className="page home-page">
      <header>
        <div className="description">
          <span className="user-name" style={{ color: 'var(--text-color)' }}>{user?.lname} {user?.fname}</span>
          <p className="text-[var(--text-2)] rounded">{user?.description}</p>
          <div className="speciality-content mt-3 flex flex-wrap">
            {specialities?.map(speciality => (<span className="bg-[var(--primary-color-reverse)] ml-4 text-nowrap p-2 m-2 rounded text-[var(--box-color)]"> {speciality.name}</span>))}
          </div>
        </div>

        <div className="w-[300px] m-3">
          <img src={user?.image} alt="" className="object-cover rounded-xl" />
        </div>
      </header>

      <section className="last-projects-publications flex justify-around flex-wrap pt-4">
        <div className="flex justify-center items-center flex-col">
          <span className="border-l-3 border-red-500 text-4xl">Last projects</span>
          <Project projectID={projects[projects?.length - 1]?.id}></Project>
          <MyButton goTo={"/projects"} name={"See more projects"} />
        </div>

        <div className="last-publications">
          <span className="border-l-3 border-red-500 text-4xl">Last papers</span>
          <Paper publishID={papers[papers?.length - 1]?.id}></Paper>
          <MyButton name={"See more papers"} goTo={"/publications"} />
        </div>
      </section>
    </div>
  );
};

export default Home;
