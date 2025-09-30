"use client";

import React from "react";
import ProductGallery from "../organisms/ProductGallery";
import { Product } from "@/lib/types";
import CartItem from "../molecules/CartItem";
import { useCart } from "@/context/CartContext";
import useFetch from "@/lib/api";
import { Loader } from "lucide-react";
import Badge from "../atoms/Badge";

const ProductDetailTemplate = ({ id }: { id: string }) => {
	const { items, addItem, removeItem, updateQuantity } = useCart();
	const { data, loading, error } = useFetch(`/${id}`);
	const product = data as Product;
	const cartItem = items.find((i) => i.product.id === product?.id);
	const handleUpdateQty = (id: number, qty: number) => {
		if (cartItem) {
			updateQuantity(id, qty);
		} else {
			addItem(product, qty);
		}
	};
	if (loading) {
		return (
			<div className="items-center justify-center h-[80vh] flex w-[100%]">
				<Loader className="animate-spin" />
			</div>
		);
	}
	if (error) {
		return (
			<div className="items-center justify-center h-[80vh] flex w-[100%]">
				<p>Error Loading Products. Please reload the page.</p>
			</div>
		);
	}
	return (
		<section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-1 gap-10">
			<div className="flex flex-col gap-6">
				<ProductGallery
					images={product?.images}
					alt={`product ${product?.id}`}
				/>
				<div className="space-y-4">
					<h1 className="text-2xl font-bold text-gray-900">
						{product?.title}
					</h1>
					<p className="text-gray-600 text-sm leading-relaxed">
						{product?.description}
					</p>

					<div className="flex items-center gap-4">
						<span className="text-xl font-semibold text-indigo-600">
							${product?.price?.toLocaleString()}
						</span>
						{product?.stock > 0 ? (
							<Badge variant="success">In Stock</Badge>
						) : (
							<Badge variant="danger">Out of Stock</Badge>
						)}
					</div>
				</div>
			</div>
			{product?.stock > 0 && (
				<div className="h-max">
					<CartItem
						key={product?.id}
						item={{
							id: product?.id,
							name: product?.title,
							price: product?.price,
							qty: cartItem ? cartItem.quantity : 0,
							image: product?.thumbnail,
							inStock: product?.stock > 0 ? true : false,
						}}
						onRemove={() => removeItem(product?.id)}
						onUpdateQty={handleUpdateQty}
					/>
				</div>
			)}
		</section>
	);
};
export default ProductDetailTemplate;
