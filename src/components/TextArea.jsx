import React, { useEffect } from 'react'
import ReactMarkDown from "react-markdown"
import { useState } from 'react'
import { Link } from "react-router-dom"
import { position } from '../structs.js'
import { marginsBottom } from "../structs"

export const TextArea = ({data, row}) =>{
    const tabulations = {
        "Aucune": "0%",
        "Petite": "8%",
        "Moyenne": "16%",
        "Grande": "24%"
    }

    const components = {
        a: ({ node, ...props }) => <Link to={props.href} target={ props.href.includes("https") ? '_blank': null}>{props.children}</Link>,
      }

    return (
        <div style={{marginLeft: data.position=='Centre' ? '10%' : null, marginBottom: marginsBottom[data.espacement_bas]}}>
            <div className={`textarea ${position[data.position]=='left' ? '' : 'ml40'}`} 
                 style={{ marginLeft: row!=null ? '0' : '', 
                          wordBreak:'break-word', 
                          marginLeft:tabulations[data.tabulation], 
                          marginRight:tabulations[data.tabulation]
                        }}>
                <ReactMarkDown components={components}>{data.texte}</ReactMarkDown>
            </div>
        </div>
    )
}