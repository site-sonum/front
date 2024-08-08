import * as React from "react";
import { useEffect, useState } from "react";
import { HOST_URL } from "../env";
import { labelColors, marginsBottom } from "../structs";
import axios from "axios";
import { DownloadCardLocalData } from "../types";

type DownloadCardProps = {
  data: DownloadCardLocalData;
  rows: number;
};

export const DownloadCard: React.FC<DownloadCardProps> = ({ data, rows }) => {
  const [localData, setLocalData] = useState<DownloadCardLocalData | null>(
    null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>("");

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  useEffect(() => {
    if (localData) {
      if (localData.image_de_la_carte.data != null) {
        setImageUrl(HOST_URL + localData.image_de_la_carte.data.attributes.url);
      }
      if (localData.type_de_carte === "Tuile") {
        if (rows === 1) {
          switch (localData.taille) {
            case "Petit":
              setSize("fr-col-sm-3");
              break;
            case "Grand":
              setSize("fr-col-md-4");
              break;
          }
        } else if (rows === 2 || rows === 3) {
          setSize("mh250 mw400");
        }
      }
      if (localData.type_de_carte === "Classique") {
        if (rows === 1) {
          switch (localData.taille) {
            case "Petit":
              setSize("fr-col-sm-5");
              break;
            case "Grand":
              setSize("fr-col-lg-6");
              break;
          }
        } else if (rows === 2 || rows === 3) {
          setSize("mh300 mw400");
        }
      }

      if (localData.media_a_telecharger.data != null) {
        const fname =
          localData.media_a_telecharger.data.attributes.url.split("/");
        setFilename(fname[2]);
      }
    }
  }, [localData, rows]);

  const onDownload = async (url: string, fileName: string) => {
    try {
      const remoteFile = await axios({
        method: "get",
        url: url,
        responseType: "arraybuffer",
        headers: {
          Authorization: "",
        },
      });
      if (remoteFile) {
        forceFileDownload(remoteFile, fileName);
      }
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const forceFileDownload = (response: any, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      {localData && (
        <>
          {localData.type_de_carte === "Tuile" && (
            <div
              key={localData.id}
              style={
                rows === 1
                  ? {
                      display: "flex",
                      justifyContent:
                        localData.position === "Centre"
                          ? "center"
                          : localData.position === "Gauche"
                            ? "flex-start"
                            : "flex-end",
                    }
                  : {}
              }
            >
              <div
                className={`fr-tile fr-tile--download ${size} fr-enlarge-link mb2`}
                id="tile-6735"
                style={{ marginBottom: marginsBottom[data.espacement_bas] }}
              >
                <div className="fr-tile__body">
                  <div className="fr-tile__content">
                    <h3 className="fr-tile__title">
                      <a
                        href={
                          localData.media_a_telecharger.data !== null
                            ? HOST_URL +
                              localData.media_a_telecharger.data.attributes.url
                            : localData.telechargement_externe
                        }
                        download
                        target="_blank"
                        data-fr-assess-file="arraybuffer"
                        hrefLang="fr"
                        onClick={(e) => {
                          e.preventDefault();
                          onDownload(
                            HOST_URL +
                              localData.media_a_telecharger.data.attributes.url,
                            filename,
                          );
                        }}
                      >
                        {localData.titre_de_la_carte}
                      </a>
                    </h3>
                    <p className="fr-card__desc">
                      {localData.label && (
                        <span
                          className={`card-label ${labelColors[localData.label.couleur_du_label]}`}
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginTop: "0px",
                            marginBottom: "16px",
                          }}
                        >
                          {localData.label.titre_du_label}
                        </span>
                      )}
                      {localData.description_de_la_carte}
                    </p>
                    <p className="fr-tile__detail">Détail (optionnel)</p>
                  </div>
                </div>
                {imageUrl && (
                  <div className="fr-tile__header">
                    <div className="fr-tile__pictogram">
                      <img src={imageUrl} alt="" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {localData.type_de_carte === "Classique" && (
            <div
              key={localData.id}
              style={
                rows === 1
                  ? {
                      display: "flex",
                      justifyContent:
                        localData.position === "Centre"
                          ? "center"
                          : localData.position === "Gauche"
                            ? "flex-start"
                            : "flex-end",
                    }
                  : {}
              }
            >
              <div
                className={`fr-card fr-enlarge-link fr-card--horizontal fr-card--horizontal-half ${size} mb2`}
                style={{ marginBottom: marginsBottom[data.espacement_bas] }}
              >
                <div className="fr-card__body">
                  <div className="fr-card__content">
                    <h3 className="fr-card__title blue-text">
                      {localData.titre_de_la_carte}
                    </h3>
                    <a
                      href={
                        localData.media_a_telecharger.data !== null
                          ? HOST_URL +
                            localData.media_a_telecharger.data.attributes.url
                          : localData.telechargement_externe
                      }
                      download
                      target="_blank"
                      data-fr-assess-file="bytes"
                      hrefLang="fr"
                      onClick={(e) => {
                        e.preventDefault();
                        onDownload(
                          HOST_URL +
                            localData.media_a_telecharger.data.attributes.url,
                          filename,
                        );
                      }}
                    ></a>
                    <p className="fr-card__desc">
                      {localData.description_de_la_carte}
                    </p>
                    <div className="fr-card__start">
                      {localData.label && (
                        <span
                          className={`card-label ${labelColors[localData.label.couleur_du_label]}`}
                          style={{
                            fontSize: "14px",
                            display: "block",
                            marginTop: "0px",
                            marginBottom: "16px",
                          }}
                        >
                          {localData.label.titre_du_label}
                        </span>
                      )}
                    </div>
                    <div className="fr-card__end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          width: "25px",
                          position: "absolute",
                          right: "24px",
                          bottom: "24px",
                        }}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"
                          fill="#000091"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {imageUrl && (
                  <div className="fr-card__header fr-col-md-4">
                    <div className="fr-card__img">
                      <img
                        className="fr-responsive-img"
                        src={imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
