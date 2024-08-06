import { useState, useEffect } from "react";
import { HOST_URL } from "../env";
import { Link } from "react-router-dom";
import { fetchData } from "../functions/fetcher";
import { SocialLink } from "../types";
import { FooterContent } from "../types";

export const Footer: React.FC = () => {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [colMd, setColMd] = useState<string>("fr-col-md-8");
  const [footerLinks, setFooterLinks] = useState<
    FooterContent["liens_footer"][0]["liens_footer"]
  >([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const resp = await fetchData(HOST_URL + "/api/footer");
        setContent(resp.data.attributes);
      } catch (e) {
        console.error("Erreur", e);
      }
    };
    loadContent();
  }, []);

  useEffect(() => {
    if (content) {
      setColMd(
        content.afficher_section ? "fr-col-md-4 footer-padding" : "fr-col-md-8",
      );
      if (content.liens_footer) {
        setFooterLinks(content.liens_footer[0].liens_footer);
      }
      if (content.logo) {
        setLogoUrl(content.logo.data.attributes.url);
      }
    }
  }, [content]);

  const renderSocialLinks = () => {
    const socialLinks: SocialLink[] = [
      { platform: "facebook", url: content?.lien_facebook },
      { platform: "twitter", url: content?.lien_twitter },
      { platform: "instagram", url: content?.lien_instagram },
      { platform: "linkedin", url: content?.lien_linkedin },
      { platform: "youtube", url: content?.lien_youtube },
      { platform: "mastodon", url: content?.lien_mastodon, icon: true },
    ];

    return socialLinks
      .filter((link) => link.url)
      .map((link) => (
        <li key={link.platform}>
          <a
            className={`fr-link--${link.platform} fr-link`}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            title=""
          >
            {link.icon ? (
              <span className="fr-icon-mastodon-fill" aria-hidden="true"></span>
            ) : (
              link.platform
            )}
          </a>
        </li>
      ));
  };

  return (
    <>
      <div className="fr-follow">
        <div className="fr-container">
          <div className="fr-grid-row">
            {content?.afficher_section && (
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
                  <p className="fr-h5">{content?.titre}</p>
                  <p className="fr-text--sm">{content?.texte}</p>
                </div>
                <div>
                  <a
                    href={content?.lien_du_bouton}
                    className="fr-btn"
                    title={content?.texte_du_bouton}
                  >
                    {content?.texte_du_bouton}
                  </a>
                </div>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-follow__social footer-left-button">
                <p className="fr-h5">Suivez-nous sur les réseaux sociaux</p>
                <ul className="fr-links-group">{renderSocialLinks()}</ul>
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
                  src={`${HOST_URL}/uploads/rp_6c5a005a88.svg`}
                  style={{ width: "7rem" }}
                  alt="Logo"
                />
                {logoUrl && (
                  <img
                    src={`${HOST_URL}${logoUrl}`}
                    style={{ width: "9rem", marginLeft: "32px" }}
                    alt="Logo"
                  />
                )}
              </a>
            </div>
            <div className="fr-footer__content">
              <p className="fr-footer__content-desc">
                {content?.paragraphe_de_droite}
              </p>
              <ul className="fr-footer__content-list">
                {[
                  "https://legifrance.gouv.fr",
                  "https://gouvernement.fr",
                  "https://service-public.fr",
                  "https://data.gouv.fr",
                ].map((url) => (
                  <li className="fr-footer__content-item" key={url}>
                    <a
                      className="fr-footer__content-link"
                      target="_blank"
                      href={url}
                      rel="noreferrer"
                    >
                      {new URL(url).hostname}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="fr-footer__bottom">
            <ul className="fr-footer__bottom-list">
              {footerLinks.map((link) => (
                <li className="fr-footer__bottom-item" key={link.url}>
                  <Link
                    className="fr-footer__bottom-link"
                    to={link.url}
                    target={link.url.includes("https") ? "__blank" : undefined}
                  >
                    {link.titre_du_lien}
                  </Link>
                </li>
              ))}
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
