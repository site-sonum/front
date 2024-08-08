import * as React from "react";
import { useEffect, useState } from "react";
import { HOST_URL } from "../env";
import axios from "axios";
import { marginsBottom } from "../structs";

type DownloadLinkProps = {
  data: {
    id: string;
    position: "Centre" | "Gauche" | "Droite";
    espacement_bas: string;
    titre_de_la_liste?: string;
    Lien_telechargement: Array<{
      actif: "Oui" | "Non";
      texte_du_lien: string;
      media_a_telecharger: {
        data: { attributes: { url: string; name: string } } | null;
      };
    }>;
  };
  rows: number;
};

export const DownloadLink: React.FC<DownloadLinkProps> = ({ data, rows }) => {
  const [localData, setLocalData] = useState<DownloadLinkProps["data"] | null>(
    null,
  );

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const onDownload = async (url: string) => {
    const fname = url.split("/").pop() || "download";
    try {
      const remoteFile = await axios({
        method: "get",
        url: HOST_URL + url,
        responseType: "arraybuffer",
        headers: {
          Authorization: "",
        },
      });
      if (remoteFile) {
        forceFileDownload(remoteFile, fname);
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
    link.remove();
    window.URL.revokeObjectURL(url); // Révocation de l'URL pour libérer la mémoire
  };

  const renderDownloadLinks = (
    links: DownloadLinkProps["data"]["Lien_telechargement"],
  ) =>
    links.map((lien, index) => (
      <li key={index}>
        <a
          href={
            lien.media_a_telecharger?.data
              ? HOST_URL + lien.media_a_telecharger.data.attributes.url
              : undefined
          }
          className={`fr-link--download fr-link ${lien.actif === "Non" ? "disable-download-link" : ""}`}
          data-fr-assess-file="arraybuffer"
          hrefLang="fr"
          download
          target="_blank"
          id={`link-${index}`}
          onClick={async (e) => {
            e.preventDefault();
            if (lien.actif === "Oui" && lien.media_a_telecharger?.data) {
              await onDownload(lien.media_a_telecharger.data.attributes.url);
            }
          }}
        >
          {lien.texte_du_lien}
          <span className="fr-link__detail"> </span>
        </a>
      </li>
    ));

  return (
    <>
      {localData && (
        <>
          {rows === 1 && (
            <div
              key={localData.id}
              style={{
                display: "flex",
                justifyContent:
                  localData.position === "Centre"
                    ? "center"
                    : localData.position === "Gauche"
                      ? "flex-start"
                      : "flex-end",
              }}
            >
              {localData.Lien_telechargement.length > 0 && (
                <div
                  className="download-container"
                  style={{
                    marginBottom: marginsBottom[localData.espacement_bas],
                  }}
                >
                  {localData.titre_de_la_liste && (
                    <h4>{localData.titre_de_la_liste}</h4>
                  )}
                  <ul>{renderDownloadLinks(localData.Lien_telechargement)}</ul>
                </div>
              )}
            </div>
          )}

          {rows > 1 && (
            <div key={localData.id}>
              {localData.Lien_telechargement.length > 0 && (
                <div className="download-container">
                  {localData.titre_de_la_liste && (
                    <h4>{localData.titre_de_la_liste}</h4>
                  )}
                  <ul>{renderDownloadLinks(localData.Lien_telechargement)}</ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
