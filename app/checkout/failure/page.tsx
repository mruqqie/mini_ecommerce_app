"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../../components/atoms/Button";

const FailurePage = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6"
		>
			<div className="bg-rose-50 rounded-full w-20 h-20 flex items-center justify-center mb-4">
				<span className="text-3xl">❌</span>
			</div>
			<h1 className="text-2xl font-bold">Payment Failed</h1>
			<p className="text-gray-600 mt-2 max-w-md">
				Oops!looks like your payment didn&apos;t go through. Don&apos;t
				worry, no money was taken. You can try again or use another
				card.
			</p>

			<div className="mt-6 flex gap-3">
				<Link href="/checkout">
					<Button variant="primary">Try Again</Button>
				</Link>
				<Link href="/shop">
					<Button variant="secondary">Back to Shop</Button>
				</Link>
			</div>
		</motion.div>
	);
};

export default FailurePage;
