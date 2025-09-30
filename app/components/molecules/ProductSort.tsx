import React from "react";
import Select from "../atoms/Select";
import { ProductSortProps, SortOption } from "@/lib/types";

const ProductSort = ({ value = "default", onChange }: ProductSortProps) => {
	const options = [
		{ value: "", label: "Default" },
		{ value: "price_asc", label: "Price: Low to High" },
		{ value: "price_desc", label: "Price: High to Low" },
	];

	return (
		<div className="w-full sm:w-auto">
			<Select
				options={options}
				value={value}
				onChange={(e) => onChange?.(e.target.value as SortOption)}
			/>
		</div>
	);
};

export default ProductSort;
