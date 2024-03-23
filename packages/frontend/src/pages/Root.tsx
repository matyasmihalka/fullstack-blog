import { Outlet } from "react-router-dom";
import { useAuthCtx } from "../features/auth/AuthContext/useAuthCtx";
import { MainNav } from "../features/ui/composits/MainNav";

const Root = () => {
  const { isAuthenticating } = useAuthCtx();

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 flex flex-col h-screen">
      {isAuthenticating ? (
        <div>Loading...</div>
      ) : (
        <>
          <MainNav />
          <div className="px-8 flex-grow overflow-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Root;
