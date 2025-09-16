import React, { useState } from 'react';
import SearchBar from './SearchBar';
import RepositoryList from './RepositoryList';
import { useGitHubSearch } from './hooks/useGitHubSearch';

const RESULTS_PER_PAGE = 24;

function App() {
  const { results, loading, error, totalCount, search } = useGitHubSearch();
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (query: string) => {
    setSearched(true);
    setCurrentPage(1);
    setLastQuery(query);
    await search(query, 1);
  };

  const totalPages = Math.ceil(totalCount / RESULTS_PER_PAGE);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    if (lastQuery) {
      await search(lastQuery, page);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 transition-colors duration-300">
      <header className="bg-white shadow p-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">GitHub Repository Search</h1>
      </header>
      <SearchBar onSearch={handleSearch} loading={loading} />
      <main className="flex-1 w-full max-w-7xl mx-auto">
        {error && <div className="text-red-600 text-center mt-6">{error}</div>}
        {loading && <div className="text-center mt-6 text-gray-500">Loading...</div>}
        {!loading && searched && !error && (
          <>
            <div className="text-gray-600 text-sm mt-6 mb-2 text-center">{totalCount.toLocaleString()} repositories found</div>
            <RepositoryList
              repos={results}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
      <footer className="bg-white border-t p-4 text-center text-xs text-gray-400">
        Created by <a href="https://t.me/MakhmudHojiev" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Makhmud Hojiev</a>.
      </footer>
    </div>
  );
}

export default App;
