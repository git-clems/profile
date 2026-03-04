import { Copyright, Linkedin, Locate, MapPin } from "lucide-react"
import { user, web } from "../data"
import { Link } from "react-router-dom"

export const FooterBar = () => {
    return (
        <footer className='flex justify-between flex-wrap'
            style={{
                borderTop: '1px solid grey',
                padding: '15px',
                marginTop: '50px',
                backgroundColor: 'rgba(0, 0, 0, 0.09)'
            }}>
            <div className="flex"
                style={{
                    flexDirection: 'column'
                }}>
                <span className="flex items-center">
                    <Copyright strokeWidth={'1px'} height={20} width={20}></Copyright> {web.year} {user.fname} {user.lname}
                </span>
                <span className="flex mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                    <Link className="hover:underline" to={user.linkedin} target='_'>LinkedIn</Link>
                </span>
                <span className="flex mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    <Link className="hover:underline" to={user.github} target='_'>Github</Link>
                </span>
            </div>
            <div>
                <span className="flex hover:underline"><MapPin /> <Link to={user.location} target="_">{user.adress}</Link></span>
            </div>

        </footer>
    )
}