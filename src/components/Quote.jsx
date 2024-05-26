import { useEffect, useState } from "react"
import { HOST_URL } from "../env"
import { marginsBottom } from "../structs"

export const Quote = ({data}) => {
    const [position, setPosition] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(()=>{        
        if (data.image.data!=null){
            setImageUrl(HOST_URL+data.image.data.attributes.url)
        }
    },[data])

    useEffect(()=>{
        imageUrl ? setPosition('mlauto') : setPosition('ml-quote')
    },[imageUrl])

    return(
        <figure className = {`${position} fr-quote fr-quote--column margin-quote`} style={{maxWidth: !imageUrl ? '1000px' : '840px', marginBottom: marginsBottom[data.espacement_bas]}}>
            <blockquote cite="">
            {imageUrl &&
                <div className="fr-quote__image">
                    <img src={imageUrl} className="fr-responsive-img" alt="" />
                </div>
                }
                <p>{data.citation}</p>
            </blockquote>
            <figcaption>
                <p className="fr-quote__author">{data.auteur}</p>
                <ul className="fr-quote__source">
                    <li>{data.contexte}</li>
                </ul>
            </figcaption>
       </figure>
    )
}