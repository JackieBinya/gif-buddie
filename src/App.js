import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const useGiphy = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=OjkoDSslBEVy39pky6Do4CL9o0QrkjeE&q=${query}&limit=25&offset=0&rating=G&lang=en`);
        setResults(data.data.map((item) => item.images.preview.mp4));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (query !== '') {
      fetchData();
    }
  }, [query]);
  return { loading, results };
};


export const App = () => {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const { loading, results } = useGiphy(query);

  return (
    <main>
      <h1>Gif Buddie</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
      }}
      >
        <input
          type="text"
          placeholder="Search gifs here!!!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading
        ? <p>LOADING</p>
        : results.map((result) => <video autoPlay loop key={result} src={result} />)}
    </main>
  );
};
