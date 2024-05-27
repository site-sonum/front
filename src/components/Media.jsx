import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HOST_URL } from "../env";
import { marginsBottom } from "../structs";

export const Media = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    if (data.image.data == null && data.lien_video == null) {
      setImageUrl(HOST_URL + "/uploads/placeholder_16x9_e6d60ccc52.png");
    } else if (data.image != null && data.image.data != null) {
      setImageUrl(HOST_URL + data.image.data.attributes.url);
    }
    if (data.lien_video != null) {
      setVideoUrl(data.lien_video.replace("watch?v=", "embed/"));
    }
    switch (data.taille) {
      case "Petit":
        setWidth("media-img500px");
        break;
      case "Moyen":
        setWidth("media-img700px");
        break;
      case "Grand":
        setWidth("media-img900px");
        break;
    }
  }, [data]);

  return (
    <>
      <div
        className="mt2"
        style={{
          marginLeft: "20px",
          marginBottom: marginsBottom[data.espacement_bas],
        }}
      >
        <figure
          role="group"
          className={`fr-content-media`}
          style={{ margin: data.position == "Centre" ? "0 auto" : "" }}
        >
          {videoUrl && (
            <iframe
              title="Titre de l'iframe"
              className="fr-responsive-vid fr-ratio-4x3"
              src={videoUrl}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
          {!videoUrl && imageUrl && (
            <div>
              <img src={imageUrl} className={width} alt="Image du média" />
            </div>
          )}
          <figcaption
            className={`fr-content-media__caption ${width}`}
            style={{ marginLeft: "50px" }}
          >
            {data.description}
            <Link
              to={data.lien_du_label}
              target={
                data.lien_du_label && data.lien_du_label.includes("https://")
                  ? "_blank"
                  : null
              }
              className="fr-link"
            >
              {data.titre_du_label}
            </Link>
          </figcaption>
          {data.afficher_transcription == "Oui" && (
            <div className={`fr-transcription ${width}`}>
              <button
                className="fr-transcription__btn"
                aria-expanded={data.transcription_ouverte ? "true" : "false"}
                aria-controls={`fr-transcription__collapse-transcription-${data.id}`}
              >
                Transcription
              </button>
              <div
                className="fr-collapse"
                id={`fr-transcription__collapse-transcription-${data.id}`}
              >
                <dialog
                  id="fr-transcription__modal-transcription-471"
                  className="fr-modal"
                  role="dialog"
                  aria-labelledby={`fr-transcription__modal-transcription-${data.id}-title`}
                >
                  <div className="fr-container fr-container--fluid fr-container-md">
                    <div className="fr-grid-row fr-grid-row--center">
                      <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
                        <div className="fr-modal__body">
                          <div className="fr-modal__header">
                            <button
                              className="fr-btn--close fr-btn"
                              aria-controls={`fr-transcription__modal-transcription-${data.id}`}
                              title="Fermer"
                            >
                              Fermer
                            </button>
                          </div>
                          <div className="fr-modal__content">
                            <h1
                              id="fr-transcription__modal-transcription-471-title"
                              className="fr-modal__title"
                            >
                              Titre de la vidéo
                            </h1>
                            {data.transcription}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          )}
        </figure>
      </div>
    </>
  );
};
