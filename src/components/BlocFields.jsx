/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { marginsBottom } from "../structs";

export const BlocFields = ({ data }) => {
  return (
    <div className="flexrow-container">
      <div
        className="champ-de-blocs"
        style={{ marginBottom: marginsBottom[data.espacement_bas] }}
      >
        <h3 style={{ marginBottom: "44px" }}>{data.titre}</h3>
        <div className="grid2" style={{ marginBottom: "8px" }}>
          {data.Bloc_simple.map((b) => {
            return (
              <div key={b.id} className="bloc-simple">
                <Link
                  to={b.page_cible}
                  target={
                    b.page_cible && b.page_cible.includes("https://")
                      ? "_blank"
                      : null
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="tiny-right-arrow"
                  >
                    <path
                      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                      fill="rgba(0,0,145,1)"
                    ></path>
                  </svg>
                  <p>
                    <span className="blue-text">{b.texte_en_valeur} </span>
                    {b.texte}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
