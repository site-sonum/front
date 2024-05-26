import { useEffect, useState } from "react"
import { marginsBottom } from "../structs"

export const Iframe = ({data, rows}) =>{

    return (
        <>
        {rows == 1 &&
        <div style = {{display:'flex', justifyContent: data.position == 'Centre' ? 'center' : '',
            marginBottom: marginsBottom[data.espacement_bas]}}>
            <iframe key = {data.id}
                className={`${data.taille_verticale} ${data.taille_horizontale}`}
                style = {{borderRadius: data.bords == 'Arrondis' ? '10px' : '0px'}} 
                src = {data.source}/>
        </div>
        }
        </>
    )
}