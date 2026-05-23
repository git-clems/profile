import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AddManager from '../Controllers/manager/addManager'
import UpdateManager from '../Controllers/manager/updateManager'
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../auth/firebase'
import Loading from '../components/LoadingPage'
import Page404 from '../pages/404'
import { useAuth } from '../auth/AuthContext'
import { deleteUser } from 'firebase/auth'


const AdminManagers = () => {
    const [managers, setManagers] = useState()
    const [me, setMe] = useState(null)
    const [loading, setLoading] = useState(true)

    const { user } = useAuth()

    useEffect(() => {
        const fetchData = onSnapshot(collection(db, 'manager'), snap => {
            const data = snap.docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            })).filter(e => !e.removed)

            setManagers(data)
            setMe(data.find(e => e.email === user.email))

            setLoading(false)
        })

        return () => fetchData()
    }, [])

    const deleteManager = async (managerId) => {
        try {
            await updateDoc(doc(db, 'manager', managerId), { removed: true })
            await deleteUser(user)
        } catch (error) {
            console.log(error.message);
        }
    }

    const toggleDisplay = async (managerId, currentValue) => {
        try {
            const updatedValue = !currentValue;
            await updateDoc(doc(db, 'manager', managerId), {
                displayed: updatedValue,
            });

        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <Loading></Loading>

    return (
        <div className='page'>
            <AddManager></AddManager>
            <div className='flex flex-wrap'>
                {
                    !managers?.length ?
                        <div className='flex justify-center items-center w-full h-[80vh]'>Aucun manager</div> :
                        managers.map(manager => (
                            <div key={manager._id} className='shadow-[0_0_5px_rgba(0,0,0,0.2)] border bg-white duration-100 m-1 rounded w-[300px] max-[600px]:w-full flex flex-col'>
                                <img src={manager.image || "/bg/photo-bg.jpg"} onError={(e) => e.target.src = "/bg/photo-bg.jpg"} alt="" className="h-[200px] object-cover rounded-t-md" />
                                <div className='flex justify-between items-center border-t border-gray-300 p-2'>
                                    <button className='btn btn-danger' onClick={(e) => {
                                        deleteManager(manager._id)
                                    }}><i className='fa-solid fa-trash'></i>
                                    </button>

                                    <div className="form-check form-switch">
                                        <input className="form-check-input cursor-pointer" type="checkbox" role="switch" id="switchCheckDefault" onChange={() => {
                                            toggleDisplay(manager._id, manager.displayed)
                                        }} checked={manager.displayed} />
                                    </div>

                                    <UpdateManager managerId={manager._id} />

                                </div>
                                <div className='m-1 mt-0 text-center line-clamp-2 font-bold'>{manager?.fname} {manager.lname?.toUpperCase()} {me?.email === manager.email && "(Moi)"}</div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default AdminManagers