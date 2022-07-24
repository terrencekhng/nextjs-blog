import Head from 'next/head';
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import {getAllPostIds, getPostData} from "../../lib/posts";
import {ArrElement} from '../../types';
import utilStyles from '../../styles/utils.module.css';

const Posts = ({postData}: {postData: Awaited<ReturnType<typeof getPostData>>}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </article>
    </Layout>
  )
}

export default Posts;

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(
  {params}: ArrElement<ReturnType<typeof getAllPostIds>>
) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
