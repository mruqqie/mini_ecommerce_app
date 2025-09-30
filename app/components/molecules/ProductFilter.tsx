import React from "react";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import { ProductFilterProps } from "@/lib/types";

const ProductFilter = ({
	brands,
	selectedBrand = "all",
	onChangeBrand,
	onClear,
}: ProductFilterProps) => {
	const options = [
		{ value: "all", label: "All brands" },
		...brands.map((b) => ({ value: b, label: b })),
	];

	return (
		<div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col sm:flex-row sm:items-center gap-3">
			<div className="flex-1">
				<Select
					options={options}
					value={selectedBrand}
					onChange={(e) => onChangeBrand?.(e.target.value)}
					fullWidth
				/>
			</div>

			<div className="flex gap-2">
				<Button
					variant="outline"
					size="md"
					shape="rounded"
					onClick={onClear}
				>
					Clear
				</Button>
			</div>
		</div>
	);
};

export default ProductFilter;
