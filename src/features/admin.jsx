import { useEffect, useMemo, useRef, useState } from 'react'
import LayoutAdmin from '../components/layoutAdmin'
import { collection, doc, getDoc, getDocs, onSnapshot, Timestamp } from 'firebase/firestore'
import { db } from '../auth/firebase'
// import Loading from '../components/LoadingPage'
// import { useAuth } from '../auth/AuthContext'
import Loading from './../components/loadingPage'



export const MyDateFormat = (timestamp) => {
    if (!timestamp) return ""

    const date = timestamp.toDate()
    const now = new Date()

    const diffMs = now - date
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    const isSameDay =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()

    const isYesterday = diffDays === 1

    if (isSameDay) {
        return `Aujourd'hui à ${date.toLocaleTimeString('fr-FR', {
            hour: "2-digit",
            minute: "2-digit"
        })}`
    }

    if (isYesterday || diffDays === 0) {
        return `Hier à ${date.toLocaleTimeString('fr-FR', {
            hour: "2-digit",
            minute: "2-digit"
        })}`
    }

    if (diffDays < 0) {
        if (diffDays == -1) return `Demain à ${date.toLocaleTimeString('fr-FR', {
            hour: "2-digit",
            minute: "2-digit"
        })}`
        if (diffDays >= -6) return `Dans ${-diffDays} jours`
        if (diffDays === -7) return `Dans une semaine`
        if (diffDays <= -8)
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: "2-digit",
                minute: "2-digit"
            })
    }

    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`

    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}


const Admin = () => {
    const [search, setSearch] = useState('')
    const [messageNotOpend, setMessageNotOpend] = useState()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        const fectData = async () => {
            try {
                const snap = await getDocs(collection(db, "user"))
                const data = snap.docs.map(doc => ({
                    _id: doc.id,
                    ...doc.data()
                }))

                setUser(data[0])
                
            } catch (error) {
                return
                console.log(error);
                
            }
        }
        
        fectData()
    }, [])
    


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'contact'), (snap) => {
            const data = snap.docs.map((e) => ({
                _id: e.id,
                ...e.data()
            }))

            const dataFiltered = data.filter((e) => (!e.opened && !e.removed))
            const newCount = dataFiltered.length
        })

        return () => unsubscribe()
    }, [])




    const blocks = [
        { link: '/admin/messagerie', name: 'Messageries', bg_color: "rgb(164, 199, 246)", badge: messageNotOpend },
        { link: '/admin/a-propos', name: 'A propos', bg_color: "rgba(40, 152, 217, 0.76)", text_color: 'white' },
        { link: '/admin/projet', name: 'Projets', bg_color: "rgba(182, 217, 40, 0.76)" },
        { link: '/admin/publications', name: 'Publications', bg_color: "rgba(171, 0, 0, 0.38)", text_color: 'white' },
    ]

    const normalizedSearch = search.trim().toLowerCase()

    const filteredBlocks = useMemo(() => {
        if (!normalizedSearch) return blocks

        return [...blocks]
            .filter((block) =>
                block.name.toLowerCase().includes(normalizedSearch)
            )
            .sort((a, b) => {
                const aStarts = a.name.toLowerCase().startsWith(normalizedSearch)
                const bStarts = b.name.toLowerCase().startsWith(normalizedSearch)

                if (aStarts && !bStarts) return -1
                if (!aStarts && bStarts) return 1

                return a.name.localeCompare(b.name)
            })
    }, [search, blocks])


    if (loading) return <Loading></Loading>

    return (
        <div className="page">
            <form className="flex flex-wrap max-w-[1000px] items-center justify-center max-[800px]:m-2 min-[800px]:m-5" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-1 border-2 border-gray-300 rounded-full focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 focus-within:border-white duration-50">
                    <input type="search" placeholder="Rechercher un bloc" value={search} onChange={(e) => setSearch(e.target.value)} className=" border-l-none outline-none rounded-l-full h-[40px] pl-2 flex-1" />
                    <div className="text-gray-400 pr-5 pl-5 border-gray-300 flex justify-center items-center"><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
            </form>

            <div className='text-xl m-3 bg-blue-200 rounded p-2 flex justify-between items-center  border-3 border-blue-400'>
                <div className='flex'>
                    {
                        !user?.image
                            ? <i class="fa-solid fa-circle-user fa-2xl text-blue-500"></i>
                            : <img src={user?.image} alt="" className='h-15 w-15 object-cover rounded-full border-3 border-blue-400' />
                    }
                    <div className='ml-2'>
                        <span className='font-bold text-gray-600'>{user?.lname?.toUpperCase()} {user?.fname}</span> <br />
                    </div>
                </div>
                <button className='btn btn-danger' >
                    <i class="fa-solid fa-power-off"></i>
                </button>
            </div>
            <div className="flex flex-wrap max-[800px]:justify-center">
                {
                    filteredBlocks.length > 0
                        ? filteredBlocks.map((block) => (
                            <LayoutAdmin
                                key={block.link}
                                link={block.link}
                                name={block.name}
                                bg_color={block.bg_color}
                                text_color={block.text_color}
                                badge={block.badge}
                            />))
                        : <p className="m-5 text-gray-500">Aucun bloc trouvé.</p>}
            </div>
        </div>
    )
}

export default Admin