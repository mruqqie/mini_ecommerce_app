import React from "react";
import Link from "next/link";
import { pacifico } from "@/app/layout";
import CartMenu from "./CartMenu";

const Navbar = () => {
	return (
		<nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-500 shadow-lg rounded-b-2xl p-4 sm:px-6 flex flex-row items-center justify-between gap-4">
			<Link href="/">
				<h1
					className={`${pacifico.className} text-2xl font-bold text-white drop-shadow-md hover:scale-105 transition-transform`}
				>
					MyShop
				</h1>
			</Link>
			<CartMenu />
		</nav>
	);
};

export default Navbar;
