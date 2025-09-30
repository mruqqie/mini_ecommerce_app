import React, { useEffect, useRef, useState } from "react";
import {
	baseInputClasses,
	cx,
	Shape,
	shapeMap,
	Size,
	sizeMap,
} from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Option {
	value: string;
	label: string;
}

export interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
	label?: string;
	size?: Size;
	shape?: Shape;
	options?: Option[];
	fullWidth?: boolean;
	helperText?: string;
	onValueChange?: (value: string) => void;
}

const Select = (props: SelectProps) => {
	const {
		label,
		size = "md",
		shape = "rounded",
		options = [],
		fullWidth = false,
		helperText,
		className,
		disabled,
		onValueChange,
		...rest
	} = props;

	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	const containerClasses = cx(
		baseInputClasses,
		sizeMap[size],
		shapeMap[shape],
		"relative cursor-pointer select-none",
		fullWidth ? "w-full" : "w-auto",
		disabled ? "opacity-60 cursor-not-allowed" : "",
		className
	);

	const currentValue = (rest.value as string | undefined) ?? options[0]?.value;
	const selected =
		options.find((o) => o.value === currentValue) ?? options[0];

	useEffect(() => {
		function handler(e: MouseEvent) {
			if (!ref.current) return;
			if (!ref.current.contains(e.target as Node)) setOpen(false);
		}
		if (open) document.addEventListener("click", handler);
		return () => document.removeEventListener("click", handler);
	}, [open]);

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, []);

	return (
		<label
			className={cx(
				"flex flex-col gap-2",
				fullWidth ? "w-full" : "w-auto"
			)}
		>
			{label ? (
				<span className="text-sm font-medium text-gray-700">
					{label}
				</span>
			) : null}

			<div
				ref={ref}
				className={containerClasses}
				aria-disabled={disabled}
				onClick={() => !disabled && setOpen((s) => !s)}
			>
				<div className="flex items-center gap-5 justify-between px-3 py-2 text-sm text-gray-700">
					<span>{selected?.label}</span>
					<ChevronDown size={16}/>
				</div>

				{open && (
					<ul
						role="listbox"
						className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-lg z-10 border border-gray-100 max-h-60 overflow-auto"
					>
						{options.map((o, i) => (
							<li
								key={i}
								role="option"
								aria-selected={o.value === currentValue}
								className={cx(
									"px-3 py-2 text-sm cursor-pointer rounded-xl transition-colors",
									o.value === currentValue
										? "bg-pink-100 text-pink-600 font-medium"
										: "hover:bg-gray-100"
								)}
								onClick={(ev) => {
									rest.onChange?.({
										target: { value: o.value },
									} as unknown as React.ChangeEvent<HTMLSelectElement>);

									if (typeof onValueChange === "function")
										onValueChange(o.value);

									setOpen(false);
									ev.stopPropagation();
								}}
							>
								{o.label}
							</li>
						))}
					</ul>
				)}
			</div>

			{helperText ? (
				<span className="text-xs text-gray-500 mt-1">{helperText}</span>
			) : null}
		</label>
	);
};

export default Select;
