import * as React from "react";
import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { marginsBottom } from "../structs";

interface Data {
  id: string;
  titre: string;
  contenu: string;
  espacement_bas: keyof typeof marginsBottom;
}

interface AccordionProps {
  data: Data;
  rows: number;
}

export const Accordion: React.FC<AccordionProps> = ({ data, rows }) => {
  const [accordionData, setAccordionData] = useState<Data>({
    id: "",
    titre: "",
    contenu: "",
    espacement_bas: Object.keys(marginsBottom)[0] as keyof typeof marginsBottom,
  });

  useEffect(() => {
    setAccordionData(data);
  }, [data]);

  return (
    <>
      {rows === 1 && (
        <div
          className="mb2"
          style={{ marginBottom: marginsBottom[data.espacement_bas] }}
        >
          <section
            className="fr-accordion fr-col-lg-8"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <h3 className="fr-accordion__title">
              <button
                className="fr-accordion__btn"
                aria-expanded="false"
                aria-controls={`accordion-${data.id}`}
              >
                {accordionData.titre}
              </button>
            </h3>
            <div className="fr-collapse" id={`accordion-${data.id}`}>
              <ReactMarkDown>{accordionData.contenu}</ReactMarkDown>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
