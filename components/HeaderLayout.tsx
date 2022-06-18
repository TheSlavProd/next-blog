import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { IHome, IHomeFields } from "../@types/generated/contentful";
import client from "../contentful/index";
import { GetStaticProps } from "next";
interface Props {
  children?: ReactNode;

  homePage?: IHome | undefined;
}
export const MainLayout = ({ children, homePage }: Props) => {
  console.log(homePage);
  return (
    <>
      <Head>
        <title>{}</title>
      </Head>
      {/* <div
        className="text-center p-5 text-white"
        style={{
          background: `url("http:${homePage.fields.background?.fields.file.url}") no-repeat center / cover`,
          minHeight: 300,
        }}
      >
        <h1 className="mt-5">{homePage.fields.title}</h1>
        <div className="mb-5">
          {documentToReactComponents(homePage.fields.desc!)}
        </div>
      </div> */}
      <main>{children}</main>
    </>
  );
};

export const getInitialProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: "home",
    limit: 1,
  });
  console.log(home);
  const [homePage] = home.items;

  return {
    props: {
      homePage: homePage,
    },
    revalidate: 3600,
  };
};
