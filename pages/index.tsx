import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Banner from '../components/Banner';
import { sanityClient } from "../sanity";
import { urlFor } from "../sanity";
import imageUrlBuilder from '@sanity/image-url';
import createImageUrlBuilder from '@sanity/image-url';
import { Post } from "../typings";


interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <div>
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div>
              <img src={urlFor(post.mainImage).url()!} />
            </div>
          </Link>
        ))};
      </div>
      
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author->{
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    }
  }
};
