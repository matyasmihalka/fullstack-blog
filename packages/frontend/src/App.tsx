function App() {
  // const [count, setCount] = useState(0)

  const handleClick = async () => {
    // const response = await fetch("//localhost:3001/api/auth/google/login");
    // console.log(response);

    window.location.href = "//localhost:3001/api/auth/google/login";
  };

  return (
    <>
      <button onClick={handleClick}>Sign up with google</button>
    </>
  );
}

export default App;
