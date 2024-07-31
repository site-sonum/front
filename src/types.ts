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

export type Article = {
  id: string;
  [key: string]: any;
};
