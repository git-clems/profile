import { Link } from "react-router-dom"

const MyButton = ({goTo, name}) => {
    return (
        <Link className="hover:bg-blue-200 bg-blue-300 text-black"
            style={{
                border: '1px solid var(--text-2)',
                borderRadius: 7,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5
            }}
            to={goTo}>
            {name}
        </Link>
    )
}

export default MyButton