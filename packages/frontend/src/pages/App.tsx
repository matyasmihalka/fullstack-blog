import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "@/features/auth/AuthContext/AuthContext";
import { client } from "@/features/api/client";
import Root from "./Root";
import "@/global.css";
import { ThemeProvider } from "../features/ui/theme/ThemeProvider";

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
