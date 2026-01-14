import { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from './ClientCard.module.css';
import modalStyles from './Modal.module.css';

const ClientCard = ({ client }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = client.images && client.images.length ? client.images : client.image ? [client.image] : [];

  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const openLightbox = (index = 0) => {
    if (images.length === 0) return;
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const prev = (e) => {
    e && e.stopPropagation();
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e) => {
    e && e.stopPropagation();
    setCurrentIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') setCurrentIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setCurrentIndex((i) => (i + 1) % images.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLightboxOpen, images.length]);

  useEffect(() => {
    if (images.length < 2 || isLightboxOpen || paused) return;
    const id = setInterval(() => {
      setSlideshowIndex((i) => (i + 1) % images.length);
    }, 4000); // change delay here (ms) to 3000-5000 as you prefer
    return () => clearInterval(id);
  }, [images.length, isLightboxOpen, paused]);

  return (
    <>
    <div
      className={styles.card}
      onClick={() => openLightbox(slideshowIndex)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(slideshowIndex); }}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{client.name}</h3>
        <span className={styles.year}>{client.year}</span>
      </div>

      <p className={styles.project}><strong>Project:</strong> {client.project}</p>

      {(() => {
        if (images.length === 0) return null;

        return (
          <div className={styles.gallerySingle}>
            <div
              className={styles.slideshow}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onClick={(e) => { e.stopPropagation(); openLightbox(slideshowIndex); }}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${client.name} project ${idx + 1}`}
                  className={`${styles.slideImage} ${idx === slideshowIndex ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>
        );
      })()}

      {client.testimonial && (
        <blockquote className={styles.testimonial}>
          "{client.testimonial}"
        </blockquote>
      )}

      <div className={styles.footer}>
        {client.link ? (
          <a
            href={client.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            onClick={(e) => e.stopPropagation()}
          >
            View
          </a>
        ) : (
          <span className={styles.noLink}>No public link</span>
        )}
      </div>
    </div>

    <Modal isOpen={isLightboxOpen} onClose={closeLightbox} className={modalStyles.modalWide}>
      <div className={styles.lightbox}>
        <div className={styles.lbImageWrap}>
          <img src={images[currentIndex]} alt={`${client.name} ${currentIndex + 1}`} className={styles.lbImage} />
        </div>

        <div className={styles.lbControls}>
          <button className={styles.lbNav} onClick={prev} aria-label="Previous image">‹</button>
          <div className={styles.lbCounter}>{currentIndex + 1} / {images.length}</div>
          <button className={styles.lbNav} onClick={next} aria-label="Next image">›</button>
        </div>

        <div className={styles.lbThumbs}>
          {images.map((src, i) => (
            <button key={i} className={`${styles.lbThumb} ${i === currentIndex ? styles.lbThumbActive : ''}`} onClick={() => setCurrentIndex(i)}>
              <img src={src} alt={`thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>
    </Modal>
    </>
  );
};

export default ClientCard;
