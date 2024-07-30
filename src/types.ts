import { marginsBottom } from "./structs";

//Accordion
export type AccordionData = {
  id: string;
  titre: string;
  contenu: string;
  espacement_bas: keyof typeof marginsBottom;
};

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
