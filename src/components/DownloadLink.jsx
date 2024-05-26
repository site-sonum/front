import { useEffect, useState } from "react";
import { HOST_URL } from '../env.js';
import axios from 'axios'
import { marginsBottom } from "../structs"

export const DownloadLink = ({ data, rows }) => {
    const [localData, setLocalData] = useState([]);

    useEffect(() =>{
        setLocalData(data);
    },[data]);

    const onDownload = async (url) =>{
        const fname = url.split('/')
        const remoteFile  = await axios({
          method: 'get',
          url: HOST_URL + url,
          responseType: 'arraybuffer',
          headers: {
            Authorization: '',
          },
        })
        if (remoteFile){
            forceFileDownload(remoteFile, fname[2]);
        }
    }
  
    const forceFileDownload = (response, fileName) =>{
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    }

    return (
        <>
        {localData &&
        <>
            {rows === 1 && (
                <div key={localData.id} style={{ display: 'flex', justifyContent: localData.position === 'Centre' ? 'center' : localData.position === 'Gauche' ? '' : 'flex-end' }}>
                    {localData.Lien_telechargement && localData.Lien_telechargement.length > 1 && (
                        <div className={`download-container`}
                        style={{marginBottom: marginsBottom[data.espacement_bas]}}>
                            {localData.titre_de_la_liste && <h4>{localData.titre_de_la_liste}</h4>}
                            <ul>
                                {localData.Lien_telechargement.map((lien, index) => (
                                    <li key={index}>
                                        <a href={lien.media_a_telecharger.data !== null ?
                                            HOST_URL + lien.media_a_telecharger.data.attributes.url :
                                            null}
                                            className={`fr-link--download fr-link ${lien.actif == 'Non' ? 'disable-download-link' : ''}`}
                                            data-fr-assess-file="arraybuffer"
                                            hrefLang="fr"
                                            download
                                            target="_blank"
                                            id={`link-${index}`}
                                            onClick={(e)=>{e.preventDefault() ; onDownload(lien.media_a_telecharger.data.attributes.url)}}
                                            >
                                            {lien.texte_du_lien}<span className="fr-link__detail"> </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {localData.Lien_telechargement && localData.Lien_telechargement.length === 1 && (
                        <div key={localData.id}  style={{padding: '16px 48px 16px 32px'}}>
                            <a className="fr-link--download fr-link"
                                data-fr-assess-file="bytes"
                                hrefLang="fr"
                                download
                                target="_blank"
                                onClick={(e)=>{e.preventDefault() ; onDownload(localData.Lien_telechargement[0].media_a_telecharger.data.attributes.url)}}
                                id={`link-${localData.id}`}
                                href={localData.Lien_telechargement[0].media_a_telecharger.data !== null ?
                                    HOST_URL + localData.Lien_telechargement[0].media_a_telecharger.data.attributes.url :
                                    null}
                                >
                                {localData.Lien_telechargement[0].texte_du_lien}<span className="fr-link__detail"> </span>
                            </a>
                        </div>
                    )}
                </div>
            )}

            {rows > 1 && (
                <div key={localData.id} style={{}}>
                {localData.Lien_telechargement && localData.Lien_telechargement.length > 1 && (
                    <div className={`download-container`}>
                        {localData.titre_de_la_liste && <h4>{localData.titre_de_la_liste}</h4>}
                        <ul>
                            {localData.Lien_telechargement.map((lien, index) => (
                                <li key={index}>
                                    <a className="fr-link--download fr-link"
                                        data-fr-assess-file="bytes"
                                        hrefLang="fr"
                                        onClick={(e)=>{e.preventDefault() ;  onDownload(lien.media_a_telecharger.data.attributes.url)}}
                                        download={lien.media_a_telecharger.data.attributes.name}
                                        id={`link-${index}`}
                                        href={lien.media_a_telecharger.data !== null ?
                                            HOST_URL + lien.media_a_telecharger.data.attributes.url :
                                            null}
                                    >
                                        {lien.texte_du_lien}<span className="fr-link__detail"> </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {localData.Lien_telechargement && localData.Lien_telechargement.length === 1 && (
                    <div key={localData.id}  style={{padding: '16px 48px 16px 32px'}}>
                        <a className="fr-link--download fr-link"
                            data-fr-assess-file="bytes"
                            hrefLang="fr"
                            download={localData.Lien_telechargement[0].media_a_telecharger.data.attributes.name}
                            onClick={(e)=>{e.preventDefault() ; onDownload(localData.media_a_telecharger.data.attributes.url)}}
                            id={`link-${localData.id}`}
                            href={localData.Lien_telechargement[0].media_a_telecharger.data !== null ?
                                HOST_URL + localData.Lien_telechargement[0].media_a_telecharger.data.attributes.url :
                                null}
                        >
                            {localData.Lien_telechargement[0].texte_du_lien}<span className="fr-link__detail"> </span>
                        </a>
                    </div>
                )}
            </div>
            )}
            </>
            }
        </>
    );
};
