import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button, { IconButton } from "../atoms/Button";
import Badge from "../atoms/Badge";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Skeleton from "../atoms/Skeleton";
import QuantitySelector from "./QuantitySelector";
import { Trash } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
	const { addItem, items, removeItem, updateQuantity } = useCart();
	const cartItem = items.find((i) => i.product.id === product.id);
	const router = useRouter();
	const onAddToCart = (product: Product) => addItem(product);
	const onView = (id: number) => router.push(`/products/${id}`);
	const mainImg = product.images && product.images[0];

	const [imageLoaded, setImageLoaded] = useState(false);
	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShowSkeleton(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	const handleImageLoad = () => setImageLoaded(true);
	const showSkeletonPulse = !imageLoaded || showSkeleton;

	return (
		<article className="bg-white rounded-2xl shadow-sm p-4 flex flex-col h-full">
			<div className="relative w-full h-48 rounded-xl overflow-hidden mb-3">
				{mainImg ? (
					<>
						{showSkeletonPulse && (
							<Skeleton
								className="absolute inset-0"
								animate
								width="100%"
								height="100%"
								rounded
							/>
						)}
						<Image
							src={mainImg}
							alt={product.title}
							fill
							sizes="(max-width: 640px) 100vw, 33vw"
							className={
								showSkeletonPulse ? "opacity-0" : "object-cover"
							}
							onLoadingComplete={handleImageLoad}
						/>
					</>
				) : (
					<div className="bg-gray-100 flex items-center justify-center h-full">
						No image
					</div>
				)}
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h3 className="text-sm sm:text-base font-semibold text-gray-900">
							{product.title}
						</h3>
						{product.brand ? (
							<p className="text-xs text-gray-500 mt-1">
								{product.brand}
							</p>
						) : null}
					</div>

					<div className="text-right">
						<div className="text-sm text-gray-600">
							${product.price.toLocaleString()}
						</div>
						<div className="mt-1 text-nowrap">
							{product.stock > 0 ? (
								<Badge variant="success">In stock</Badge>
							) : (
								<Badge variant="danger">Out of stock</Badge>
							)}
						</div>
					</div>
				</div>

				<p className="text-xs text-gray-500 mt-3 line-clamp-3 flex-1">
					{product.description}
				</p>

				<div className="mt-4 flex items-center justify-between gap-3">
					<div className="flex gap-2 flex-1">
						{!cartItem ? (
							<Button
								variant="primary"
								size="md"
								shape="pill"
								fullWidth
								onClick={() => onAddToCart?.(product)}
								disabled={!product.stock}
							>
								Add to cart
							</Button>
						) : (
							<div className="flex items-center gap-2">
								<QuantitySelector
									value={cartItem.quantity}
									onChange={(qty) =>
										updateQuantity(product.id, qty)
									}
									min={1}
								/>
								<IconButton
									leftIcon={<Trash size={16} />}
									variant="danger"
									size="sm"
									onClick={() => removeItem(product.id)}
									aria-label="Remove item"
								/>
							</div>
						)}
					</div>

					<div className="block">
						<Button
							variant="secondary"
							size="sm"
							shape="rounded"
							onClick={() => onView?.(product.id)}
						>
							View
						</Button>
					</div>
				</div>
			</div>
		</article>
	);
};
export default ProductCard;
