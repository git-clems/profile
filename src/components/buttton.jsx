import { Link } from "react-router-dom"

const MyButton = ({goTo, name}) => {
    return (
        <Link className="hover:bg-[var(--primary-color-reverse)] hover:text-[var(--box-color)]"
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