import { gql, useQuery } from "@apollo/client";
import { client } from "./main";

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
  const { data } = useQuery(articleQuery);

  console.log("Data from server:", data);

  const handleClick = async () => {
    window.location.href = "//localhost:3001/api/auth/google/login";
  };

  const handleLogout = async () => {
    const response = await fetch("//localhost:3001/api/auth/logout", {
      method: "GET",
      credentials: "include", // Necessary to include the HTTP-only cookie in the request
    });

    console.log("Logout response:", response);

    await client.resetStore();
  };

  return (
    <>
      <button onClick={handleClick}>Sign up with google</button>
      {/* <button onClick={handleArticleQuery}>Query article</button> */}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
