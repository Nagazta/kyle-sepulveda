import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <h1 className={styles.name}>Hi, I'm Kyle Sepulveda</h1>
        <h2 className={styles.role}>Backend-Focused Developer</h2>
        <p className={styles.tagline}>
          From games to code—crafting backends that power ideas
        </p>

        <div className={styles.buttons}>
          <a href="#projects" className={styles.buttonPrimary}>
            View Projects
          </a>
          <a href="#contact" className={styles.buttonSecondary}>
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
