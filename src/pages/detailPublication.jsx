import { Link, useParams } from "react-router-dom"
import { publish } from "../data";
import { Download, Eye } from "lucide-react";

const DetailsPublication = () => {
    const params = useParams()
    const paper = publish.find(e => e.id === params.id)

    return (
        <div className="page details-page">
            <div className="flex justify-center"
                style={{
                    flexWrap: 'wrap',
                    paddingTop: 80
                }}>
                <div style={{
                    // flex: 1,
                    border: '1px solid grey',
                    borderRadius: 20,
                    minWidth: '500px',
                    margin: '5px',
                    padding: '10px',
                    display: 'flex'
                }}>
                    <div className="">
                        <h1 style={{ fontSize: '3vh', justifySelf: 'center' }}>{paper.name}</h1>
                        <div className="flex items-center mt-5">
                            <div>
                                {paper.type && <span> {paper.type} |</span>}
                                <span> Published: {paper.year}</span>
                            </div>
                            <a className="btn text-[white] hover:text-[var(--text-color)] bg-[var(--primary-color)] hover:bg-[transparent] ml-[2vw]"
                                // to={paper.link}
                                // target="_"
                                href={paper.link}
                                download={paper.link}
                                style={{
                                    border: '4px solid var(--primary-color)',
                                    // backgroundColor : 'var(--primary-color)',
                                    // color : 'white',
                                    fontSize: '2vh',
                                    borderRadius: '7px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 4,
                                    paddingRight: 4,
                                }}>
                                <span style={{}} >See the paper</span>
                                <Eye className="ml-4"></Eye>
                            </a>
                        </div>
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
                            borderRadius: 20,
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