import "./css/home.scss";
import { Project } from "../components/project.jsx";
import { Paper } from "../components/paper.jsx";
import { Link } from "react-router-dom";
import MyButton from "../components/buttton.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../auth/firebase.jsx";
import { useEffect, useState } from "react";
import Loading from "../components/loadingPage.jsx";
import { Phone } from "lucide-react";

const Home = () => {

  const [user, setUser] = useState()
  const [projects, setProjects] = useState()
  const [papers, setPapers] = useState()
  const [specialities, setSpecialities] = useState()
  const [loading, setLoading] = useState(false)

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
        <div className="description shadow-[0_0_5px_rgb(0,0,0,0.5)] bg-[var(--app-bar-bg)] ">
          <span className="user-name text-[var(--text-color)] font-bold" >{user?.lname} {user?.fname}</span>
          <p className="text-[var(--text-2)] rounded">{user?.description}</p>
          <div className="speciality-content mt-3 flex flex-wrap">
            {specialities?.map(speciality => (<span className="bg-[var(--primary-color-reverse)] ml-4 text-nowrap p-2 m-2 rounded text-[var(--box-color)]"> {speciality.name}</span>))}
          </div>
        </div>

        <div className="w-[300px] m-3">
          <img src={user?.image} alt="" className="object-cover rounded-xl" />
        </div>
      </header>

      <section className="flex flex-wrap">

        {projects?.length > 0 &&
          <div className="flex items-center flex-col mt-5">
            <span className="border-l-3 border-red-500 text-4xl mb-2 font-bold">Last projects</span>
            <Project projectID={projects[projects?.length - 1]?.id}></Project>
            <MyButton goTo={"/projects"} name={"See more projects"} />
          </div>
        }

        {
          papers?.length > 0 &&
          < div className="flex items-center flex-col ml-4 mt-5">
            <span className="border-l-3 border-red-500 text-4xl mb-2 font-bold">Last papers</span>
            <Paper paperID={papers[papers?.length - 1]?.id}></Paper>
            <MyButton name={"See more papers"} goTo={"/papiers"} />
          </div>
        }
      </section >

      <section className="mt-5 flex flex-wrap justify-center items-center bg-[var(--app-bar-bg)] pt-5 pb-5">
        <div className="mr-5 text-3xl text-center font-bold text-[var(--text-color)]">Would you like to take on some challenges together ? </div>
        <MyButton goTo={'/contact'} name={"Contactez moi ici"}> <Phone /></MyButton>
      </section>
    </div >
  );
};

export default Home;
