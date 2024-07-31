// @ts-ignore
import React from "react";

interface NavigationProps {
  liens_navbar: Array<any>; // Replace `any` with a more specific type if possible
  selectedLink: any; // Replace `any` with a more specific type if possible
}

const getNestedPath = (pathname: string): string => {
  switch (pathname) {
    case "rapports-strategiques":
    case "etudes":
      return "nos-ressources/";
    case "breves":
      return "actualites/";
    default:
      return "";
  }
};

const Navigation: React.FC<NavigationProps> = ({
  liens_navbar,
  selectedLink,
}) => {
  return liens_navbar.map((lien_navbar) => ({
    text: lien_navbar.attributes.lien_navbar[0].titre_du_lien,
    linkProps: {
      href:
        getNestedPath(lien_navbar.attributes.lien_navbar[0].page_cible) +
        lien_navbar.attributes.lien_navbar[0].page_cible,
      target: lien_navbar.attributes.lien_navbar[0].page_cible.includes(
        "https://",
      )
        ? "_blank"
        : "_self",
    },
    isActive: selectedLink === lien_navbar,
  }));
};

export default Navigation;
