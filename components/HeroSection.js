const HeroSection = () => {
    return (
        <section className="hero-container">
        <div className="heroSection">
          <h1>👋 Hello, I’m Manu</h1>
          <p>
            I'm a Full Stack Developer 👨🏻‍💻 and a Junior studying Engineering 🏫<br></br>
            I write about my projects and learnings on my <a href='/blog' className="a-link">blog</a>.
          </p>
          <a href="#projects"><button className="primary-btn">View Projects</button></a>
        </div>
      </section>
    );
}
export default HeroSection;