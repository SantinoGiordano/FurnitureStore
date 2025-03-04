import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-base-200 p-4 shadow-md">
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </li>
        <li>
          <Link href="/distributors" className="hover:text-primary">
            Distributors
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}