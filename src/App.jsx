import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Clients from './sections/Clients';
import ProjectsTimeline from './sections/ProjectsTimeline';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Chatbot from './components/chatbot/Chatbot';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Clients />
        <ProjectsTimeline />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
