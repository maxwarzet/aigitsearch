import React from 'react';
import { Repository } from './types/Repository';
import RepositoryCard from './RepositoryCard';

interface RepositoryListProps {
  repos: Repository[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPagination(current: number, total: number) {
  const pages: (number | string)[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }
  if (current <= 4) {
    pages.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, '...', current - 1, current, current + 1, '...', total);
  }
  return pages;
}

const RepositoryList: React.FC<RepositoryListProps> = ({ repos, currentPage, totalPages, onPageChange }) => {
  if (repos.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No repositories found.</div>;
  }
  const pagination = getPagination(currentPage, totalPages);
  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
        {repos.map(repo => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`w-14 h-14 rounded-md flex items-center justify-center text-2xl font-bold transition-colors ${currentPage === 1 ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed' : 'bg-neutral-900 text-white hover:bg-neutral-700'}`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &lt;
        </button>
        {pagination.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={page}
              className={`w-14 h-14 rounded-md flex items-center justify-center text-xl font-bold transition-colors ${currentPage === page ? 'bg-rose-400 text-white' : 'bg-neutral-900 text-white hover:bg-neutral-700'}`}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={idx} className="w-14 h-14 flex items-center justify-center text-xl text-neutral-500">...</span>
          )
        )}
        <button
          className={`w-14 h-14 rounded-md flex items-center justify-center text-2xl font-bold transition-colors ${currentPage === totalPages ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed' : 'bg-rose-400 text-black hover:bg-rose-500'}`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>
    </>
  );
};

export default RepositoryList;
