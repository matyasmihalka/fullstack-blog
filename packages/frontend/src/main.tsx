import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: "//localhost:3001/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  uri: "//localhost:3001/graphql",
  cache: new InMemoryCache(),
  link,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
