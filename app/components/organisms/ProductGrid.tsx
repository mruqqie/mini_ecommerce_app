import React from "react";
import ProductCard from "../molecules/ProductCard";
import { Product } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";

const ProductGrid = ({ products }: { products: Product[] }) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, scale: 0.5, rotate: -15, y: 100 },
		show: {
			opacity: 1,
			scale: 1,
			rotate: 0,
			y: 0,
			transition: {
				type: "spring" as const,
				stiffness: 150,
				damping: 15,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.3,
			y: -100,
			transition: { duration: 0.3 },
		},
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="show"
				exit="hidden"
				className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			>
				{products.map((product) => (
					<motion.div key={product.id} variants={itemVariants}>
						<ProductCard key={product.id} product={product} />{" "}
					</motion.div>
				))}
			</motion.div>
		</AnimatePresence>
	);
};

export default ProductGrid;
