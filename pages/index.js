import Navbar from '../components/Navbar.js'
import HeroSection from '../components/HeroSection.js'
import Projects from '../components/Projects.js';
import Footer from '@/components/Footer.js';

const HomePage = () => {
  return (
    <>
      <div className="container">
      <Navbar />
      </div>
      <HeroSection />
      <div className='container'>
        <Projects/>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;