import { gql, useQuery } from "@apollo/client";

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
      <h1>Articles page </h1>
      {data?.article ? (
        <>
          <h1>Article</h1>
          <h2>{data.article.title}</h2>
          <p>{data.article.content}</p>
          <p>By: {data.article.author}</p>
        </>
      ) : (
        "No article found"
      )}
    </>
  );
}

export default App;
