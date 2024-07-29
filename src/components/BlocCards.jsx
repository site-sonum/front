/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//// COMPONENTS ////
import { VerticalCard } from "./VerticalCard";
import { HorizontalCard } from "./HorizontalCard";

export const BlocCards = ({ articles, type }) => {
  const [subArticles, setSubArticles] = useState([]);
  const [cursor, setCursor] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [articleType, setArticleType] = useState(null);

  const offset = 7;

  const subDivideArticles = () => {
    const all = [];
    let sub = [];
    const multiple = type === "breve" ? 9 : 4;

    articles.forEach((art, index) => {
      if (index % multiple === 0) {
        all.push(sub);
        sub = [];
      }
      sub.push(art);
    });
    all.push(sub);
    setSubArticles(all.splice(1));
  };

  const updatePagination = () => {
    const tmpPagination = [];

    tmpPagination.push(
      <>
        <li key="first">
          <a
            className="fr-pagination__link fr-pagination__link--first"
            role="link"
            href="#"
            onClick={() => setCursor(1)}
          >
            Première page
          </a>
        </li>
        <li key="prev">
          <button
            className="fr-pagination__link fr-pagination__link--prev fr-pagination__link--lg-label"
            disabled={cursor === 1}
            onClick={() => setCursor(cursor > 1 ? cursor - 1 : cursor)}
          >
            Précédent
          </button>
        </li>
      </>,
    );

    if (subArticles.length <= offset) {
      for (let i = 1; i < subArticles.length + 1; i++) {
        tmpPagination.push(
          <li key={i}>
            <a
              className="fr-pagination__link"
              href="#"
              aria-current={cursor === i ? "true" : null}
              onClick={() => setCursor(i)}
            >
              {i}
            </a>
          </li>,
        );
      }
    } else if (subArticles.length > offset) {
      if (cursor < offset) {
        for (let i = 1; i < offset + 1; i++) {
          tmpPagination.push(
            <li key={i}>
              <a
                className="fr-pagination__link"
                href="#"
                aria-current={cursor === i ? "true" : null}
                onClick={() => setCursor(i)}
              >
                {i}
              </a>
            </li>,
          );
        }
      }

      if (cursor >= offset && cursor < subArticles.length - 1) {
        tmpPagination.push(
          <button
            className="fr-pagination__link fr-displayed-lg"
            disabled
            style={{ cursor: "default" }}
            key="ellipsis-1"
          >
            …
          </button>,
        );

        for (let i = cursor - 1; i < cursor + 2; i++) {
          tmpPagination.push(
            <li key={i}>
              <a
                className="fr-pagination__link"
                href="#"
                aria-current={cursor === i ? "true" : null}
                onClick={() => setCursor(i)}
              >
                {i}
              </a>
            </li>,
          );
        }

        tmpPagination.push(
          <button
            className="fr-pagination__link fr-displayed-lg"
            disabled
            style={{ cursor: "default" }}
            key="ellipsis-2"
          >
            …
          </button>,
        );
      }

      if (subArticles.length - cursor < 2) {
        tmpPagination.push(
          <button
            className="fr-pagination__link fr-displayed-lg"
            disabled
            style={{ cursor: "default" }}
            key="ellipsis-3"
          >
            …
          </button>,
        );

        const gap = subArticles.length - cursor === 1 ? 2 : 1;

        for (let i = cursor - 1; i < cursor + gap; i++) {
          tmpPagination.push(
            <li key={i}>
              <a
                className="fr-pagination__link fr-displayed-lg"
                href="#"
                onClick={() => setCursor(i)}
                aria-current={cursor === i ? "true" : null}
              >
                {i}
              </a>
            </li>,
          );
        }
      }
    }

    tmpPagination.push(
      <>
        <li key="next">
          <button
            className="fr-pagination__link fr-pagination__link--next fr-pagination__link--lg-label"
            disabled={cursor === subArticles.length}
            onClick={() =>
              setCursor(cursor < subArticles.length ? cursor + 1 : cursor)
            }
          >
            Suivant
          </button>
        </li>
        <li key="last">
          <a
            className="fr-pagination__link fr-pagination__link--last"
            href="#"
            onClick={() => setCursor(subArticles.length)}
          >
            Dernière page
          </a>
        </li>
      </>,
    );
    setPagination(tmpPagination);
  };

  useEffect(() => {
    subDivideArticles();
  }, [articles]);

  useEffect(() => {
    updatePagination();
  }, [subArticles, cursor]);

  useEffect(() => {
    if (type != null) {
      setArticleType(type);
      setCursor(1);
    }
  }, [type]);

  return (
    <>
      <div className="flexrow-container">
        <div className="grid3">
          {/* breves */}
          {articleType === "breve" &&
            subArticles[cursor - 1] &&
            subArticles[cursor - 1].map((article) => (
              <VerticalCard key={article.id} data={article} />
            ))}
        </div>
      </div>

      {/* publications stratégiques */}
      {articleType === "rapport-strategique" &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => (
          <HorizontalCard key={article.id} data={article} rows={1} />
        ))}
      {/* rapports de recherches */}
      {articleType === "etude" &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => (
          <HorizontalCard key={article.id} data={article} rows={1} />
        ))}

      <div className="flexrow-container">
        <nav
          role="navigation"
          className="fr-pagination"
          aria-label="Pagination"
        >
          <ul className="fr-pagination__list">{pagination}</ul>
        </nav>
      </div>
    </>
  );
};
