import React from "react";
import Button from "../atoms/Button";
import { QuantitySelectorProps } from "@/lib/types";

const QuantitySelector = ({
	value,
	min = 1,
	max = 99,
	onChange,
}: QuantitySelectorProps) => {
	const decrease = () => onChange(Math.max(min, value - 1));
	const increase = () => onChange(Math.min(max, value + 1));

	return (
		<div className="inline-flex items-center gap-2 bg-white rounded-2xl shadow-sm p-1">
			<Button
				variant="outline"
				size="sm"
				shape="rounded"
				onClick={decrease}
				disabled={value <= 0}
				aria-label="Decrease quantity"
			>
				-
			</Button>
			<div className="px-4 py-2 rounded-xl text-center min-w-[48px]">
				{value}
			</div>
			<Button
				variant="outline"
				size="sm"
				shape="rounded"
				onClick={increase}
				aria-label="Increase quantity"
			>
				+
			</Button>
		</div>
	);
};

export default QuantitySelector;
