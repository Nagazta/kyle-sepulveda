import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.techStack}>
        {project.techStack.map((tech) => (
          <span key={tech} className={styles.techBadge}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.links}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.link} ${styles.linkPrimary}`}
        >
          Live Demo
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
