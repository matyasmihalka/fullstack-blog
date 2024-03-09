const graphqlQuery = {
  query: `
    query {
      article(id: 2) {
        id
        title
        content
        author
      }
    }
  `,
};

function App() {
  // const [count, setCount] = useState(0)

  const handleClick = async () => {
    window.location.href = "//localhost:3001/api/auth/google/login";
  };

  const handleArticleQuery = async () => {
    const response = await fetch("//localhost:3001/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify(graphqlQuery),
    });

    const json = await response.json();

    console.log("Data from server:", json.data);
  };

  const handleLogout = async () => {
    const response = await fetch("//localhost:3001/api/auth/logout", {
      method: "GET",
      credentials: "include", // Necessary to include the HTTP-only cookie in the request
    });

    console.log("Logout response:", response);
  };

  return (
    <>
      <button onClick={handleClick}>Sign up with google</button>
      <button onClick={handleArticleQuery}>Query article</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
