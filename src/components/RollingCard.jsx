import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import ReactMarkDown from "react-markdown"
import { marginsBottom } from "../structs"

export const RollingCard = ({data}) =>{

    const toggleCollapse = (e) =>{
        if (!e.target.classList.contains("fr-btn")){
            if (e.currentTarget.classList.contains("closed")){
                //OUVERTURE//
                e.currentTarget.getElementsByTagName("svg")[0].classList.remove("rollingcard-arrow-close")
                e.currentTarget.classList.remove("closed")
                e.currentTarget.getElementsByTagName("svg")[0].classList.add("rollingcard-arrow-open")
                e.currentTarget.classList.add("opened")
                if (e.currentTarget.querySelector(".rollingcard-content").classList.contains("hidden")){
                    e.currentTarget.querySelector(".rollingcard-content").classList.remove("hidden")
                }
                e.currentTarget.querySelector(".rollingcard-content").classList.remove("rollingcard-content-close")
                e.currentTarget.querySelector(".rollingcard-content").classList.add("rollingcard-content-open")
            } else if (e.currentTarget.classList.contains("opened")){
                //FERMETURE//
                e.currentTarget.getElementsByTagName("svg")[0].classList.remove("rollingcard-arrow-open")
                e.currentTarget.classList.remove("opened")
                e.currentTarget.getElementsByTagName("svg")[0].classList.add("rollingcard-arrow-close")
                e.currentTarget.classList.add("closed")
                e.currentTarget.querySelector(".rollingcard-content").classList.remove("rollingcard-content-open")
                e.currentTarget.querySelector(".rollingcard-content").classList.add("rollingcard-content-close")
            }
        }
    }

    return (
        <>
        <div style={{display:'flex', justifyContent:'center'}}>
            <div className = "rollingcard-container closed"
                style={{marginBottom: marginsBottom[data.espacement_bas]}}
                onClick={(e)=>toggleCollapse(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="rollingcard-arrow-close"
                    style={{position:'absolute', width:'30px', right: '30px', top: '50px'}}>
                    <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z" 
                        fill="rgb(0,0,145)">
                    </path>
                </svg>
                <div style={{marginRight:'60px', marginTop:'15px'}}>
                    <ReactMarkDown>{data.texte}</ReactMarkDown>
                </div>
                <div className="rollingcard-content hidden">
                    <div className={`rollingcard-separator`}></div>
                        {data.bloc_deroulant.map((bloc,index)=>{
                            return(
                                <>
                                <div className="rollingcard-bloc">
                                    {bloc.texte_du_label && 
                                        <div className="rollingcard-bloc-label">
                                            <strong>{bloc.texte_du_label}</strong>
                                        </div>
                                    }
                                    <div className="rollingcard-bloc-text">
                                        <ReactMarkDown>{bloc.texte}</ReactMarkDown>
                                    </div>
                                </div>
                                </>
                            )
                        })}
                </div>
                {data.texte_du_bouton &&
                    <div style={{display:'flex', justifyContent:'center', marginBottom:'10px'}}>
                        <Link to = {data.lien_du_bouton} className="fr-btn">
                            {data.texte_du_bouton}
                        </Link>
                    </div>
                }
            </div>
        </div>
        </>
    )
}