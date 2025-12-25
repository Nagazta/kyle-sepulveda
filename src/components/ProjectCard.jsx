import { useState } from 'react';
import Modal from './Modal';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDemoClick = (e) => {
    if (!project.demo) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const renderTechStack = () => {
    const techCategories = [];

    if (project.tech.frontend) {
      techCategories.push({ label: 'Frontend', value: project.tech.frontend });
    }
    if (project.tech.backend) {
      techCategories.push({ label: 'Backend', value: project.tech.backend });
    }
    if (project.tech.tools) {
      techCategories.push({ label: 'Tools', value: project.tech.tools });
    }

    return techCategories.map((category, index) => (
      <span key={category.label} className={styles.techCategory}>
        <span className={styles.techLabel}>{category.label}:</span> {category.value}
        {index < techCategories.length - 1 && <span className={styles.techSeparator}> • </span>}
      </span>
    ));
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <span className={styles.roleBadge}>{project.role}</span>
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.links}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkPrimary}`}
            >
              Live Demo
            </a>
          ) : (
            <button
              onClick={handleDemoClick}
              className={`${styles.link} ${styles.linkPrimary} ${styles.linkDisabled}`}
            >
              Live Demo
            </button>
          )}
        </div>

        <div className={styles.techFooter}>
          {renderTechStack()}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Project In Progress</h3>
          <p className={styles.modalText}>
            This project is currently ongoing and has no live deployment yet.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ProjectCard;
