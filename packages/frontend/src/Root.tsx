import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuthCtx } from "./AuthContext/useAuthCtx";

const Root = () => {
  const { isLoggedIn, logout, isAuthenticating } = useAuthCtx();
  const { pathname } = useLocation();

  console.log("isLoggedIn", isLoggedIn);

  const isLoginPage = pathname === "/login";

  console.log("isLoginPage", isLoginPage);
  console.log("isAuthenticating", isAuthenticating);

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav>
        <div>Blog engine Header</div>
        {isLoggedIn && !isLoginPage && <button onClick={logout}>Logout</button>}
        {!isLoggedIn && !isLoginPage && <Link to="login">Login</Link>}
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
