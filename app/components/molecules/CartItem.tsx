"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import QuantitySelector from "./QuantitySelector";
import Skeleton from "../atoms/Skeleton";
import { CartItemProps } from "@/lib/types";

const CartItem = ({ item, onRemove, onUpdateQty }: CartItemProps) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [showSkeleton, setShowSkeleton] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShowSkeleton(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	const handleImageLoad = () => setImageLoaded(true);
	const showSkeletonPulse = !imageLoaded || showSkeleton;

	return (
		<div
			className={`flex gap-4 items-start bg-white rounded-2xl p-3 shadow-sm transition 
        ${!item?.inStock ? "opacity-50 grayscale" : ""}`}
		>
			<div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
				{item?.image ? (
					<>
						{showSkeletonPulse && (
							<Skeleton
								className="absolute inset-0"
								width="100%"
								height="100%"
								rounded
								animate
							/>
						)}
						{item && (
							<Image
								src={item.image}
								alt={item.name}
								width={80}
								height={80}
								className={
									showSkeletonPulse
										? "opacity-0"
										: "object-cover"
								}
								onLoadingComplete={handleImageLoad}
							/>
						)}
					</>
				) : (
					<div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
						No image
					</div>
				)}
			</div>

			<div className="flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h4 className="text-sm font-semibold">{item?.name}</h4>
						<p className="text-xs text-gray-500">
							${item?.price?.toLocaleString()}
						</p>
					</div>

					<div className="text-right">
						{item?.inStock ? (
							<Badge variant="success">Available</Badge>
						) : (
							<Badge variant="danger">Out of Stock</Badge>
						)}
						<div className="mt-2">
							<Button
								variant="danger"
								size="sm"
								shape="rounded"
								onClick={() => onRemove?.(item?.id)}
							>
								Remove
							</Button>
						</div>
					</div>
				</div>

				<div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
					{item?.inStock && (
						<QuantitySelector
							value={item?.qty ?? 0}
							onChange={(v) => onUpdateQty?.(item?.id, v)}
						/>
					)}
					<div className="text-sm font-medium">
						Total: ${(item.price * item.qty)?.toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
