import "./App.css";
import SearchForm from "../SearchForm/SearchForm";

export default function App() {
  const handleSearch = async (topic: string) => {
    console.log(topic);
  };

  return <SearchForm onSubmit={handleSearch} />;
}
