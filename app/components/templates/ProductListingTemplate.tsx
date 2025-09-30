"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductFilter from "../molecules/ProductFilter";
import ProductSort from "../molecules/ProductSort";
import ProductGrid from "../organisms/ProductGrid";
import { Product, SortOption } from "@/lib/types";
import useFetch from "@/lib/api";
import { Loader } from "lucide-react";
import Pagination from "../molecules/Pagination";

const ProductListingTemplate = () => {
	const [selectedBrand, setSelectedBrand] = useState<string>("all");
	const [sortOption, setSortOption] = useState<SortOption>("default");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12;

	const { data, loading, error } = useFetch("?limit=100000000");
	const products = data?.products as Product[];

	const brands = useMemo(
		() => Array.from(new Set(products?.map((p) => p.brand))).sort(),
		[products]
	);

	const filteredProducts = useMemo(() => {
		if (!products) return [];
		if (selectedBrand === "all") return products;
		return products?.filter((p) => p.brand === selectedBrand);
	}, [products, selectedBrand]);

	const sortedProducts = useMemo(() => {
		const items = [...filteredProducts];
		switch (sortOption) {
			case "price_asc":
				return items.sort((a, b) => a.price - b.price);
			case "price_desc":
				return items.sort((a, b) => b.price - a.price);
			default:
				return items;
		}
	}, [filteredProducts, sortOption]);

	const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
	const startIdx = (currentPage - 1) * itemsPerPage;
	const paginatedProducts = sortedProducts.slice(
		startIdx,
		startIdx + itemsPerPage
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedBrand, sortOption]);
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
		<section className="max-w-7xl mx-auto px-4 py-10">
			<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
				<ProductFilter
					brands={brands}
					selectedBrand={selectedBrand}
					onChangeBrand={setSelectedBrand}
					onClear={() => setSelectedBrand("all")}
				/>
				<ProductSort value={sortOption} onChange={setSortOption} />
			</div>
			<ProductGrid products={paginatedProducts} />

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => {
					setCurrentPage(page);
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
			/>
		</section>
	);
};

export default ProductListingTemplate;
