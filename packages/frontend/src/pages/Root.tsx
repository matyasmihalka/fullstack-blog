import { Outlet } from "react-router-dom";
import { useAuthCtx } from "../features/auth/AuthContext/useAuthCtx";
import { MainNav } from "../features/ui/composits/MainNav";

const Root = () => {
  const { isAuthenticating } = useAuthCtx();

  return (
    <div className="flex h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      {isAuthenticating ? (
        <div>Loading...</div>
      ) : (
        <>
          <MainNav />
          <div className="flex-grow overflow-auto px-8">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Root;
