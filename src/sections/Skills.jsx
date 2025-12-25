import { skills } from '../data/skills';
import styles from './Skills.module.css';

const Skills = () => {
  return (
    <section id="skills" className={styles.skills}>
      <div className="container">
        <h2 className={styles.heading}>Skills & Technologies</h2>

        <div className={styles.skillsGrid}>
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Frontend</h3>
            <div className={styles.skillList}>
              {skills.frontend.map((skill) => (
                <span key={skill} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Backend</h3>
            <div className={styles.skillList}>
              {skills.backend.map((skill) => (
                <span key={skill} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Tools & Others</h3>
            <div className={styles.skillList}>
              {skills.tools.map((skill) => (
                <span key={skill} className={styles.skillBadge}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
