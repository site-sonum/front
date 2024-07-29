import * as React from "react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { marginsBottom } from "../structs";
import { Data, AccordionProps } from "../types";

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
          style={{ marginBottom: marginsBottom[accordionData.espacement_bas] }}
        >
          <section
            className="fr-accordion fr-col-lg-8"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <h3 className="fr-accordion__title">
              <button
                className="fr-accordion__btn"
                aria-expanded="false"
                aria-controls={`accordion-${accordionData.id}`}
              >
                {accordionData.titre}
              </button>
            </h3>
            <div className="fr-collapse" id={`accordion-${accordionData.id}`}>
              <ReactMarkdown>{accordionData.contenu}</ReactMarkdown>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
