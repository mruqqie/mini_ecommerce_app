"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Badge from "../atoms/Badge";

const CartMenu = () => {
	const { items } = useCart();
	const cartCount = items.length ?? 0;
	const [mobileOpen, setMobileOpen] = useState(false);

	const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

	return (
		<div className="flex items-center gap-4 sm:gap-6 relative">
			<div className="hidden sm:flex items-center gap-4">
				<Link
					href="/products"
					className="text-white font-medium hover:text-yellow-100 transition-colors"
				>
					Products
				</Link>
				<Link href="/cart" className="relative">
					<ShoppingCart size={28} className="text-white" />
					{cartCount > 0 && (
						<Badge
							variant="danger"
							size="sm"
							className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center shadow-md"
						>
							{cartCount}
						</Badge>
					)}
				</Link>
			</div>
			<button
				className="sm:hidden p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
				onClick={toggleMobileMenu}
			>
				{mobileOpen ? (
					<X size={24} className="text-white" />
				) : (
					<Menu size={24} className="text-white" />
				)}
			</button>

			{mobileOpen && (
				<div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-lg flex flex-col py-2 z-50 sm:hidden">
					<Link
						href="/products"
						className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg"
						onClick={() => setMobileOpen(false)}
					>
						Products
					</Link>
					<Link
						href="/cart"
						className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg relative flex items-center justify-between"
						onClick={() => setMobileOpen(false)}
					>
						Cart
						<div className="relative">
							<ShoppingCart size={22} className="text-gray-800" />
							{cartCount > 0 && (
								<Badge
									variant="danger"
									size="sm"
									className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center shadow-md"
								>
									{cartCount}
								</Badge>
							)}
						</div>
					</Link>
				</div>
			)}
		</div>
	);
};

export default CartMenu;
