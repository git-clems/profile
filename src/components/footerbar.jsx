import { Copyright, Linkedin, Locate, MapPin } from "lucide-react"
import { user, web } from "../data"
import { Link } from "react-router-dom"

export const FooterBar = () => {
    return (
        <footer className='flex justify-between'
            style={{
                borderTop: '1px solid grey',
                padding: '15px',
                marginTop: '50px',
                backgroundColor : 'rgba(0, 0, 0, 0.09)'
            }}>
            <div className="flex"
                style={{
                    flexDirection: 'column'
                }}>
                <span
                    style={{
                        flexWrap: 'nowrap',
                        display: 'flex'
                    }}>
                    <Copyright strokeWidth={'1px'}></Copyright> {web.year} {user.fname} {user.lname}
                </span>
                <span className="hover:underline"><Link to={user.linkedin} target='_'>LinkedIn</Link></span>
                <span className="hover:underline"><Link to={user.github} target='_'>Github</Link></span>
            </div>
            <div>
                <span className="flex hover:underline"><MapPin/> <Link to={user.location}>{user.adress}</Link></span>
            </div>
            
        </footer>
    )
}