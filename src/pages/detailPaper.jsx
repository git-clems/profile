import { Link, useParams } from "react-router-dom"
import { Download, Eye } from "lucide-react";
import "./css/details-page.scss"
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import Loading from "../components/loadingPage";
import Page404 from '../pages/404'

const DetailsPaper = () => {

    const params = useParams()
    const [paper, setPaper] = useState({})
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const querry = await getDoc(doc(db, 'paper', params.id))
                if (querry.exists()) {
                    setPaper({ id: querry.id, ...querry.data() })
                } else {
                    setPaper(null)
                    return
                }
            } catch (error) {
                return
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])


    if (loading) return <Loading></Loading>
    if (!paper) return <Page404 prev={'Go back to papers'} prevLink={"/papiers"} message={"Paper not found !"}></Page404>

    return (
        <div className="page details-page">
            <div className="flex justify- flex-wrap">
                <div className="description flex-1 min-[900px]:max-w-[70vw] min-w-[300px] duration-200">
                    <div className="name font-bold">{paper?.title}</div>
                    {paper?.authors?.map(author =>
                        <span className={`${author.firstAuth && "font-bold text-yellow-600"}`}>{author.name}<sup>{author.affiliation}</sup>; </span>
                    )}
                    <br />
                    <br />
                    <div>
                        {paper?.organization?.map((org, index) =>
                            <p className="text-center font-bold"><sup>{index + 1}</sup>{org}</p>
                        )}
                    </div>

                    <br />
                    <p className="text-justify">
                        <span className="font-bold">Abstract. </span>
                        {paper?.abstract}
                    </p>

                </div>
                <div className="m-3 flex-1">

                    <div className="text-sm text-[var(--text-2)]">
                        {paper?.journal} - {paper?.publisher}
                    </div>

                    <div className="text-sm m-1">
                        {<span className="bg-green-100 mr-2 border-3 font-bold border-green-400 rounded p-1 text-green-600"> {paper?.type} </span>}
                        <span> Published: {paper?.year}</span>
                    </div>
                    <div>
                        <span className="font-bold mr-2">Keywords:</span>
                        <div className="flex flex-wrap">
                            {paper?.keywords?.map(key =>
                                <span className="bg-blue-100 border-3 border-blue-400 m-1 p-1 text-sm text-nowrap rounded text-black">{key}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailsPaper