import { Link } from "react-router-dom"

const MyButton = ({ goTo, name, children }) => {
    return (
        <Link className="hover:bg-blue-200 bg-blue-300 text-black border border-[var(--text-2)] rounded text-nowrap flex justify-center items-center p-2"
            to={goTo}>
            <div className="ml-2 mr-2">
                {children}
            </div>
            {name}
        </Link>
    )
}

export default MyButton