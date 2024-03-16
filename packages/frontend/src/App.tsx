import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./AuthContext/AuthContext";
import { client } from "./client";
import Root from "./Root";

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
