/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { buildComponents } from "./functions/componentsbuilder.js";
import { buildSections } from "./functions/componentsbuilder.js";
import { TextArea } from "./components/TextArea.jsx";
import React from "react";
///FUNCTIONS///
import { sortArticles } from "./functions/sortarticles.js";
import { HOST_URL } from "./env.js";
import { labelColors } from "./structs";
import { position } from "./structs";
import { marginsBottom } from "./structs";
///COMPONENTS///
import { Banner } from "./components/Banner.jsx";
import { HorizontalCard } from "./components/HorizontalCard.jsx";
import { VerticalCard } from "./components/VerticalCard.jsx";
import { BlocFields } from "./components/BlocFields.jsx";
import { AnchorNavigator } from "./components/AnchorNavigator.tsx";
import { BlocCards } from "./components/BlocCards.jsx";
import { Quote } from "./components/Quote.jsx";
import { Media } from "./components/Media.jsx";
import { MiseEnAvant } from "./components/MiseEnAvant";
import { Button } from "./components/Button.jsx";
import { ButtonGroup } from "./components/ButtonGroup.jsx";
import { NavLink } from "./components/NavLink.jsx";
import { DownloadLink } from "./components/DownloadLink.jsx";
import { DownloadCard } from "./components/DownloadCard.jsx";
import { Accordion } from "./components/Accordion.tsx";
import { Title } from "./components/Title.jsx";
import { Iframe } from "./components/Iframe.jsx";
import { RollingCard } from "./components/RollingCard.jsx";
import { BreadCrumb } from "./components/BreadCrumb.jsx";
import { BannerTitle } from "./components/BannerTitle.jsx";
import { ToolsDevicesContainer } from "./components/ToolsDevicesContainer.jsx";

export const PageBuilder = ({
  data,
  dataArticles,
  dataToolsDevices = null,
  slug = null,
  isHome,
}) => {
  const [fluxPublications, setFluxPublications] = useState([]);
  const [fluxActualites, setFluxActualites] = useState([]);
  const [breves, setBreves] = useState([]);
  const [strategiques, setStrategiques] = useState([]);
  const [recherches, setRecherches] = useState([]);
  const [bannerTitle, setBannerTitle] = useState(null);
  const location = useLocation();

  const allComponents = buildComponents(data);
  const struct = buildSections(allComponents);
  const array = struct[1];
  const hasBannerTitle = array && array.some((e) => e.type == "bandeau-titre");

  useEffect(() => {
    if (dataArticles.length > 0) {
      /// EXCLUSION LIST ///
      // 0 = breves
      // 1 = publications strategiques
      // 2 = rapports de recherches
      //////////////////////////
      //                                                ↓[Types d'articles qu'on exclu, voir liste juste au dessus]
      const withoutBreves = sortArticles(dataArticles, [0]);
      const onlyBreves = sortArticles(dataArticles, [1, 2]);
      const onlyStrategiques = sortArticles(dataArticles, [0, 2]);
      const onlyRecherches = sortArticles(dataArticles, [0, 1]);

      setFluxPublications(withoutBreves.slice(0, 2));
      setFluxActualites(onlyBreves.slice(0, 3));

      setBreves(onlyBreves);
      setStrategiques(onlyStrategiques);
      setRecherches(onlyRecherches);
    }
  }, [dataArticles]);

  useEffect(() => {
    setBannerTitle(null);
  }, [location.pathname]);

  return (
    <>
      {isHome && <Banner />}
      {hasBannerTitle && bannerTitle != null && (
        <BannerTitle data={bannerTitle}></BannerTitle>
      )}
      <div className="fr-container mb2">
        <BreadCrumb hasBannerTitle={hasBannerTitle}></BreadCrumb>
        {array ? (
          array.map((e) => {
            switch (e.type) {
              case "badge":
                return (
                  <div
                    className={
                      position[e.position] == "left" ||
                      position[e.position] == "right"
                        ? `${position[e.position]}`
                        : "center"
                    }
                    style={{ margin: "32px" }}
                  >
                    <p
                      className={`fr-badge fr-badge--${labelColors[e.couleur]}`}
                    >
                      {e.texte}{" "}
                    </p>
                  </div>
                );
                // eslint-disable-next-line no-unreachable
                break;
              case "bloc-de-texte":
                return (
                  <div>
                    <TextArea data={e} row={null} />
                  </div>
                );
                // eslint-disable-next-line no-unreachable
                break;
              case "titre":
                return <Title data={e} />;
                // eslint-disable-next-line no-unreachable
                break;
              case "bouton":
                return <Button data={e} rows={1} />;
                // eslint-disable-next-line no-unreachable
                break;
              case "groupe-de-boutons":
                return <ButtonGroup data={e} rows={1} />;
                break;
              case "carte-verticale":
                return <VerticalCard data={e} rows={1} />;
                break;
              case "carte-horizontale":
                return <HorizontalCard data={e} rows={1} />;
                // eslint-disable-next-line no-unreachable
                break;
              case "flux-de-publications":
                return (
                  <div
                    key={e.id}
                    style={{ marginBottom: marginsBottom[e.espacement_bas] }}
                  >
                    <div className="grid2">
                      {fluxPublications &&
                        fluxPublications.map((flux) => {
                          return (
                            <HorizontalCard
                              data={flux}
                              rows={2}
                              displayText={false}
                              fluxTwo={true}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
                break;
              case "flux-actualite":
                return (
                  <div
                    className="flexrow-container"
                    style={{ marginBottom: marginsBottom[e.espacement_bas] }}
                  >
                    <div className="grid3">
                      {fluxActualites &&
                        fluxActualites.map((flux) => {
                          return <VerticalCard data={flux} rows={3} />;
                        })}
                    </div>
                  </div>
                );
                break;
              case "champ-de-blocs":
                return <BlocFields data={e} />;
                break;
              case "navigation":
                return <AnchorNavigator data={e} />;
                break;
              case "ancre":
                return <div className="translate-header-margin" id={e.ancre} />;
                break;
              case "bloc-de-breves":
                return <BlocCards articles={breves} type="breve" />;
                break;
              case "bloc-de-publications-strategiques":
                return (
                  <BlocCards
                    articles={strategiques}
                    type="rapport-strategique"
                  />
                );
                break;
              case "bloc-de-rapports-de-recherches":
                return <BlocCards articles={recherches} type="etude" />;
                break;
              case "citation":
                return <Quote data={e} />;
                break;
              case "mise-en-avant":
                return <MiseEnAvant data={e} />;
                break;
              case "media":
                return <Media data={e} rows={1} />;
                break;
              case "lien-hypertexte":
                return <NavLink data={e} rows={1} />;
                break;
              case "telechargement":
                return <DownloadLink data={e} rows={1} />;
                break;
              case "carte-telechargement":
                return <DownloadCard data={e} rows={1} />;
                break;
              case "accordeon":
                return <Accordion data={e} rows={1} />;
                break;
              case "iframe":
                return <Iframe data={e} rows={1} />;
                break;
              case "carte-deroulante":
                return <RollingCard data={e} />;
                break;
              case "bandeau-titre":
                if (bannerTitle == null) setBannerTitle(e);
                break;
              case "flux-dispositifs":
                return (
                  <ToolsDevicesContainer
                    data={dataToolsDevices}
                    slug={slug}
                    type={"Dispositif"}
                  />
                );
                break;
              case "flux-outils":
                return (
                  <ToolsDevicesContainer
                    data={dataToolsDevices}
                    slug={slug}
                    type={"Outil"}
                  />
                );
                break;
              case "section":
                const sections = buildSections(allComponents)[0];
                if (sections) {
                  const currentSection = sections.find(
                    (i) => i.sectionId == e.id,
                  );
                  let gridType = 0;
                  if (currentSection) {
                    gridType = `grid${currentSection.rows}`;
                    return (
                      <div className="flexrow-container">
                        <div
                          className={gridType}
                          style={{
                            marginBottom: marginsBottom[e.espacement_bas],
                          }}
                        >
                          {currentSection.elements.map((c) => {
                            switch (c.type) {
                              case "badge":
                                return (
                                  <div key={c.id}>
                                    <p
                                      className={`fr-badge fr-badge--${labelColors[c.couleur]}`}
                                    >
                                      {c.texte}{" "}
                                    </p>
                                  </div>
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "bloc-de-texte":
                                return (
                                  <div key={c.id}>
                                    <TextArea
                                      texte={c.texte}
                                      position={null}
                                      row={currentSection.rows}
                                    />
                                  </div>
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "titre":
                                return (
                                  <div key={c.id}>
                                    {e.taille == "h1" && <h1>{e.titre}</h1>}
                                    {e.taille == "h2" && <h2>{e.titre}</h2>}
                                    {e.taille == "h3" && <h3>{e.titre}</h3>}
                                    {e.taille == "h4" && <h4>{e.titre}</h4>}
                                    {e.taille == "h5" && <h5>{e.titre}</h5>}
                                    {e.taille == "h6" && <h6>{e.titre}</h6>}
                                  </div>
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "bouton":
                                return (
                                  <Button data={c} rows={currentSection.rows} />
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "groupe-de-boutons":
                                return (
                                  <ButtonGroup
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                break;
                              case "carte-verticale":
                                return (
                                  <VerticalCard
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "carte-horizontale":
                                return (
                                  <HorizontalCard
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                // eslint-disable-next-line no-unreachable
                                break;
                              case "lien-hypertexte":
                                return (
                                  <NavLink
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                break;
                              case "telechargement":
                                return (
                                  <DownloadLink
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                break;
                              case "carte-telechargement":
                                return (
                                  <DownloadCard
                                    data={c}
                                    rows={currentSection.rows}
                                  />
                                );
                                break;
                            }
                          })}
                        </div>
                      </div>
                    );
                  }
                }
                break;
            }
          })
        ) : (
          <h3 style={{ textAlign: "center" }}>En construction...</h3>
        )}
      </div>
    </>
  );
};
