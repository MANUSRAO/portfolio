import { GraphQLClient, gql } from 'graphql-request'
import Navbar from '../components/Navbar.js'
import Footer from '@/components/Footer.js'
import BlogCard from '@/components/BlogCard.js'
import Head from 'next/head.js'
const graphcms = new GraphQLClient('https://ap-south-1.cdn.hygraph.com/content/clemvuk6d0bvu01t826s979bp/master')
const query = gql`
query {
  posts{
    title,
    publishedOn,
    slug,
    id,
    author {
      name
    }
    content{
      html
    }
    coverPhoto{
      url
    }
    categories {
      category
    }
  }
}
`

export async function getStaticProps(){
  const {posts} = await graphcms.request(query);
  return {
    props:{
        posts,
    },
    revalidate: 10
  }
}
const Blogs = ({posts}) => {
  return (
    <>
      <Head>
        <title>
          Manu | Blogs
        </title>
      </Head>
      <div className="container">
      <Navbar />
      </div>
      <div className='postsContainer'>
      <h1>Blog</h1>
      <div className="grid">
      {posts.map((post)=><BlogCard title={post.title} coverPhoto={post.coverPhoto} key={post.id} datePublished={post.publishedOn} slug={post.slug} />)}
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default Blogs;