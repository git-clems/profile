import { useState } from "react"
import { publish } from "../data"
import { Link } from "react-router-dom"

export const Publication = ({ publishID }) => {

    const prjt = publish.find((e) => e.id === publishID)

    return (
        <Link
            className="text-[var(--text-color)] 
            hover:shadow-[0_0_15px_var(--text-2)]
            shadow-[0_0_5px_var(--text-2)] 
            bg-[var(--box-color)]
            
            "
            to={`/publications/${prjt.id}`}
            style={{
                minWidth: '300px',
                margin: 10,
                borderRadius: 10,
                maxWidth: '23vw',
            }}>
            <img src={prjt.images[0]} alt=""
                style={{
                    height: 300,
                    width: '100%',
                    objectFit: 'cover',
                    alignSelf: "center",
                    justifySelf: 'center',
                    borderTopLeftRadius : '10px',
                    borderTopRightRadius : '10px'
                }} />
            <div className="pl-2"
                style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                }}>{prjt.name}</div>
            <div className="mt-2">
                <span className="text-[var(--text-2)] pl-5">{prjt.type} | </span>
                <span className="text-[var(--text-2)]">{prjt.year}</span>
            </div>
        </Link >
    )
}