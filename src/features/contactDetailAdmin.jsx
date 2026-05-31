import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../auth/firebase";
import Loading from "../components/LoadingPage";
import Page404 from "../pages/404";
import { MyDateFormat } from "./admin";


const ContactDetailAdmin = () => {
    const [contact, setContact] = useState(true);
    const { id } = useParams();
    const recapRef = useRef()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const docSanp = await getDoc(doc(db, 'contact', id))
                if (docSanp.exists()) {
                    setContact({ _id: docSanp.id, ...docSanp.data() } || null);
                } else {
                    setContact(null)
                }
            } catch (error) {
                setContact(null)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <Loading />
    if (!contact) return <Page404 message={'Message non retrouvé'} prev={"Revenir aux messageries"} prevLink={'/admin/messagerie'} />


    return (
        <div className="page flex justify-center">
            <div className="w-full max-w-[700px] m-2">

                <div ref={recapRef} className="border overflow-hidden mt-5 mb-5 rounded-md">
                    <div className="bg-blue-300 text-black p-2 flex justify-between">
                        <div>
                            <h5>{contact.object}</h5>
                            <span>Expéditeur : {contact.fname} {contact.lname?.toUpperCase()} {`<${contact.email}>`}</span> <br />
                            <span>Date : {MyDateFormat(contact.contactDate)}</span>
                        </div>
                    </div>

                    <div className="p-2">

                        <div className="mt-1 space-y-3">
                            {
                                contact?.tel &&
                                <div style={{ borderColor: "rgba(0,0,0,0.3)" }} className="flex justify-between border-b pb-2 gap-3">
                                    <span className="font-semibold">Tél</span>
                                    <span>{contact.tel}</span>
                                </div>
                            }
                        </div>

                        <div className="mt-6">
                            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }} className="border text-[var(--text-2)] rounded-md p-2  whitespace-pre-line">
                                <span className="text-1">{contact.message}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button
                        type="button"
                        onClick={() => {
                            setContact(null)
                        }}
                        className="btn btn-primary">
                        Répondre
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactDetailAdmin;