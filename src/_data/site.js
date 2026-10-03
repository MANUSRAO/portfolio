// Netlify sets URL to the site's primary URL at build time; override with
// SITE_URL for other hosts. Falls back to the local dev server.
const url = (process.env.SITE_URL || process.env.URL || "http://localhost:8080").replace(/\/$/, "");

export default {
  url,
  title: "Manu S Rao | Software Development Engineer",
  description:
    "Manu S Rao is a Software Development Engineer based in Bangalore, India, building scalable event-driven backend systems with Java, Spring Boot, Kafka and AWS.",
  keywords:
    "Manu S Rao, Software Development Engineer, Backend Developer, Java Developer, Spring Boot, Kafka, AWS, MySQL, Bangalore, Hyperface Technologies, Portfolio",
  ogImage: "/assets/images/og-image.png",
  themeColor: "#0b0e11",
  githubUser: "MANUSRAO",
  showContributions: true,
  nav: [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/projects/" },
    { label: "Blog", href: "/blog/" },
  ],
};
