import axios from 'axios';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { type Article } from '../../types/article';
import ArticleList from '../ArticleList/ArticleList';
import Modal from '../Modal/Modal';
import SearchForm from '../SearchForm/SearchForm';
import './App.css';

interface ArticlesHttpResponse {
  hits: Article[];
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await axios.get<ArticlesHttpResponse>(
        `https://hn.algolia.com/api/v1/search?query=${topic}`
      );
      setArticles(response.data.hits);
      console.log(response.data.hits);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={openModal}>Run Modal !!!</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <ArticleList items={articles} />
        </Modal>
      )}

      <SearchForm onSubmit={handleSearch} />
      {isLoading && (
        <Bars
          height="30"
          width="30"
          color="#2b9ace"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}
