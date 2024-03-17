import { onError } from "@apollo/client/link/error";
// import { useNavigate } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";

const errorLink = onError(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ graphQLErrors, networkError }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // Check for a specific GraphQL error code (if your server sends one for auth errors)
        if (err.extensions?.code === "UNAUTHENTICATED") {
          // Redirect to login
          console.log("redirecting");
          window.location.href = "/login";
        }
      }
    }

    if (networkError) {
      // Check for network errors such as 401 Unauthorized
      if ("statusCode" in networkError && networkError.statusCode === 401) {
        // Redirect to login
        console.log("redirecting - 2");
        window.location.href = "/login";
      }
    }
  }
);

const httpLink = createHttpLink({
  uri: "//localhost:3001/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});
