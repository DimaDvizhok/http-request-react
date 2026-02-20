import "./App.css";
import SearchForm from "../SearchForm/SearchForm";
import axios from "axios";
import { useState } from "react";
import { type Article } from "../../types/article";
import ArticleList from "../ArticleList/ArticleList";

interface ArticlesHttpResponse {
  hits: Article[];
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  const handleSearch = async (topic: string) => {
    const response = await axios.get<ArticlesHttpResponse>(
      `https://hn.algolia.com/api/v1/search?query=${topic}`,
    );
    console.log(response.data.hits);
    setArticles(response.data.hits);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}
