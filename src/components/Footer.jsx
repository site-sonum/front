import { useState } from "react";
import { HOST_URL } from "../env.js";
import { Link } from "react-router-dom";
//// FUNCTIONS ////
import { fetchData } from "../functions/fetcher.js";
import { useEffect } from "react";

export const Footer = () => {
  const [content, setContent] = useState([]);
  const [colMd, setColMd] = useState(null);
  const [footerLinks, setFooterLinks] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);

  const loadContent = async () => {
    try {
      const resp = await fetchData(HOST_URL + "/api/footer");
      setContent(resp.data.attributes);
    } catch (e) {
      console.log("Erreur", e);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    if (content) {
      content.afficher_section
        ? setColMd("fr-col-md-4 footer-padding")
        : setColMd("fr-col-md-8");
      if (content.liens_footer)
        setFooterLinks(content.liens_footer[0].liens_footer);
      if (content.logo) setLogoUrl(content.logo.data.attributes.url);
    }
  }, [content]);

  return (
    <>
      <div className="fr-follow">
        <div className="fr-container">
          <div className="fr-grid-row">
            {content.afficher_section && (
              <div className="fr-col-12 fr-col-md-4">
                <div>
                  <p className="fr-h5">{content.titre_abonnement}</p>
                  <a
                    href={content.lien_du_bouton_abonnement}
                    className="fr-btn footer-left-button"
                    title={content.texte_du_bouton_abonnement}
                  >
                    {content.texte_du_bouton_abonnement}
                  </a>
                </div>
              </div>
            )}
            <div className={`fr-col-12 ${colMd}`}>
              <div className="fr-follow__newsletter">
                <div>
                  <p className="fr-h5">{content.titre}</p>
                  <p className="fr-text--sm">{content.texte}</p>
                </div>
                <div>
                  <a
                    href={content.lien_du_bouton}
                    className="fr-btn"
                    title={content.texte_du_bouton}
                  >
                    {content.texte_du_bouton}
                  </a>
                </div>
              </div>
            </div>

            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-follow__social footer-left-button">
                <p className="fr-h5">Suivez-nous sur les réseaux sociaux</p>
                <ul className="fr-links-group">
                  {content.lien_facebook != null && (
                    <li>
                      <a
                        className="fr-link--facebook fr-link"
                        title=""
                        href={content.lien_facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        facebook
                      </a>
                    </li>
                  )}
                  {content.lien_twitter != null && (
                    <li>
                      <a
                        className="fr-link--twitter fr-link"
                        title=""
                        href={content.lien_twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        twitter
                      </a>
                    </li>
                  )}
                  {content.lien_instagram != null && (
                    <li>
                      <a
                        className="fr-link--instagram fr-link"
                        title=""
                        href={content.lien_instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        instagram
                      </a>
                    </li>
                  )}
                  {content.lien_linkedin != null && (
                    <li>
                      <a
                        className="fr-link--linkedin fr-link"
                        title=""
                        href={content.lien_linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        linkedin
                      </a>
                    </li>
                  )}
                  {content.lien_youtube != null && (
                    <li>
                      <a
                        className="fr-link--youtube fr-link"
                        title=""
                        href={content.lien_youtube}
                        target="_blank"
                        rel="noreferrer"
                      >
                        youtube
                      </a>
                    </li>
                  )}
                  {content.lien_mastodon != null && (
                    <li>
                      <a
                        className="fr-link"
                        title=""
                        href={content.lien_mastodon}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span
                          className="fr-icon-mastodon-fill"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="fr-footer" role="contentinfo" id="footer">
        <div className="fr-container">
          <div className="fr-footer__body">
            <div className="fr-footer__brand fr-enlarge-link">
              <a
                href="/"
                title="Accueil - ANCT"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={HOST_URL + "/uploads/rp_6c5a005a88.svg"}
                  style={{ width: "7rem" }}
                />
                {logoUrl && (
                  <img
                    src={HOST_URL + logoUrl}
                    style={{ width: "9rem", marginLeft: "32px" }}
                  />
                )}
              </a>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc">
                {content.paragraphe_de_droite}
              </p>
              <ul className="fr-footer__content-list">
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://legifrance.gouv.fr"
                    rel="noreferrer"
                  >
                    legifrance.gouv.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://gouvernement.fr"
                    rel="noreferrer"
                  >
                    gouvernement.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://service-public.fr"
                    rel="noreferrer"
                  >
                    service-public.fr
                  </a>
                </li>
                <li className="fr-footer__content-item">
                  <a
                    className="fr-footer__content-link"
                    target="_blank"
                    href="https://data.gouv.fr"
                    rel="noreferrer"
                  >
                    data.gouv.fr
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="fr-footer__bottom">
            <ul className="fr-footer__bottom-list">
              {footerLinks &&
                footerLinks.map((link) => {
                  return (
                    <li className="fr-footer__bottom-item">
                      <Link
                        className="fr-footer__bottom-link"
                        to={link.url}
                        target={link.url.includes("https") ? "__blank" : null}
                      >
                        {link.titre_du_lien}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className="fr-footer__bottom-copy">
              <p>
                Sauf mention explicite de propriété intellectuelle détenue par
                des tiers, les contenus de ce site sont proposés sous{" "}
                <a
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  licence etalab-2.0
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
