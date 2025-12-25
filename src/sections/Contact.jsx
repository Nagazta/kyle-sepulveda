import styles from './Contact.module.css';

const Contact = () => {
  const contactInfo = [
    {
      label: 'Email',
      value: 'kyle.sepulveda27@gmail.com',
      link: 'mailto:kyle.sepulveda27@gmail.com'
    },
    {
      label: 'GitHub',
      value: 'github.com/Nagazta',
      link: 'https://github.com/Nagazta'
    },
    {
      label: 'LinkedIn',
      value: 'Kyle Sepulveda',
      link: 'https://linkedin.com/in/kyle-sepulveda'
    }
  ];

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <h2 className={styles.heading}>Get In Touch</h2>
        <p className={styles.subheading}>
          I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
        </p>

        <div className={styles.contactGrid}>
          {contactInfo.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <h3 className={styles.contactLabel}>{item.label}</h3>
              <p className={styles.contactValue}>{item.value}</p>
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a
            href="mailto:kyle.sepulveda27@gmail.com"
            className={styles.ctaButton}
          >
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
