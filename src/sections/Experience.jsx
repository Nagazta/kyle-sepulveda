import styles from './Experience.module.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: 'Bachelor of Science in Information Technology',
      organization: 'Asian College of Technology - Cebu',
      date: '2022 - 2023',
      description: '1st year student, transferred to Cebu Institute of Technology - University.',
      type: 'education'
    },
{
      id: 2,
      title: 'Bachelor of Science in Information Technology',
      organization: 'Cebu Institute of Technology - University',
      date: '2024 - 2026',
      description: '3rd year student, expected graduation first semester next year.',
      type: 'education'
    },
    {
      id: 3,
      title: 'Core Volunteer',
      organization: 'PizzaPy',
      date: '2025 - Present',
      description: 'Speaker coordination and event support. PizzaPy is a volunteer-run Cebu Python community.',
      type: 'volunteer'
    },
    {
      id: 4,
      title: 'Core Member',
      organization: 'Google Developer Groups Cebu',
      date: '2025 - Present',
      description: 'Speaker coordination and collaboration with team leads.',
      type: 'volunteer'
    },
    {
      id: 5,
      title: 'Technical Volunteer',
      organization: 'DOHE Philippines',
      date: '2024 - Present',
      description: 'Handled technical operations for the event tech booth.',
      type: 'volunteer'
    },
    {
      id: 6,
      title: 'Website Team Member',
      organization: 'SEDS Philippines',
      date: '2024 - Present',
      description: 'Contributed to website development tasks.',
      type: 'volunteer'
    },
    {
      id: 7,
      title: 'Volunteer',
      organization: 'AI Pilipinas Cebu',
      date: '2024',
      description: 'Ushering, documentation, and registration support.',
      type: 'volunteer'
    },
    {
      id: 8,
      title: 'Volunteer',
      organization: 'JavaScript Cebu',
      date: '2024',
      description: 'Documentation and registration support.',
      type: 'volunteer'
    }
  ];

  return (
    <section id="experience" className={styles.experience}>
      <div className="container">
        <h2 className={styles.heading}>Experience & Education</h2>

        <div className={styles.timeline}>
          {experiences.map((item) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <h4 className={styles.organization}>{item.organization}</h4>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
