"use client";

import React from "react";
import CartSummary from "../organisms/CartSummary";

const CartTemplate = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="text-2xl sm:text-3xl font-bold mb-8">
				Cart & Checkout
			</h1>
			<CartSummary />
		</section>
	);
};

export default CartTemplate;
