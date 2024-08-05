import * as React from "react";
import { useEffect, useState } from "react";
import { VerticalCard } from "./VerticalCard";
import { HorizontalCard } from "./HorizontalCard";
import { BlocCardArticle } from "../types";

type BlocCardsProps = {
  articles: BlocCardArticle[];
  type: "breve" | "rapport-strategique" | "etude" | null;
};

export const BlocCards: React.FC<BlocCardsProps> = ({ articles, type }) => {
  const [subArticles, setSubArticles] = useState<BlocCardArticle[][]>([]);
  const [cursor, setCursor] = useState<number>(1);
  const [pagination, setPagination] = useState<React.ReactNode | null>(null);
  const [articleType, setArticleType] = useState<BlocCardsProps["type"]>(null);

  useEffect(() => {
    if (articles.length > 0) {
      const all: BlocCardArticle[][] = [];
      let sub: BlocCardArticle[] = [];
      const multiple = type === "breve" ? 9 : 4;

      articles.forEach((art, index) => {
        if (index % multiple === 0) {
          if (sub.length > 0) all.push(sub);
          sub = [];
        }
        sub.push(art);
      });
      if (sub.length > 0) all.push(sub);
      setSubArticles(all);
    }
  }, [articles, type]);

  useEffect(() => {
    const tmpPagination: React.ReactNode[] = [];
    if (subArticles.length > 0) {
      tmpPagination.push(
        <li key="1">
          <a href="#" onClick={() => setCursor(1)}>
            1
          </a>
        </li>,
      );
    }
    setPagination(tmpPagination);
  }, [subArticles, cursor]);

  useEffect(() => {
    if (type != null) {
      setArticleType(type);
      setCursor(1);
    }
  }, [type]);

  return (
    <div>
      {articleType === "breve" &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => (
          <VerticalCard
            key={article.id}
            data={article}
            rows={articleType === "breve" ? 1 : 2}
          />
        ))}
      {articleType === "rapport-strategique" &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => (
          <HorizontalCard key={article.id} data={article} rows={1} />
        ))}
      {articleType === "etude" &&
        subArticles[cursor - 1] &&
        subArticles[cursor - 1].map((article) => (
          <HorizontalCard key={article.id} data={article} rows={1} />
        ))}
      <nav aria-label="Pagination">
        <ul>{pagination}</ul>
      </nav>
    </div>
  );
};
