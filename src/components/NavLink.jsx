import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { position } from "../structs.js"
import { marginsBottom } from "../structs"

export const NavLink =({data, rows}) => {

    const [linkData, setLinkData] = useState([])
    const [size, setSize] = useState([])
    const [icon, setIcon] = useState([])

    useEffect(()=>{ 
        setLinkData(data)
        switch (data.taille)
        {
        case 'Petit': 
            setSize('ma classe fr-link fr-link--sm')
        break

        case 'Moyen': 
            setSize('ma classe fr-link fr-link--sm')
        break
        
        case 'Grand':
            setSize('ma classe fr-link fr-link--lg')
        break
        }

        // switch (data.icone)
        // {
        // case 'Gauche':
        //     setIcon('fr-link fr-icon-arrow-left-line fr-link--icon-left')
        // break
        // case 'Aucune':
            
        // break
        // case 'Droite':
        //     setIcon('fr-link fr-icon-arrow-right-line fr-link--icon-right')
        // break
        // }

    },[data])
    return (
        <>
        {rows == 1 &&
        <div key={linkData.id} className={`${(position[linkData.position] === 'left' || position[linkData.position] === 'right') ? position[linkData.position] : 'center'}`}
            style={{ marginBottom: marginsBottom[data.espacement_bas] }}>
            <Link to = {linkData.page_cible}
                    className= {`${size} ${icon}`}
                    target={linkData.page_cible && linkData.page_cible.includes('https://') ? '_blank' : null}
                    >
                    {/* {data.icone === "Gauche" &&
                    <>
                        <svg style={{width: data.taille == 'Petit' ? '16px' : data.taille == 'Moyen' ? '18px' : '20px', transform:'translateY(4px)'}} 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" fill='rgb(0, 0, 145)'></path></svg>
                        {linkData.texte}
                    </>
                    }
                    {data.icone === "Droite" &&
                    <>
                        {linkData.texte}
                        <svg style={{width: data.taille == 'Petit' ? '16px' : data.taille == 'Moyen' ? '18px' : '20px', transform:'translateY(4px)'}} 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" fill='rgb(0, 0, 145)'></path></svg>
                    </>
                    }
                    {data.icone === "Aucune" &&
                    <>
                        {linkData.texte}
                    </>
                    } */}
                    {linkData.texte}
                    
            </Link>
        </div>
        }
        {rows > 1 &&
        <div key = {linkData.id}>                                               
            <Link to = {linkData.page_cible} 
            className= {`${size} ${icon}`}
            target={linkData.page_cible && linkData.page_cible.includes('https://') ? '_blank' : null}
                >
                {linkData.texte}
            </Link>
        </div>
        }
        </>
    )
}