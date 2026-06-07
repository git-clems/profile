import React, { useState, useRef } from 'react'
import Loading from '../components/LoadingPage'
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore'
import { db } from '../auth/firebase'
import { useNavigate } from 'react-router'
import { SendHorizontal } from 'lucide-react'

const Contact = () => {
  const recapRef = useRef()

  const [contact, setContact] = useState()
  const [loading, setLoading] = useState(false)
  const [send, setSend] = useState(false)
  const [objectCheck, setObjectCheck] = useState(false)
  const [errors, setErrors] = useState({})

  const handleErrors = () => {
    const newError = {}
    if (!contact.email?.trim()) newError.email = "Entrez votre courriel"
    if (!contact.fname?.trim()) newError.fname = "Entrez votre prénom"
    if (!contact.lname?.trim()) newError.lname = "Entrez votre nom de famille"
    if (!contact.message?.trim()) newError.message = "Entrez votre message"
    if (!contact.object?.trim()) newError.message = "choisir un objet"

    setErrors(newError)

    return Object.keys(newError).length === 0
  }

  const inputHandler = (e) => {
    const { name, value } = e.target
    setContact({ ...contact, [name]: value })
  }

  const naviagate = useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault()

    if (!handleErrors()) return

    setLoading(true)

    await addDoc(collection(db, 'contact'), { ...contact, contactDate: Timestamp.fromDate(new Date()) })
      .then((res) => {
        setSend(true)
        setLoading(false)
      }).catch((res) => {
        setSend(false)
      })
  }

  const FormRecap = () => {
    return (
      <div className="page flex justify-center">
        <div className="w-full max-w-[700px] mt-5 mb-5">
          <div ref={recapRef} style={{ backgroundColor: 'white', borderColor: 'gray' }} className="w-full max-w-[700px] border overflow-hidden rounded-md">
            <div className="p-3 flex justify-between bg-blue-200 text-black">
              <div>
                <h3>Message envoyé</h3>
                <p className="mt-1 opacity-90">
                  Votre message a bien été transmis.
                </p>
              </div>
            </div>

            <div className="p-2">
              <div className="flex justify-between items-start flex-wrap gap-4 pb-4">
                <div>
                  <h4>Résumé de votre message</h4>
                  <p style={{ color: "rgba(0,0,0,0.4)" }} >Merci pour votre intérêt envers la FIBREE.</p>
                </div>
                {/* <p style={{ color: "rgba(0,0,0,0.3)" }} ><span className="font-semibold">Statut :</span> Envoyée</p> */}
              </div>

              <div className="mt-1 space-y-3">
                <div style={{ borderColor: "rgba(0,0,0,0.3)" }} className="flex justify-between border-b pb-2 gap-3">
                  <span className="font-semibold">Nom complet</span>
                  <span style={{ color: "rgba(0, 0, 0, 0.56)" }} >{contact.fname} {contact.lname.toUpperCase()}</span>
                </div>

                <div style={{ borderColor: "rgba(0,0,0,0.3)" }} className="flex justify-between border-b pb-2 gap-3">
                  <span className="font-semibold">Email</span>
                  <span style={{ color: "rgba(0, 0, 0, 0.56)" }}>{contact.email}</span>
                </div>

                <div style={{ borderColor: "rgba(0,0,0,0.3)" }} className="flex justify-between border-b pb-2 gap-3">
                  <span className="font-semibold">Téléphone</span>
                  <span style={{ color: "rgba(0, 0, 0, 0.56)" }}>{contact.tel}</span>
                </div>
              </div>

              <div className="mt-6">
                <h5 className="font-semibold mb-2">Objet</h5>
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.01)", color: 'gray' }} className="border rounded-md p-2  whitespace-pre-line">
                  {contact.object}
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-semibold mb-2">Votre message</h5>
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.01)", color: 'gray' }} className="border rounded-md p-2  whitespace-pre-line">
                  {contact.message}
                </div>
              </div>

            </div>
          </div>
          <div className="mt-6 flex justify-between">
            {/* <button
              type="button"
              onClick={downloadPDF}
              className="btn btn-secondary m-2"
            >
              Télécharger en PDF <i class="fa-solid fa-download"></i>
            </button> */}

            <button
              type="button"
              onClick={() => {
                naviagate('/')
              }}
              className="btn btn-primary m-2"
            >
              Revenir à l'accueil
            </button>
          </div>
        </div>
      </div>
    )
  }


  if (send) { return <FormRecap></FormRecap> }

  if (loading) { return <Loading></Loading> }

  return (
    <div className="page flex justify-center">
      <div className="max-w-[800px] mb-5 mt-5">
        <h5 className="ml-3 mr-3">Would you like to contact me?</h5>

        <p className='ml-3 mb-3 text-[var(--text-2)]'>Fields marked with <span className="text-red-500"> * </span> are required.</p>
        <form action="" className='min-[800px]:border-3 bg-[var(--app-bar-bg)] border-gray-300 rounded-md min-[600px]:p-4 max-[600px]:p-2 pt-0' onSubmit={HandleSubmit}>
          <div className="flex mb-3 justify-between flex-wrap">
            <div className="min-w-[300px] m-1 mt-3 flex-1">
              <div className='flex justify-between'>
                <label htmlFor="" className="form-label">Last name <span className='text-red-500'> * </span>  </label>
                {errors?.lname && (<span className='text-red-500'>{errors?.lname}</span>)}
              </div>
              <input type="text" onChange={inputHandler} className="form-control" placeholder='THOMSON' name='lname' id="nom" />
            </div>

            <div className="min-w-[300px] m-1 mt-3 flex-1">
              <div className='flex justify-between'>
                <label htmlFor="" className="form-label">First name <span className='text-red-500'> * </span>  </label>
                {errors?.fname && (<span className='text-red-500'>{errors?.fname}</span>)}
              </div>
              <input type="text" onChange={inputHandler} className="form-control" placeholder="Karl" name='fname' id="prenom" />
            </div>
          </div>

          <div className="flex mb-3 justify-between flex-wrap">
            <div className="min-w-[300px] m-1 mt-3 flex-1">
              <div className='flex justify-between'>
                <label htmlFor="" className="form-label">Email <span className='text-red-500'> * </span>  </label>
                {errors?.email && (<span className='text-red-500'>{errors?.email}</span>)}
              </div>
              <input type="email" onChange={inputHandler} className={`form-control`} id="email" name='email' placeholder="exemple@gmail.com" />
            </div>

            <div className="min-w-[300px] m-1 mt-3 flex-1">
              <label htmlFor="" className="form-label">Tel</label>
              <input type="tel" onChange={inputHandler} className="form-control" id="telephone" name='tel' placeholder="+123 11 22 33 44" />
            </div>
          </div>

          <div className="min-w-[300px] m-1 mt-3 flex-1">
            <div className='flex justify-between'>
              <label htmlFor="" className="form-label">Object <span className='text-red-500'> * </span>  </label>
              {errors?.object && (<span className='text-red-500'>{errors?.object}</span>)}
            </div>
            {
              !objectCheck ?
                <select class="form-select" autocomplete="object" id="object" onChange={inputHandler} name="object">
                  <option value="">Select an objcet</option>
                  <option value="Partenariat">Partenerrship</option>
                  <option value="Offre de poste">Offer a job</option>
                </select> :
                <input type="text" onChange={inputHandler} className="form-control" id="object" name='object' placeholder="Inser your object her" />
            }
            <div className="flex m-1 mt-3 items-start">
              <input className="form-check-input mt-1" type="checkbox" id="checkDefault" onChange={() => setObjectCheck(!objectCheck)} />
              <label className="form-check-label ml-2 mr-2" htmlFor="" >Customize an object</label>
            </div>
          </div>

          <div className="min-w-[300px] m-1 mt-3 flex-1">
            <label htmlFor="" className="form-label">Message <span className='text-red-500'> * </span>  </label>
            <textarea onChange={inputHandler} className="form-control" id="message" name='message' rows="10" placeholder='Insert your message here' ></textarea>
          </div>

          <div className='flex justify-center items-center m-1 mt-3'>
            <button type="submit" class="w-30 h-12 p-2 rounded bg-blue-500 text-white" >
              {
                send ?
                  <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div> :
                  "Envoyer"
              }
              <SendHorizontal />
              {/* <i className={`${send ? "hidden" : "ml-2 fa-solid fa-paper-plane"}`}></i> */}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact