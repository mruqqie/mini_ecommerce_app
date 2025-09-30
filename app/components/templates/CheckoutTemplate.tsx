"use client";

import React from "react";
import CheckoutForm from "../organisms/CheckoutForm";

const CheckoutTemplate = () => {
	return (
		<section className="max-w-7xl mx-auto px-4 py-10">
			<h1 className="text-2xl sm:text-3xl font-bold mb-8">
				Cart & Checkout
			</h1>
			<CheckoutForm />
		</section>
	);
};

export default CheckoutTemplate;
