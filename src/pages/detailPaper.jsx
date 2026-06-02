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
    const [paper, setPaper] = useState()
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
            <div className="flex justify-center flex-wrap">
                <div className="description min-w-[300px]">
                    <div className="name font-bold">{paper?.title}</div>
                    {paper?.authors?.map(author =>
                        <span className={`${author.firstAuth && "font-bold text-[var(--primary-color-reverse)]"}`}>{author.name}; </span>
                    )}
                    <div className="text-sm text-[var(--text-2)]">
                        {paper?.journal} - {paper?.publisher}
                    </div>
                    <div className="text-xs m-1">
                        {<span className="bg-blue-100 mr-2 rounded p-1"> {paper?.type} </span>}
                        <span> Published: {paper?.year}</span>
                    </div>
                    <br />
                    <p className="text-justify">
                        <span className="font-bold">Abstract. </span>
                        {paper?.abstract}
                    </p>

                    <span className="font-bold mr-2">Keywords:</span>
                    <div className="flex flex-wrap">
                        {paper?.keywords?.map(key =>
                            <span className="bg-blue-100 m-1 p-1 text-nowrap rounded text-black">{key}</span>
                        )}
                    </div>
                </div>
                <div className="m-3 flex flex-wrap justify-between flex-1">
                    <a className="bg-blue-300 hover:bg-blue-200 flex p-2 rounded text-black h-[max-content] cursor-pointer"
                        href={paper?.link}
                        download={paper?.link}
                    >
                        <span style={{ textWrap: "nowrap" }}>See the paper</span>
                        <Eye className="ml-4"></Eye>
                    </a>
                </div>
            </div>
        </div >
    )
}

export default DetailsPaper