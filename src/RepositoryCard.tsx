import React from 'react';
import { Repository } from './types/Repository';

interface RepositoryCardProps {
  repo: Repository;
}

const icons = {
  star: (
    <svg className="w-4 h-4 text-yellow-400 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
  ),
  fork: (
    <svg className="w-4 h-4 text-gray-400 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2zm10-2a3 3 0 100 6 3 3 0 000-6zm0 2a1 1 0 110 2 1 1 0 010-2zM7 8a1 1 0 00-1 1v2.586A2 2 0 007.586 13L10 15.414V17a1 1 0 102 0v-1.586L12.414 13A2 2 0 0014 11.586V9a1 1 0 00-1-1H7z" /></svg>
  ),
  code: (
    <svg className="w-4 h-4 text-blue-400 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.293 15.707a1 1 0 010-1.414L13.586 11 10.293 7.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0zM9.707 7.707a1 1 0 010 1.414L6.414 11l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" /></svg>
  ),
};

const truncateDescription = (desc: string | null, maxLength = 100) => {
  if (!desc) return '';
  if (desc.length <= maxLength) return desc;
  return desc.slice(0, maxLength) + ' something...';
};

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repo }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-700 hover:underline">
          {repo.name}
        </a>
        <div className="text-sm text-gray-500 mb-2">{repo.owner.login}</div>
        <div className="text-gray-700 mb-3 min-h-[48px]">{truncateDescription(repo.description)}</div>
      </div>
      <div className="flex items-center text-sm space-x-4 mt-2">
        <span title="Stars">{icons.star}{repo.stargazers_count}</span>
        <span title="Forks">{icons.fork}{repo.forks_count}</span>
        {repo.language && <span title="Language">{icons.code}{repo.language}</span>}
      </div>
      <div className="text-xs text-gray-400 mt-2">Updated {new Date(repo.updated_at).toLocaleDateString()}</div>
    </div>
  );
};

export default RepositoryCard;
