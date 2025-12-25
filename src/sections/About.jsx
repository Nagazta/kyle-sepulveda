import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <h2 className={styles.heading}>About Me</h2>

        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              I started programming out of a gamer's curiosity about computers and tech.
              Over time, that interest grew into building side projects that sharpen my skills.
              I enjoy experimenting with ideas, learning by doing, and solving practical problems.
            </p>
            <p>
              Right now I'm focusing more on backend development—while keeping a solid frontend
              foundation—and I'm eager to explore emerging areas like AI and blockchain in Web3.
            </p>
          </div>

          <div className={styles.highlights}>
            <div className={styles.highlightCard}>
              <h3>Backend Focus</h3>
              <p>Building robust APIs and server-side systems with modern frameworks</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Learning</h3>
              <p>Exploring AI, Web3, and blockchain while sharpening core development skills</p>
            </div>
            <div className={styles.highlightCard}>
              <h3>Community</h3>
              <p>Active in tech communities through volunteering and event support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
