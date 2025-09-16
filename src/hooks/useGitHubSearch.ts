import { useState } from 'react';
import { GitHubSearchResponse, Repository } from '../types/Repository';

interface UseGitHubSearchResult {
  results: Repository[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  search: (query: string, page?: number) => Promise<void>;
}

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function useGitHubSearch(): UseGitHubSearchResult {
  const [results, setResults] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const search = async (query: string, page: number = 1) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setTotalCount(0);
    try {
      const headers: Record<string, string> = {};
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      }
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=24&page=${page}`,
        { headers }
      );
      if (response.status === 403) {
        setError('API rate limit exceeded. Please try again later or add a GitHub token.');
        setLoading(false);
        return;
      }
      if (!response.ok) {
        setError('Failed to fetch repositories.');
        setLoading(false);
        return;
      }
      const data: GitHubSearchResponse = await response.json();
      setResults(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, totalCount, search };
}
