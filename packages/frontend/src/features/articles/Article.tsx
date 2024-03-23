import { gql, useQuery } from "@apollo/client";
import { Typography } from "../ui/typography";

const articleQuery = gql`
  query GetArticle {
    article(id: 2) {
      id
      title
      content
      author
    }
  }
`;

function App() {
  const { data } = useQuery(articleQuery) as {
    data: {
      article: { title: string; content: string; author: string } | undefined;
    };
  };

  console.log("Data from server:", data);

  return (
    <>
      <Typography variant="h3" as="h2">
        Articles page
      </Typography>
      {data?.article ? (
        <>
          <Typography variant="h4" as="h3">
            {data.article.title}
          </Typography>
          <Typography>{data.article.content}</Typography>
          <Typography>By: {data.article.author}</Typography>
        </>
      ) : (
        <Typography variant="h4" as="h3">
          No article found
        </Typography>
      )}
    </>
  );
}

export default App;
