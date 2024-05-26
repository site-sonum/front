import { Link } from 'react-router-dom'
import { HOST_URL } from '../env.js'
import { marginsBottom, labelColors } from "../structs"

//ASSETS//
import RightArrow from '../assets/pictogrammes/right-arrow.svg'
import { useEffect, useState, useRef } from 'react'

export const HorizontalCard = ({data, rows, displayText = true, fluxTwo = false}) => {
    const [type, setType] = useState(null)
    const [slug, setSlug] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [labels, setLabels] = useState([])
    const [size, setSize] = useState(null)
    const [fontsizeLabel, setFontsizeLabel] = useState('14px')
    const [maxCharacters, setMaxCharacters] = useState(256)
    const [cacheText, setCacheText] = useState('')
    const [text, setText] = useState('')
    const [widthScreen, setWidthScreen] = useState(null)

    const marginsBottom = {
        "défaut":"mb-8",
        "px8":"mb-12",
        "px16":"mb-16",
        "px32":"mb-20",
        "px48":"mb-24",
        "px64":"mb-28"
    }

    useEffect(()=>{
        setType(data.type[0].toUpperCase() + data.type.slice(1).split('-').join(' '))
        switch(data.type){
            case 'rapport-stratégique':
                var flowPrefix = displayText==false ? "nos-ressources/rapports-strategiques/" : ''
                setSlug(flowPrefix+data.titre_de_la_carte.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
            break
            case 'etude':
                var flowPrefix = displayText==false ? "nos-ressources/etudes/" : ''
                setSlug(flowPrefix+data.titre_de_la_carte.split(' ').join('-').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
            break
            case 'carte-horizontale':
                if (data.image.data!=null){
                    setImageUrl(data.image.data.attributes.url)
                }
            break
        }

        if (data.labels!=null) setLabels(data.labels)
    },[data])

    useEffect(()=>{
        if (data.texte_en_valeur!=null && data.texte!=null){
            if ((data.texte_en_valeur.length + data.texte.length) >= maxCharacters){
                const toSlice = Math.abs((data.texte_en_valeur.length + data.texte.length)-maxCharacters)
                setText(data.texte.slice(0,-toSlice)+'...')
                setCacheText(data.texte.slice(0,-toSlice)+'...')
            }
        }
        if (data.texte_en_valeur==null && data.texte!=null){
            if ((data.texte.length) >= maxCharacters){
                const toSlice = data.texte.length-maxCharacters
                setText(data.texte.slice(0,-toSlice)+'...')
                setCacheText(data.texte.slice(0,-toSlice)+'...')
            }
        }
    },[maxCharacters])

    useEffect(()=>{
        window.addEventListener("resize", e=>{
            setWidthScreen(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
        })
    },[])

    useEffect(()=>{
        if (widthScreen){
            if(widthScreen<570){
                if (text.length>100){
                    setText(prevText=>{
                        return prevText.slice(0,50)+'...'
                    })
                }
            } else {
                setText(cacheText)
            }
        }

    },[widthScreen])

    return (
        <>
        {data.type!='carte-horizontale' && 
        <div key={data.id} className={`md:max-w-[90%] transition duration-300 ease-in-out transform hover:bg-gray-100 ${marginsBottom[data.espacement_bas] || 'mb-4'}`}>
            <Link to={`${slug}`} className="relative flex flex-col shadow items-center bg-white border md:flex-row h-60 min-h-full">
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <div className='absolute top-6 p-2'>
                        {fluxTwo==true && 
                            <span className={`inline-block py-1 px-2 rounded-full mb-2 text-black bg-gray-200 last:mr-0 mr-1 ${labelColors["Violet"]}`}
                                style={{fontSize:"12px", color: 'rgb(0,0,145)'}}>
                                {type}
                            </span>
                        }
                        <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                            {data.titre_de_la_carte}
                        </h4>
                        {displayText && 
                            <p className="mb-3 font-normal text-black dark:text-gray-600">
                                {data.texte_de_la_carte}
                            </p>
                        }
                        </div>
                    </div>
                <div className="absolute bottom-0 left-4">
                    <img src={RightArrow} style={{ width: '15px', transform: 'translateY(-0.37rem)' }} alt=""/>
                        <div className="right-arrow-card-transform">
                            <span style={{ marginLeft: '0.30rem', fontSize: '12px'}}> Découvrir la ressource</span>
                        </div>
                </div>
            </Link>
        </div>
        }
        
        {data.type=='carte-horizontale' &&
            <div key = {data.id}
                className={`linkcard ${rows==1 && data.position=='Centre' ? 'flex items-center justify-center' : ''} ${marginsBottom[data.espacement_bas]}`}>
                <div className=''>
                    <Link to={data.lien} target={data.lien && data.lien.includes('https://') ? '_blank' : null}
                        className="pr-2 hover:bg-gray-100 flex flex-col items-center bg-white border
                                    border-gray-200 shadow md:flex-row md:max-w-xl 
                                    dark:border-gray-100 dark:hover:bg-gray-100 hover-horizontalcard
                                    dark:bg-white dark:text-black-400">
                        {imageUrl && 
                            <img className="w-full h-full md:w-48" src={HOST_URL+imageUrl} alt=""/>
                        }
                        <div className={`flex flex-col justify-between p-5 leading-normal mt-1 ${!imageUrl && 'ml-5'}`}>
                            {!fluxTwo && labels.length>0 &&
                                <div className='inline'>
                                {labels.map(l=>{
                                    return(
                                        <span className={`w-fit py-1 px-2 rounded-full text-black bg-gray-200 last:mr-0 mr-1 ${labelColors["Violet"]}`}
                                        style={{fontSize:"12px", color: 'rgb(0,0,185)'}}>
                                            {l.titre_du_label}
                                        </span>
                                    )
                                })} 
                                </div>
                            }
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black pt-4">{data.titre}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-black-400 pb-6 mt-1 "><strong>{data.texte_en_valeur} </strong>{text.length>0 ? text : data.texte}</p>
                            <i className="ri-arrow-right-line ml-auto" style={{color:"#1132DE", fontSize:"25px"}}></i>
                        </div>
                    </Link>
                </div>
            </div>
        }
    </>
    )
}