import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and process GitHub repository data for timeline visualization
 * Caches data in localStorage to minimize API calls and respect rate limits
 *
 * @param {string} username - GitHub username (default: 'Nagazta')
 * @returns {Object} { timelineData, loading, error }
 */
const useGithubTimeline = (username = 'Nagazta') => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Role mappings for specific projects
  const roles = {
    "BisaQuest": "Team Lead",
    "Hacktoberfest-2025": "Team Lead",
    "RoadWatch-IT342-G01-Group10": "Development Lead",
    "patuti": "Solo Developer",
    "CSIT327-G7-TechnoServe": "Team Lead",
    "freedom-wall": "Solo Developer"
  };

  useEffect(() => {
    const fetchGithubData = async () => {
      // Check cache first (valid for 1 hour)
      const cacheKey = `github_timeline_${username}`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);

      const ONE_HOUR = 60 * 60 * 1000;
      const now = Date.now();

      if (cachedData && cacheTimestamp && (now - parseInt(cacheTimestamp)) < ONE_HOUR) {
        // Parse cached data and convert date strings back to Date objects
        const parsed = JSON.parse(cachedData).map(project => ({
          ...project,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        }));
        setTimelineData(parsed);
        setLoading(false);
        return;
      }

      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers }
        );

        if (!reposResponse.ok) {
          throw new Error(`GitHub API error: ${reposResponse.status}`);
        }

        const repos = await reposResponse.json();

        // Process each repository
        const processedRepos = await Promise.all(
          repos
            .filter(repo => !repo.fork) // Exclude forked repos
            .map(async (repo) => {
              try {
                // Fetch commits for activity analysis
                const commitsResponse = await fetch(
                  `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100`,
                  { headers }
                );

                const commits = commitsResponse.ok ? await commitsResponse.json() : [];

                // Fetch languages
                const languagesResponse = await fetch(
                  `https://api.github.com/repos/${username}/${repo.name}/languages`,
                  { headers }
                );

                const languages = languagesResponse.ok ? await languagesResponse.json() : {};

                // Process commit timeline
                const commitsByMonth = {};
                commits.forEach(commit => {
                  if (commit.commit?.author?.date) {
                    const month = new Date(commit.commit.author.date).toISOString().slice(0, 7); // YYYY-MM
                    commitsByMonth[month] = (commitsByMonth[month] || 0) + 1;
                  }
                });

                // Determine status
                const lastCommitDate = commits[0]?.commit?.author?.date
                  ? new Date(commits[0].commit.author.date)
                  : new Date(repo.updated_at);

                const monthsSinceLastCommit = (now - lastCommitDate) / (30 * 24 * 60 * 60 * 1000);

                let status = 'ongoing';
                if (repo.homepage) {
                  status = 'live';
                } else if (monthsSinceLastCommit > 6) {
                  status = 'dormant';
                }

                // Get top 3 languages
                const topLanguages = Object.entries(languages)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([lang]) => lang);

                return {
                  id: repo.id,
                  name: repo.name,
                  description: repo.description || 'No description available',
                  role: roles[repo.name] || 'Contributor',
                  createdAt: new Date(repo.created_at),
                  updatedAt: new Date(repo.updated_at),
                  status,
                  githubUrl: repo.html_url,
                  homepage: repo.homepage || null,
                  languages: topLanguages,
                  commitsByMonth,
                  totalCommits: commits.length,
                  stars: repo.stargazers_count,
                };
              } catch (err) {
                console.warn(`Failed to fetch details for ${repo.name}:`, err);
                // Return basic repo info on error
                return {
                  id: repo.id,
                  name: repo.name,
                  description: repo.description || 'No description available',
                  role: roles[repo.name] || 'Contributor',
                  createdAt: new Date(repo.created_at),
                  updatedAt: new Date(repo.updated_at),
                  status: 'ongoing',
                  githubUrl: repo.html_url,
                  homepage: repo.homepage || null,
                  languages: [],
                  commitsByMonth: {},
                  totalCommits: 0,
                  stars: repo.stargazers_count,
                };
              }
            })
        );

        // Sort by creation date (newest first)
        const sortedData = processedRepos.sort((a, b) => b.createdAt - a.createdAt);

        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify(sortedData));
        localStorage.setItem(`${cacheKey}_timestamp`, now.toString());

        setTimelineData(sortedData);
        setError(null);
      } catch (err) {
        console.error('GitHub API fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  return { timelineData, loading, error };
};

export default useGithubTimeline;
