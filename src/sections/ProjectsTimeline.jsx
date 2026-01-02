import { useMemo, useState } from 'react';
import useGithubTimeline from '../hooks/useGithubTimeline';
import styles from './ProjectsTimeline.module.css';

/**
 * ProjectsTimeline - Dynamic timeline visualization of GitHub projects
 * Displays projects chronologically across a Jan-Dec timeline with activity indicators
 * Paginated view showing 3 projects per page, sorted by most recent activity
 */
const ProjectsTimeline = () => {
  const { timelineData, loading, error } = useGithubTimeline('Nagazta');
  const currentYear = new Date().getFullYear();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const projectsPerPage = 3;

  // Generate months array for timeline
  const months = useMemo(() => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ], []);

  // Get available years from project data
  const availableYears = useMemo(() => {
    const years = new Set();
    timelineData.forEach(project => {
      const createdYear = project.createdAt.getFullYear();
      const updatedYear = project.updatedAt.getFullYear();

      // Add all years between created and updated
      for (let year = createdYear; year <= updatedYear; year++) {
        years.add(year);
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Newest first
  }, [timelineData]);

  // Filter and sort projects by status and year, then by total commits (descending)
  const { paginatedProjects, totalPages, filteredCount } = useMemo(() => {
    // Filter by year - include projects active during selected year
    const yearFiltered = timelineData.filter(project => {
      const createdYear = project.createdAt.getFullYear();
      const updatedYear = project.updatedAt.getFullYear();
      return selectedYear >= createdYear && selectedYear <= updatedYear;
    });

    // Filter by status
    const filtered = statusFilter === 'all'
      ? yearFiltered
      : yearFiltered.filter(project => project.status === statusFilter);

    // Sort by total commits (descending)
    const sorted = [...filtered].sort((a, b) => b.totalCommits - a.totalCommits);

    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const paginated = sorted.slice(startIndex, endIndex);
    const pages = Math.ceil(sorted.length / projectsPerPage);

    return {
      paginatedProjects: paginated,
      totalPages: pages,
      filteredCount: sorted.length
    };
  }, [timelineData, currentPage, statusFilter, selectedYear]);

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  // Reset to page 1 when year changes
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  /**
   * Calculate which months a project spans across for the selected year
   */
  const getProjectMonthSpan = (project) => {
    const startMonth = project.createdAt.getMonth();
    const endMonth = project.updatedAt.getMonth();
    const startYear = project.createdAt.getFullYear();
    const endYear = project.updatedAt.getFullYear();

    // For multi-year projects in selected year, show full range
    if (startYear < selectedYear && endYear > selectedYear) {
      return { start: 0, end: 11, isOngoing: project.status !== 'dormant' };
    }

    // For projects created before selected year but updated during selected year
    if (startYear < selectedYear && endYear === selectedYear) {
      return { start: 0, end: endMonth, isOngoing: project.status !== 'dormant' };
    }

    // For projects created during selected year
    if (startYear === selectedYear && endYear === selectedYear) {
      return { start: startMonth, end: endMonth, isOngoing: project.status !== 'dormant' };
    }

    // For projects created during selected year but still active after
    if (startYear === selectedYear && endYear > selectedYear) {
      return { start: startMonth, end: 11, isOngoing: project.status !== 'dormant' };
    }

    // Default fallback
    return { start: startMonth, end: endMonth, isOngoing: false };
  };

  /**
   * Check if project has commits in a specific month
   */
  const hasCommitInMonth = (project, monthIndex) => {
    const monthKey = `${selectedYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    return project.commitsByMonth && project.commitsByMonth[monthKey] > 0;
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'live': return styles.statusLive;
      case 'ongoing': return styles.statusOngoing;
      case 'dormant': return styles.statusDormant;
      default: return styles.statusOngoing;
    }
  };

  if (loading) {
    return (
      <section id="timeline" className={styles.timeline}>
        <div className={styles.container}>
          <h2 className={styles.title}>Project Timeline</h2>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading GitHub projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="timeline" className={styles.timeline}>
        <div className={styles.container}>
          <h2 className={styles.title}>Project Timeline</h2>
          <div className={styles.error}>
            <p>⚠️ Unable to load timeline data</p>
            <p className={styles.errorDetail}>{error}</p>
            <p className={styles.errorHint}>Check your GitHub token configuration</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" className={styles.timeline}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Project Timeline</h2>
            <p className={styles.subtitle}>
              Interactive timeline showing project activity and development progress
            </p>
          </div>

          {/* Year Selector */}
          {availableYears.length > 1 && (
            <div className={styles.yearSelector}>
              <label htmlFor="year-select" className={styles.yearLabel}>Year:</label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className={styles.yearSelect}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className={styles.filterContainer}>
          <div className={styles.filterLabel}>Filter by Status:</div>
          <div className={styles.filterButtons}>
            <button
              onClick={() => handleFilterChange('all')}
              className={`${styles.filterBtn} ${statusFilter === 'all' ? styles.active : ''}`}
            >
              All
              <span className={styles.filterCount}>{timelineData.length}</span>
            </button>
            <button
              onClick={() => handleFilterChange('live')}
              className={`${styles.filterBtn} ${styles.filterLive} ${statusFilter === 'live' ? styles.active : ''}`}
            >
              Live
              <span className={styles.filterCount}>
                {timelineData.filter(p => p.status === 'live').length}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange('ongoing')}
              className={`${styles.filterBtn} ${styles.filterOngoing} ${statusFilter === 'ongoing' ? styles.active : ''}`}
            >
              Ongoing
              <span className={styles.filterCount}>
                {timelineData.filter(p => p.status === 'ongoing').length}
              </span>
            </button>
            <button
              onClick={() => handleFilterChange('dormant')}
              className={`${styles.filterBtn} ${styles.filterDormant} ${statusFilter === 'dormant' ? styles.active : ''}`}
            >
              Dormant
              <span className={styles.filterCount}>
                {timelineData.filter(p => p.status === 'dormant').length}
              </span>
            </button>
          </div>
          {statusFilter !== 'all' && (
            <div className={styles.filterInfo}>
              Showing {filteredCount} {statusFilter} project{filteredCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Month Headers */}
        <div className={styles.monthsHeader}>
          <div className={styles.projectLabel}>Project</div>
          {months.map((month) => (
            <div key={month} className={styles.monthLabel}>
              {month}
            </div>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className={styles.timelineGrid}>
          {paginatedProjects.map((project) => {
            const span = getProjectMonthSpan(project);

            return (
              <div key={project.id} className={styles.timelineRow}>
                {/* Project Info Card */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectName}>{project.name}</h3>
                    <div className={styles.badges}>
                      {project.isPrivate && (
                        <span className={styles.privateBadge}>
                          Private
                        </span>
                      )}
                      <span className={`${styles.statusBadge} ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <p className={styles.projectRole}>{project.role}</p>
                  <div className={styles.projectMeta}>
                    {project.languages.length > 0 && (
                      <div className={styles.techStack}>
                        {project.languages.map((lang) => (
                          <span key={lang} className={styles.techBadge}>
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className={styles.projectLinks}>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label="GitHub"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      {project.homepage && (
                        <a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconLink}
                          aria-label="Live Demo"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Month Activity Indicators */}
                <div className={styles.monthsTrack}>
                  {months.map((month, index) => {
                    const isActive = index >= span.start && index <= span.end;
                    const hasCommit = hasCommitInMonth(project, index);
                    const isStart = index === span.start;
                    const isEnd = index === span.end;

                    return (
                      <div
                        key={month}
                        className={`${styles.monthCell} ${isActive ? styles.active : ''}`}
                      >
                        {isActive && (
                          <>
                            {isStart && <div className={styles.startMarker} />}
                            {hasCommit && (
                              <div className={styles.commitDot} title={`Commits in ${month}`} />
                            )}
                            {isEnd && span.isOngoing && (
                              <div className={styles.ongoingPulse} title="Ongoing" />
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={styles.paginationBtn}
              aria-label="Previous page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </button>

            <span className={styles.pageText}>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={styles.paginationBtn}
              aria-label="Next page"
            >
              Next
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} />
            <span>Active Commits</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendPulse} />
            <span>Ongoing Development</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendBadge} ${styles.statusLive}`} />
            <span>Live</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendBadge} ${styles.statusOngoing}`} />
            <span>In Progress</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendBadge} ${styles.statusDormant}`} />
            <span>Dormant</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsTimeline;
