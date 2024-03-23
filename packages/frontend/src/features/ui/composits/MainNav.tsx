import { cn } from "@/lib/utils";
import { useAuthCtx } from "../../auth/AuthContext/useAuthCtx";
import { useLocation, Link } from "react-router-dom";
import { Typography } from "../typography";
import { ModeToggle } from "../theme/ModeToggle";
import { Button } from "../components/button";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { user, logout } = useAuthCtx();
  const { pathname } = useLocation();

  const isLoginPage = pathname === "/login";

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 justify-between lg:space-x-6 border-b border-zinc-200 dark:border-zinc-800 h-16 bg-zinc-50 dark:bg-zinc-950 px-8",
        className
      )}
      {...props}
    >
      <Typography variant="h4" as="h1">
        Blog engine Header
      </Typography>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {user && (
          <Typography variant="smallText" as="span">
            {user.displayName}
          </Typography>
        )}
        {user && !isLoginPage && <Button onClick={logout}>Logout</Button>}
        {!user && !isLoginPage && <Link to="login">Log in</Link>}
      </div>

      {/* <Link
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Customers
      </Link>
       */}
    </nav>
  );
}
