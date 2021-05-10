import Layout from "../../components/layout";
import Head from "next/head";
import { getSSRDataIds, getSSRDataById } from "../../lib/posts";

export const getStaticPaths = async () => {
  const paths = await getSSRDataIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const data = await getSSRDataById(params.id);
  return {
    props: {
      data,
    },
  };
};

export default function Post({ data }) {
  return (
    <>
      <Head>
        <title>포스트</title>
      </Head>
      <Layout>
        <span>데이터 아이디: {data.id}</span>
        <br />
        <span>유저 아이디: {data.userId}</span>
        <br />
        <span>제목: {data.title}</span>
        <br />
        <span>내용: {data.body}</span>
      </Layout>
    </>
  );
}
