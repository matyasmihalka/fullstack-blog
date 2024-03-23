import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./AuthContext/AuthContext";
import { client } from "./client";
import Root from "./Root";
import "./global.css";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <ApolloProvider client={client}>
          <Root />
        </ApolloProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
