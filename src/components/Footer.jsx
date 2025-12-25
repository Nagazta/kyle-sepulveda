import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Nagazta' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/kyle-sepulveda' },
    { name: 'Email', url: 'mailto:kyle.sepulveda27@gmail.com' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <p className={styles.copyright}>
          © {currentYear} Kyle Sepulveda. All rights reserved.
        </p>
        <div className={styles.socialLinks}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
