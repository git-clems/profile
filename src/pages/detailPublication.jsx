import { Link, useParams } from "react-router-dom"
import { publish } from "../data";
import { Download, Eye } from "lucide-react";
import "./css/details-page.scss"

const DetailsPublication = () => {
    const params = useParams()
    const paper = publish.find(e => e.id === params.id)

    return (
        <div className="page details-page">
            <div className="flex justify-center"
                style={{
                    flexWrap: 'wrap',
                    paddingTop: 80,
                }}>
                <div className="description">
                    <h1 className="name">{paper.name}</h1>
                    <p>{paper.description}</p>
                    <div className="flex justify-between mt-5">
                        <div>
                            {paper.type && <span> {paper.type} |</span>}
                            <span> Published: {paper.year}</span>
                        </div>
                        <a className="text-[white] hover:text-[var(--text-color)] bg-[var(--primary-color)] hover:bg-[transparent]"
                            href={paper.link}
                            download={paper.link}
                            style={{
                                border: '4px solid var(--primary-color)',
                                fontSize: '2vh',
                                borderRadius: '7px',
                                display: 'flex',
                                width : "max-content",
                                justifyContent: 'center',
                                alignItems: 'center',
                                // paddingLeft: 4,
                                // paddingRight: 4,
                            }}>
                            <span style={{textWrap : "nowrap"}}>See the paper</span>
                            <Eye className="ml-4"></Eye>
                        </a>
                    </div>
                </div>
                <div style={{
                    margin: '5px'
                }}>
                    <img
                        style={{
                            maxWidth: '30vw',
                            minWidth: '300px',
                            width: '50vw',
                            borderRadius: 7,
                            border: '1px solid'
                        }}
                        src={paper.images[0]} alt={paper.name}
                    />
                </div>
            </div>
        </div >
    )
}

export default DetailsPublication