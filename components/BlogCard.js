import Link from "next/link";
import Image from "next/image";
const BlogCard = ({title, coverPhoto, datePublished, slug}) => {
    return (
            <Link href={"blogs/"+slug} className="blogCard">
                <div className="card">
                    <div className="imageContainer">
                        <Image 
                            src={coverPhoto.url}
                            alt="Photo"
                            width="256"
                            height="134"
                            unoptimized={true}
                        />
                    </div>
                    <h3 className="blogHeader">{title}</h3>
                    <div className="blogFooter">
                        <p><i className="fa fa-calendar" aria-hidden="true"></i>{"  "+datePublished}</p>
                    </div>
                </div>
            </Link>
    );
}
export default BlogCard;