import { marginsBottom } from "./structs";

//Accordion
export type AccordionData = {
  id: string;
  titre: string;
  contenu: string;
  espacement_bas: keyof typeof marginsBottom;
};

//AnchorNavigator
export type Ancre = {
  ancre: string;
  titre: string;
};

export type NavigationData = {
  ancre: Ancre[];
};

//BlocCards
export type BlocCardArticle = {
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

//BlocFieldSimple
export type BlocFieldSimple = {
  id: string;
  page_cible: string;
  texte_en_valeur: string;
  texte: string;
};
