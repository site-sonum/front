import * as React from "react";
import { marginsBottom } from "../structs";

type IframeProps = {
  data: {
    id: string;
    position: "Centre" | string;
    espacement_bas: keyof typeof marginsBottom;
    taille_verticale: string;
    taille_horizontale: string;
    bords: "Arrondis" | string;
    source: string;
  };
  rows: number;
};

export const Iframe: React.FC<IframeProps> = ({ data, rows }) => {
  return (
    <>
      {rows === 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: data.position === "Centre" ? "center" : "",
            marginBottom: marginsBottom[data.espacement_bas],
          }}
        >
          <iframe
            key={data.id}
            className={`${data.taille_verticale} ${data.taille_horizontale}`}
            style={{ borderRadius: data.bords === "Arrondis" ? "10px" : "0px" }}
            src={data.source}
          />
        </div>
      )}
    </>
  );
};
