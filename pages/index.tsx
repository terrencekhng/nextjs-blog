import Head from 'next/head'
import Link from 'next/link';
import Layout, {siteTitle} from "../components/Layout";
import Date from "../components/Date";
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from "../lib/posts";
import {PostsData} from "../types/posts";

const Home = ({allPostsData}: {allPostsData: PostsData}) => {

  // Client-side data fetching in SSG
  // useEffect(() => {
  //   fetch('aaa/bbb')
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(res => {
  //       console.error('Oops, fetch error');
  //     });
  // }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I live in Canton</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {
            allPostsData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))
          }
        </ul>
      </section>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
