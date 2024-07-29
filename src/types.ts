import { marginsBottom } from "./structs";

//Accordion
export interface Data {
  id: string;
  titre: string;
  contenu: string;
  espacement_bas: keyof typeof marginsBottom;
}

export interface AccordionProps {
  data: Data;
  rows: number;
}

//AnchorNavigator
export interface Ancre {
  ancre: string;
  titre: string;
}

export interface NavigationData {
  ancre: Ancre[];
}

export interface AnchorNavigatorProps {
  data: NavigationData;
}
