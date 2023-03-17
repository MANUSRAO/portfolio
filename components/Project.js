import Image from "next/image";
const Project = ({details}) =>{
    return(
        <div className="project">
        <h1>{details.name}</h1>
        <div className="projectContainer">
        <div className='projectDetails'>
            <p>{details.desc}</p>
            <div className="skills">
                <p>Skills: </p>
               <div className="skillsList">{details.skills.map((string,id)=><p key={id}>{string}</p>)}</div> 
            </div>
            <a href={details.link} target="_blank"><button className="secondary-btn">Project Link</button></a>
            <a href={details.github} target="_blank"><button className="tertiary-btn">Github Link</button></a>
        </div>
        <Image
            src={details.img1}
            alt="Project Image 1"
            width="1920"
            height='1017'
            unoptimized={true}
        />
        </div>
        </div>
    )
}

export default Project;