import { GraphQLClient, gql } from 'graphql-request'
import Navbar from '@/components/Navbar.js'
import Footer from '@/components/Footer.js'
import Image from 'next/image.js'

const graphcms = new GraphQLClient('https://ap-south-1.cdn.hygraph.com/content/clemvuk6d0bvu01t826s979bp/master')
const query = gql`
    query Post($slug:String!){
        post(where: {slug: $slug}){
            id,
            title,
            slug,
            publishedOn,
            author{
                id,
                name,
                avatar{
                    url
                }
            }
            content{
                html
            }
            coverPhoto{
                url
            }
        }
    }
`
const SLUGLIST = gql`
    {
        posts{
            slug
        }
    }
`;

export async function getStaticPaths(){
    const {posts} = await graphcms.request(SLUGLIST);
    return {
        paths: posts.map((post)=>({params: {slug: post.slug}})),
        fallback:false
    };
}
export async function getStaticProps({params}){
  const slug = params.slug;
  const data = await graphcms.request(query, {slug});
  const post = data.post;
  return {
    props:{
        post,
    },
    revalidate: 10
  }
}


export default function BlogPost({post}){
    return(
        <>
        <div className="container">
        <Navbar />
        </div>
        <div className="post-container">
            <Image 
            src={post.coverPhoto.url}
            alt="Photo"
            width="256"
            height="134"
            unoptimized={true}/>
            <h1 className='title'>{post.title}</h1>
            <p className='date'>{post.publishedOn}</p>
            <div dangerouslySetInnerHTML={{__html:post.content.html}}>
            </div>
        </div>
        <Footer/>
      </>
    )
}