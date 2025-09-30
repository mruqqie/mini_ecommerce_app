"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../../components/atoms/Button";

const SuccessPage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6"
		>
			<div className="bg-emerald-50 rounded-full w-20 h-20 flex items-center justify-center mb-4">
				<span className="text-3xl">✅</span>
			</div>
			<h1 className="text-2xl font-bold">Payment Successful!</h1>
			<p className="text-gray-600 mt-2 max-w-md">
				Thank you for your order 💖. We&apos;ve emailed you a
				confirmation and will ship your goodies soon.
			</p>

			<div className="mt-6 flex gap-3">
				<Link href="/products">
					<Button variant="primary">Continue Shopping</Button>
				</Link>
			</div>
		</motion.div>
	);
};
export default SuccessPage;
