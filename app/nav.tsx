import Link from "next/link";
import { use } from "react";
import { UserContext } from "./user-context";

export function Nav() {
  const userContext = use(UserContext);
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      {userContext?.user && <p>Hello {userContext.user.name}</p>}
    </nav>
  );
}
