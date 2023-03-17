import Navbar from '../components/Navbar.js'
import Footer from '@/components/Footer.js'
import Project from "@/components/Project.js"
import Head from 'next/head.js'
const Projects = () =>{
    return(
        <>
        <Head>
        <title>
          Manu | Projects
        </title>
      </Head>
            <div className="container">
            <Navbar />
            </div>
                <div className='container'>
        <h1 className="projectsHeader">Projects:</h1>
        <div className='projects'>
                <Project
            details={{
                name:"Hostel Automation System",
                desc:"This project helps Hostel admins to automate their systems for authentication, data management and analytics.The admins are provided with dashboard for student enrollment along with maling and analytics facility, students have access to feedback system and an additional authentication app for watchmen to verify student details.",
                skills:["Python","Django","Bootstrap"],
                link:"https://newmain-production.up.railway.app/",
                github:"https://github.com/MANUSRAO/newmain/",
                img1:"https://imgbox.io/ib/lQkSdwUkQM.png",
            }}
        />
                <Project
            details={{
                name:"Stock Heatmap",
                desc:"This project visualizes Indian Market's most important indices and their performance on day to day basis with its constituients grouped into respective categories.The data is fetched by scraping a popular market website and visulaized with the help of CSS Flex, the users also have the option to download market snapshots in PNG images.",
                skills:["Python","Django","Web Scraping","CSS-Flex"],
                link:"https://stockmap.vercel.app/heatmap",
                github:"https://github.com/MANUSRAO/stockmap",
                img1:"https://imgbox.io/ib/uvFbI0Z26K.png",
            }}
        />
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default Projects;