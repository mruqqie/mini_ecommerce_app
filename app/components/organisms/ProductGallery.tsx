"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { cx } from "@/lib/utils";
import Skeleton from "../atoms/Skeleton";
import { ProductGalleryProps } from "@/lib/types";

const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
	const [active, setActive] = useState(0);
	const [mainLoaded, setMainLoaded] = useState(false);
	const [mainSkeleton, setMainSkeleton] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setMainSkeleton(false), 2000);
		return () => clearTimeout(timer);
	}, []);

	const handleMainLoad = () => setMainLoaded(true);
	const showMainSkeleton = !mainLoaded || mainSkeleton;

	const [thumbLoaded, setThumbLoaded] = useState<boolean[]>(
		Array(images?.length).fill(false)
	);

	const handleThumbLoad = (idx: number) => {
		setThumbLoaded((prev) => {
			const newState = [...prev];
			newState[idx] = true;
			return newState;
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="relative w-full aspect-video md:aspect-9/4 rounded-2xl overflow-hidden shadow-md">
				{showMainSkeleton && (
					<Skeleton
						className="absolute inset-0"
						width="100%"
						height="100%"
						rounded
						animate
					/>
				)}
				{images && (
					<Image
						src={images[active]}
						alt={alt ?? "image"}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
						className={
							showMainSkeleton ? "opacity-0" : "object-contain"
						}
						onLoadingComplete={handleMainLoad}
					/>
				)}
			</div>

			<div className="flex gap-3 overflow-x-auto">
				{images?.map((img, idx) => {
					const showThumbSkeleton = !thumbLoaded[idx];
					return (
						<button
							key={idx}
							onClick={() => setActive(idx)}
							className={cx(
								"relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0",
								idx === active
									? "border-indigo-500"
									: "border-transparent"
							)}
						>
							{showThumbSkeleton && (
								<Skeleton
									className="absolute inset-0"
									width="100%"
									height="100%"
									rounded
									animate
								/>
							)}
							<Image
								src={img}
								alt={`${alt} ${idx + 1}`}
								fill
								className={
									showThumbSkeleton
										? "opacity-0"
										: "object-cover"
								}
								onLoadingComplete={() => handleThumbLoad(idx)}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ProductGallery;
