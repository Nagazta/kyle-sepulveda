import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import styles from './Projects.module.css';

const Projects = () => {
  return (
    <section id="projects" className={styles.projects}>
      <div className="container">
        <h2 className={styles.heading}>Featured Projects</h2>
        <p className={styles.subheading}>
          A selection of projects I've built to learn and practice modern web development
        </p>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
