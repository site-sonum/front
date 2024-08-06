/* eslint-disable react/jsx-key */

import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

type BreadCrumbProps = {
  hasBannerTitle?: boolean;
};

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ hasBannerTitle }) => {
  const location = useLocation();
  const [pathname, setPathname] = useState<string[] | null>(null);

  useEffect(() => {
    setPathname(location.pathname.slice(1).split("/"));
  }, [location]);

  const getFormatedText = (name: string): string => {
    switch (name) {
      case "Actualites":
        return "Actualités";
      case "Breves":
        return "Brèves";
      case "Rapports strategiques":
        return "Rapports stratégiques";
      case "Etudes":
        return "Études";
      case "Notre media":
        return "Notre média";
      default:
        return name;
    }
  };

  const isRapportsStrategiques =
    pathname && pathname.length > 0 && pathname[0] === "rapports-strategiques";
  const isMedia =
    pathname && pathname.length > 0 && pathname[0] === "notre-media";
  const isReview =
    pathname && pathname.length > 0 && pathname[0] === "notre-revue";
  const isBreves = pathname && pathname.length > 0 && pathname[0] === "breves";
  const isEtudes = pathname && pathname.length > 0 && pathname[0] === "etudes";

  const getNestedPath = (pathname: string): string => {
    if (
      pathname.includes("axe") ||
      pathname.includes("engagement-transverse")
    ) {
      return "nos-missions/";
    }

    switch (pathname) {
      case "rapports-strategiques":
        return "nos-ressources/";
      case "etudes":
        return "nos-ressources/";
      case "notre-media":
        return "nos-ressources/";
      case "notre-revue":
        return "nos-ressources";
      case "breves":
        return "actualites/";
      default:
        return "";
    }
  };

  return (
    <>
      {pathname && pathname[0].length > 0 && pathname[0] !== "accueil" && (
        <nav
          role="navigation"
          className={`fr-breadcrumb ${hasBannerTitle ? "decal-breadcumb" : ""}`}
          aria-label="vous êtes ici :"
        >
          <button
            className="fr-breadcrumb__button"
            aria-expanded="false"
            aria-controls="breadcrumb-1"
          >
            Voir le fil d’Ariane
          </button>
          <div className="fr-collapse" id="breadcrumb-1">
            <ol className="fr-breadcrumb__list">
              <li>
                <Link className="fr-breadcrumb__link" to="/">
                  Accueil
                </Link>
              </li>
              {(isEtudes || isReview || isMedia || isRapportsStrategiques) && (
                <li>
                  <Link className="fr-breadcrumb__link" to="/nos-ressources">
                    Nos Ressources
                  </Link>
                </li>
              )}
              {isBreves && (
                <li>
                  <Link className="fr-breadcrumb__link" to="/actualites">
                    Actualités
                  </Link>
                </li>
              )}
              {pathname.map((path, index) => {
                const currName =
                  path[0].toUpperCase() + path.split("-").join(" ").slice(1);
                return (
                  <React.Fragment key={index}>
                    {index < pathname.length - 1 ? (
                      <li>
                        <Link
                          className="fr-breadcrumb__link"
                          to={`/${getNestedPath(path)}${path}`}
                        >
                          {getFormatedText(currName)}
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <a className="fr-breadcrumb__link" aria-current="page">
                          {getFormatedText(currName)}
                        </a>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </div>
        </nav>
      )}
    </>
  );
};
