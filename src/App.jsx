import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import ProjectsTimeline from './sections/ProjectsTimeline';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ProjectsTimeline />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
