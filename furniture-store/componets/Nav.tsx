import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          {/* You can add your logo or brand name here */}
          Fantastic Furniture
        </div>
        <ul className="m-5 flex space-x-6">
          <li>
            <Link href="/" className="text-white hover:text-indigo-500 transition-all duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/deals" className="text-white hover:text-indigo-500 transition-all duration-300">
              Deals
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="text-white hover:text-indigo-500 transition-all duration-300">
              Favorites
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-white hover:text-indigo-500 transition-all duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
