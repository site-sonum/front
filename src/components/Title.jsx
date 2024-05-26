import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {position} from "../structs.js"
import { marginsBottom } from "../structs"

export const Title =({data}) => {
    return (
        <>
            <div className={`title-anti-enlarge fr-enlarge-link ${position[data.position] == 'left' || position[data.position] == 'right' ? `${position[data.position]}` : 'center'}`}
                style={{marginTop:'16px', marginBottom: marginsBottom[data.espacement_bas]}}>
                {data.taille=='h1' && <h1>{data.titre}</h1>}
                {data.taille=='h2' && <h2>{data.titre}</h2>}
                {data.taille=='h3' && <h3>{data.titre}</h3>}
                {data.taille=='h4' && <h4>{data.titre}</h4>}
                {data.taille=='h5' && <h5>{data.titre}</h5>}
                {data.taille=='h6' && <h6>{data.titre}</h6>}

                {data.position == 'Gauche' && data.page_cible != null &&
                <Link
                    to={data.page_cible}
                    style={{marginRight: '24px'}}
                    className={`fr-link fr-link--sm hover-title-link title-link`}
                    target={data.page_cible && data.page_cible.includes('https://') ? '_blank' : null}
                >
                <span style={{display: 'flex', alignItems: 'center'}}>
                    {data.titre_du_lien}
                    <svg
                        style={{width: '20px', marginLeft: '4px'}}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="svg-icon"
                    >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" fill='rgb(0, 0, 145)'></path>
                    </svg>
                </span>
                </Link>
                }
            </div>
        </>
    )
}