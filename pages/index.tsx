import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import {
  IArticle,
  IArticleFields,
  IHome,
  IHomeFields,
} from "../@types/generated/contentful";
import client from "../contentful/index";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import Link from "next/link";

const Home = ({
  home,
  articles,
}: {
  title: string;
  home: IHome;
  articles: IArticle[];
}) => {
  console.log(articles);
  return (
    <div>
      <Head>
        <title>{home.fields.title}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <div
          className="text-center p-5 text-white"
          style={{
            background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
            minHeight: 300,
          }}
        >
          <h1 className="mt-5">{home.fields.title}</h1>
          <div className="mb-5">
            {documentToReactComponents(home.fields.desc!)}
          </div>
        </div>
        <Container className="pt-5">
          <Row>
            {articles.map((article) => {
              return (
                <Col sm={4} key={article.fields.slug}>
                  <Card body>
                    <CardTitle tag="h5">{article.fields.title}</CardTitle>
                    <CardText>{article.fields.description}</CardText>
                    <Link href={`/articles/${article.fields.slug}`}>
                      <Button>{article.fields.btnName}</Button>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const home = await client.getEntries<IHomeFields>({
    content_type: "home",
    limit: 1,
  });

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: "article",
    select: "fields.title,fields.slug,fields.description,fields.btnName",
  });
  const [homePage] = home.items;

  return {
    props: {
      title: "Next blog",
      home: homePage,
      articles: articleEntries.items,
    },
    revalidate: 3600,
  };
};
