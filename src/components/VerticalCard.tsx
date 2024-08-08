import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOST_URL } from "../env";
import { labelColors, marginsBottom } from "../structs";

type VerticalCardProps = {
  data: {
    id: number;
    image?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    type: string;
    titre_de_la_carte: string;
    taille: "Petit" | "Moyen" | "Grand";
    texte_en_valeur?: string;
    texte?: string;
    label?: string;
    labels: Array<{
      titre_du_label: string;
    }>;
    espacement_bas: keyof typeof marginsBottom;
    position?: string;
    lien: string;
    titre_du_lien: string;
  };
  rows: number;
};

export const VerticalCard: React.FC<VerticalCardProps> = ({ data, rows }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [height, setHeight] = useState<string | null>(null);
  const [fontsizeLabel, setFontsizeLabel] = useState<string>("14px");
  const [maxCharacters, setMaxCharacters] = useState<number | null>(null);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (data.image?.data?.attributes?.url) {
      setImageUrl(`${HOST_URL}${data.image.data.attributes.url}`);
    } else {
      if (data.type !== "carte-verticale") {
        setImageUrl(`${HOST_URL}/uploads/placeholder_16x9_e6d60ccc52.png`);
      }
    }

    if (data.type !== "carte-verticale") {
      setSlug(
        data.titre_de_la_carte
          .split(" ")
          .join("-")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      );
    }

    switch (rows) {
      case 1:
        switch (data.taille) {
          case "Petit":
            setWidth("300px");
            setHeight("230px");
            setFontsizeLabel("12px");
            setMaxCharacters(128);
            break;
          case "Moyen":
            setWidth("350px");
            setHeight("270px");
            setFontsizeLabel("14px");
            setMaxCharacters(210);
            break;
          case "Grand":
            setWidth("400px");
            setHeight("300px");
            setFontsizeLabel("16px");
            setMaxCharacters(256);
            break;
        }
        break;
      case 2:
        setWidth("350px");
        setHeight("300px");
        setFontsizeLabel("14px");
        setMaxCharacters(256);
        break;
      case 3:
        setWidth("300px");
        setHeight("250px");
        setFontsizeLabel("12px");
        setMaxCharacters(128);
        break;
    }
  }, [data, rows]);

  useEffect(() => {
    if (maxCharacters && data.texte) {
      if (data.texte_en_valeur) {
        if (data.texte_en_valeur.length + data.texte.length >= maxCharacters) {
          const toSlice = Math.abs(
            data.texte_en_valeur.length + data.texte.length - maxCharacters,
          );
          setText(data.texte.slice(0, -toSlice) + "...");
        }
      } else {
        if (data.texte.length >= maxCharacters) {
          const toSlice = data.texte.length - maxCharacters;
          setText(data.texte.slice(0, -toSlice) + "...");
        }
      }
    }
  }, [maxCharacters, data.texte, data.texte_en_valeur]);

  return (
    <>
      {data.type !== "carte-verticale" && (
        <div key={data.id}>
          <div
            className="fr-card fr-enlarge-link"
            style={{
              height: "430px",
              marginBottom: marginsBottom[data.espacement_bas],
            }}
          >
            <div className="fr-card__body card-img">
              <div className="fr-card__content">
                <p
                  className={
                    data.label === "Evènement" ? "fr-tag jaune" : "fr-tag rose"
                  }
                >
                  {data.label}
                </p>
                <h3 className="fr-card__title mt1">
                  <Link to={`/actualites/breves/${slug}`} className="grey-75">
                    {data.titre_de_la_carte}
                  </Link>
                </h3>
              </div>
            </div>
            {imageUrl && (
              <div className="fr-card__header">
                <img
                  className="fr-responsive-img"
                  src={imageUrl}
                  alt=""
                  loading="lazy"
                  style={{ minHeight: "200px" }}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {data.type === "carte-verticale" && (
        <div
          key={data.id}
          className="mt2 mb2"
          style={{
            display: "flex",
            justifyContent:
              rows > 1 ? "center" : data.position === "Centre" ? "center" : "",
            marginBottom: marginsBottom[data.espacement_bas],
          }}
        >
          <div className="fr-card fr-enlarge-link">
            <div
              className="fr-card__body card-img mb3"
              style={{
                height: height && rows === 1 ? height : undefined,
                width: width && rows === 1 ? width : undefined,
              }}
            >
              <div
                className="fr-card__content"
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "0px",
                }}
              >
                <div>
                  {data.labels.length > 0 &&
                    data.labels.map((label) => (
                      <span
                        key={label.titre_du_label}
                        className={`card-label ${labelColors["Violet"]}`}
                        style={{
                          fontSize: fontsizeLabel,
                          color: "rgb(0,0,185)",
                        }}
                      >
                        {label.titre_du_label}
                      </span>
                    ))}
                </div>
                <h4 className="mt1">
                  <Link
                    to={data.lien}
                    target={
                      data.lien && data.lien.includes("https://")
                        ? "_blank"
                        : undefined
                    }
                    style={{ color: "#000091" }}
                  >
                    {data.titre_du_lien}
                  </Link>
                </h4>
                <p>
                  <strong>{data.texte_en_valeur}</strong>{" "}
                  {text.length > 0 ? text : data.texte}
                </p>
                <i className="ri-arrow-right-line vertical-card-arrow"></i>
              </div>
            </div>
            {imageUrl && (
              <div className="fr-card__header">
                <img
                  className="fr-responsive-img"
                  src={imageUrl}
                  alt=""
                  loading="lazy"
                  style={{
                    minHeight: "200px",
                    width: width && rows === 1 ? width : undefined,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
