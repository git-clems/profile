import { useState } from "react"
import { projects } from "../data"
import { Link } from "react-router-dom"

export const Project = ({ projecID }) => {

    const prjt = projects.find((e) => e.id === projecID)

    return (
        <div style={{
            margin: '10px',
            flex : 1,
            // minWidth : '300px'
        }}>
            <span
                style={{
                    // position: 'relative',
                    // top: '40px',
                    backgroundColor: 'purple',
                    display: 'flex',
                    marginLeft: '10px',
                    color: 'white',
                    paddingLeft: '10px',
                    borderRadius: '7px',
                    // maxWidth: '250px',
                    // textWrap: 'nowrap',
                    // textOverflow: 'ellipsis',
                    // whiteSpace: 'nowrap',
                    // overflow: 'hidden'
                    gridArea: '2/1/4/6',
                    // gridarea
                }}
            >{prjt.name}</span>
            <Link
                to={`/projects/${prjt.id}`}
            >
                <img src={prjt.images[0]} alt=""
                    className="hover:shadow-lg"
                    style={{
                        borderRadius: '20px',
                        width: '100%',
                        height: '300px',
                        width: '700px',
                        objectFit: 'cover',
                        // boxShadow : '5px 5px 10px grey',
                        transition: '.2s',
                        border : '2px solid grey'
                    }} />
            </Link>
        </div>
    )
}