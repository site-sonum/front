import { useEffect, useState } from "react";
import { VerticalCard } from "./VerticalCard";
import { HOST_URL } from "../env.js";
import { Link } from "react-router-dom";

export const ToolsDevicesContainer = ({ data, slug, type }) => {
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (data) {
      const dataByRelationship = [];
      data.forEach((e) => {
        if (
          e.attributes.type_element == type &&
          e.attributes.liaison_avec == slug
        ) {
          dataByRelationship.push(e);
        } else if (
          e.attributes.type_element == type &&
          (e.attributes.autres_liaisons != null ||
            e.attributes.autres_liaisons.length > 0)
        ) {
          e.attributes.autres_liaisons.forEach((l) => {
            if (l.liaison == slug) {
              dataByRelationship.push(e);
            }
          });
        }
      });

      const uniqueData = [...new Set(dataByRelationship)];
      const sortedByUpdated = uniqueData.sort(
        (a, b) =>
          new Date(b.attributes.updatedAt) - new Date(a.attributes.updatedAt),
      );
      setLocalData(sortedByUpdated);
      console.log(data);

      // datesList = datesList.sort((a,b)=> new Date(b) - new Date(a))
    }
  }, [data]);

  return (
    <>
      {localData && (
        <div className="flexrow-container">
          <div className="grid3">
            {localData.map((item) => {
              return (
                <div key={item.id}>
                  <div
                    className="toolsdevices fr-card fr-enlarge-link"
                    style={{ height: "500px" }}
                  >
                    <div
                      className="fr-card__body card-img"
                      style={{ width: "366px" }}
                    >
                      <div
                        className="fr-card__content"
                        style={{
                          width: "366px",
                          transform: "translateY(-10px)",
                        }}
                      >
                        <h3 className="fr-card__title">
                          <Link
                            to={`/nos-missions/${slug}/${item.attributes.titre_de_la_carte
                              .split(" ")
                              .join("-")
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/[\u0300-\u036f]/g, "")}`}
                            className="grey-75"
                            style={{ fontSize: "20px" }}
                          >
                            {item.attributes.titre_de_la_carte}
                          </Link>
                        </h3>
                        <p className="toolsdevices fr-card__desc">
                          {item.attributes.texte_de_la_carte &&
                          item.attributes.texte_de_la_carte.length > 230
                            ? item.attributes.texte_de_la_carte.slice(0, 230) +
                              "..."
                            : item.attributes.texte_de_la_carte}
                        </p>
                      </div>
                      <p
                        style={{
                          position: "absolute",
                          bottom: "0",
                          fontSize: "12px",
                          color: "#666666",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          style={{
                            width: "16px",
                            position: "absolute",
                            bottom: "5px",
                          }}
                        >
                          <path
                            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                            fill="rgb(102,102,102)"
                          ></path>
                        </svg>
                        <span style={{ marginLeft: "20px" }}>
                          Découvrir{" "}
                          {type == "Outil" ? " l'outil" : "le dispositif"}
                        </span>
                      </p>
                    </div>
                    {item.attributes.image.data != null && (
                      <div className="fr-card__header">
                        <img
                          className="fr-responsive-img"
                          src={
                            HOST_URL + item.attributes.image.data.attributes.url
                          }
                          alt=""
                          loading="lazy"
                          style={{ minHeight: "200px" }}
                        />
                      </div>
                    )}
                    {item.attributes.image.data == null && (
                      <div className="fr-card__header">
                        <img
                          className="fr-responsive-img"
                          src={
                            HOST_URL +
                            "/uploads/placeholder_16x9_e6d60ccc52.png"
                          }
                          alt=""
                          loading="lazy"
                          style={{ minHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
