import Link from "next/link";
import { use } from "react";
import { UserContext } from "./user-context";

export function Nav() {
  const userContext = use(UserContext);
  return (
    <nav className="bg-slate-500 p-4 text-white flex justify-between">
      <ul className="flex">
        <li className="mr-4">
          <Link href="/">Home</Link>
        </li>
        <li className="mr-4 flex-row-reverse">
          <Link href="/about">About</Link>
        </li>
      </ul>
      {userContext?.user && <div>Hello {userContext.user.name}</div>}
    </nav>
  );
}
