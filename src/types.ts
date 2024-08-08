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

export type DownloadCardLocalData = {
  id: string;
  image_de_la_carte: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  type_de_carte: "Tuile" | "Classique";
  taille: "Petit" | "Grand";
  media_a_telecharger: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  titre_de_la_carte: string;
  description_de_la_carte: string;
  label?: {
    couleur_du_label: string;
    titre_du_label: string;
  };
  espacement_bas: string;
  position: "Centre" | "Gauche" | "Droite";
  telechargement_externe?: string;
};

//Footer
export type SocialLink = {
  platform: string;
  url?: string;
  icon?: boolean;
};

export type FooterContent = {
  afficher_section?: boolean;
  titre_abonnement?: string;
  lien_du_bouton_abonnement?: string;
  texte_du_bouton_abonnement?: string;
  titre?: string;
  texte?: string;
  lien_du_bouton?: string;
  texte_du_bouton?: string;
  lien_facebook?: string;
  lien_twitter?: string;
  lien_instagram?: string;
  lien_linkedin?: string;
  lien_youtube?: string;
  lien_mastodon?: string;
  logo?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  paragraphe_de_droite?: string;
  liens_footer?: {
    liens_footer: {
      url: string;
      titre_du_lien: string;
    }[];
  }[];
};

//Header
export type HeaderLienNavbar = {
  id: string;
  attributes: {
    titre: string;
    lien_navbar: Array<{
      __component: string;
      page_cible: string;
      titre_du_lien: string;
      titre_du_menu?: string;
      pictogramme_remixicon?: string;
      liens?: Array<{
        id: string;
        page_cible: string;
        titre_du_lien: string;
      }>;
    }>;
  };
};
