import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
// import { paper } from "../data"
import { Link } from "react-router-dom"
import { db } from "../auth/firebase"

export const Paper = ({ paperID }) => {
    const [loading, setLoading] = useState(false)
    const [paper, setPaper] = useState()


    useEffect(() => {

        const fetchData = async () => {

            try {
                const querry = await getDoc(doc(db, 'paper', paperID))
                if (querry.exists()) {
                    setPaper({ id: querry.id, ...querry.data() })
                } else {
                    setPaper(null)
                    return
                }
            } catch (error) {
                return
            }
        }

        fetchData()
    }, [])



    if (!paper) return

    return (
        <Link
            className="text-[var(--text-color)] 
            hover:shadow-[0_0_15px_var(--text-2)]
            shadow-[0_0_5px_var(--text-2)] 
            bg-[var(--box-color)]
            
            "
            to={`/publications/${paper?.id}`}
            style={{
                minWidth: '300px',
                margin: 10,
                borderRadius: 10,
                maxWidth: '23vw',
            }}>
            <img src={paper?.images[0]} alt=""
                style={{
                    height: 300,
                    width: '100%',
                    objectFit: 'cover',
                    alignSelf: "center",
                    justifySelf: 'center',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                }} />
            <div className="pl-2"
                style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>{paper?.name}</div>
            <div className="mt-2">
                <span className="text-[var(--text-2)] pl-5">{paper?.type} | </span>
                <span className="text-[var(--text-2)]">{paper?.year}</span>
            </div>
        </Link >
    )
}