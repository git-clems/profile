import React, { useState } from 'react'
import { signInWithEmailAndPassword, signInAnonymously, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../auth/firebase'
import { useNavigate } from 'react-router'
import Loading from '../components/LoadingPage'


const LoginAdmin = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")
    const [loaging, setLoading] = useState(false)

    const handleUser = (e) => {
        const { name, value } = e.target
        setUser(prev => ({ ...prev, [name]: value }))
    }

    const LoginWithEmailPassword = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const credential = await signInWithEmailAndPassword(auth, user.email, user.password)
            if (credential) {
                navigate('/admin')
            } else {
                setLoading(false)
                return
            }
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setMessage("Utilisateur introuvable")
            }
            if (error.code === 'auth/wrong-password') {
                setMessage('Mot de passe incorrect')
            }
            if (error.code === 'auth/invalid-credential') {
                setMessage("Identifiants incorrects")
            }
            if (error.code === 'auth/user-disabled') {
                setMessage("Vous n'êtes pas autorisé à accéder à ce contenu. Veuillez contacez l'administrateur de la page.")
            }
            
        } finally {
            setLoading(false)
        }
    }

    if (loaging) {
        return <Loading></Loading>
    }

    return (
        <div className='page flex justify-center items-center p-2'>
            <div className='max-w-[700px] w-100 max-[400px]:min-w-full bg-gray-100 shadow-[0_0_5px_rgba(0,0,0,0.5)] rounded'>
                <form className='p-3' onSubmit={LoginWithEmailPassword}>
                    <div className='text-xl border-b border-gray-300 w-full mb-5'>Connectez vous en tant que gestionnaire</div>
                    <div class="mb-3">
                        <label for="" class="form-label">Adresse email</label>
                        <input type="email" onChange={handleUser} name='email' placeholder='exemple@gmail.com' required class="form-control" id="" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Mot de pass</label>
                        <input type="password" onChange={handleUser} name='password' class="form-control" id="" placeholder='*********' required />
                    </div>
                    <button type="submit" class="btn btn-primary">Connexion</button>
                </form>
                <div className='text-red-500 p-2 text-center'>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default LoginAdmin