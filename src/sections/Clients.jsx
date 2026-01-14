import { useState, useMemo } from 'react';
import { clients } from '../data/clients';
import ClientCard from '../components/ClientCard';
import styles from './Clients.module.css';

const ITEMS_PER_PAGE = 9;

const Clients = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(clients.length / ITEMS_PER_PAGE));

  const current = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return clients.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  return (
    <section id="clients" className={styles.clients}>
      <div className="container">
        <h2 className={styles.heading}>Clients</h2>
        <p className={styles.subheading}>Selected client engagements and a short note about the work delivered.</p>

        <div className={styles.grid}>
          {current.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Clients pagination">
            <button className={styles.pageButton} onClick={prev} disabled={page === 1} aria-label="Previous page">Prev</button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                return (
                  <button
                    key={p}
                    className={`${styles.pageButton} ${page === p ? styles.active : ''}`}
                    onClick={() => goTo(p)}
                    aria-current={page === p ? 'page' : undefined}
                    aria-label={`Go to page ${p}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
            <button className={styles.pageButton} onClick={next} disabled={page === totalPages} aria-label="Next page">Next</button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default Clients;
