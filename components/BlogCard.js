import Link from "next/link";
import Image from "next/image";
const BlogCard = ({title, coverPhoto, datePublished, slug}) => {
    return (
            <div className="grid-item">
            <Link href={"blogs/"+slug}>
                <div className="card">
                    <div>
                        <Image 
                            src={coverPhoto.url}
                            alt="Photo"
                            width="256"
                            height="134"
                            unoptimized={true}
                            className="card-img"
                        />
                    </div>
                    <h3 className="card-header">{title}</h3>
                    <div className="blogFooter">
                        <p><i className="fa fa-calendar" aria-hidden="true"></i>{"  "+datePublished}</p>
                    </div>
                </div>
            </Link>
            </div>
    );
}
export default BlogCard;