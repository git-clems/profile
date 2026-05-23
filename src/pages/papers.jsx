import { useEffect, useState } from "react"
import { Paper } from "../components/paper"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../auth/firebase"
import Loading from "../components/loadingPage"
import Page404 from "./404"

const Papers = () => {


    const [papers, setPapers] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const querry = await getDocs(collection(db, 'paper'))
                const data = querry.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setPapers(data)

            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()

    }, [])



    if (loading) return <Loading></Loading>
    if (!papers) return null
    if (papers.length === 0) return <Page404 message={'Aucun paper enregistré'}></Page404>

    return (
        <div className="page papers-page">
            <div style={{
                paddingTop: 80
            }}>

                <h1 style={{ fontSize: 30 }}>Mes paper</h1>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    borderRadius: 10,
                    justifyContent: 'space-around',
                    // border: '2px solid grey'
                }}>
                    {papers.map(paper => (<Paper key={paper.id} paperID={paper.id} />))}
                </div>
            </div>
        </div>
    )
}

export default Papers