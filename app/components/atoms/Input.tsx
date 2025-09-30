import { cx, Shape, shapeMap, Size, sizeMap } from "@/lib/utils";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import React, { forwardRef, useState } from "react";

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	size?: Size;
	shape?: Shape;
	error?: string | boolean;
	helperText?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	clearable?: boolean;
	showPasswordToggle?: boolean;
	isLoading?: boolean;
	fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		label,
		size = "md",
		shape = "rounded",
		error,
		helperText,
		leftIcon,
		rightIcon,
		clearable = false,
		showPasswordToggle = false,
		isLoading = false,
		fullWidth = false,
		type = "text",
		className,
		value,
		defaultValue,
		onChange,
		placeholder,
		id,
		disabled,
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState<string>(
		(value ?? defaultValue ?? "") as string
	);
	const [showPwd, setShowPwd] = useState(false);
	const isControlled = value !== undefined;
	const inputValue = isControlled ? (value as string) : internalValue;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) setInternalValue(e.target.value);
		onChange?.(e);
	};

	const handleClear = () => {
		if (!isControlled) setInternalValue("");
		const ev = {
			target: { value: "" },
		} as unknown as React.ChangeEvent<HTMLInputElement>;
		onChange?.(ev);
	};

	const containerClasses = cx(
		"flex items-center gap-3 border bg-white transition focus-within:ring-2 focus-within:ring-offset-1",
		sizeMap[size],
		shapeMap[shape],
		fullWidth ? "w-full" : "w-auto",
		error ? "border-rose-400" : "border-gray-200",
		disabled ? "opacity-60 cursor-not-allowed" : "",
		"shadow-sm",
		className
	);

	const inputId =
		id ?? (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);

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

			<div className={containerClasses} aria-disabled={disabled}>
				{leftIcon ? (
					<span className="ml-2 flex items-center">{leftIcon}</span>
				) : null}

				<input
					ref={ref}
					id={inputId}
					type={
						type === "password" && showPasswordToggle
							? showPwd
								? "text"
								: "password"
							: type
					}
					value={inputValue}
					onChange={handleChange}
					placeholder={placeholder}
					className="flex-1 bg-transparent placeholder-gray-400 focus:outline-none appearance-none"
					aria-invalid={!!error}
					disabled={disabled || isLoading}
					{...rest}
				/>

				{isLoading ? (
					<span className="mr-2">
						<Loader2 size={18} />
					</span>
				) : null}

				{clearable && inputValue ? (
					<button
						type="button"
						onClick={handleClear}
						className="mr-2 rounded-full p-1 hover:bg-gray-100 active:scale-95"
						aria-label="Clear input"
					>
						<X  size={16}/>
					</button>
				) : null}
				{showPasswordToggle && type === "password" ? (
					<button
						type="button"
						onClick={() => setShowPwd((s) => !s)}
						className="mr-2 rounded-full p-1 hover:bg-gray-100 active:scale-95"
						aria-label={showPwd ? "Hide password" : "Show password"}
					>
						{showPwd ? <Eye size={16}/> : <EyeOff size={16} />}
					</button>
				) : null}
				{rightIcon ? (
					<span className="mr-2 flex items-center">{rightIcon}</span>
				) : null}
			</div>

			{error ? (
				<span className="text-xs text-rose-600 mt-1">
					{typeof error === "string" ? error : "Error"}
				</span>
			) : helperText ? (
				<span className="text-xs text-gray-500 mt-1">{helperText}</span>
			) : null}
		</label>
	);
});

Input.displayName = "Input";

export default Input;
