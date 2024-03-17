import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuthCtx } from "./AuthContext/useAuthCtx";

const Root = () => {
  const { user, logout, isAuthenticating } = useAuthCtx();
  const { pathname } = useLocation();

  console.log("isLoggedIn", user);

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
        {user && !isLoginPage && <button onClick={logout}>Logout</button>}
        {!user && !isLoginPage && <Link to="login">Login</Link>}
        {user && <div>{user.displayName}</div>}
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
