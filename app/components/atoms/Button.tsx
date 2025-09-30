import { cx } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { forwardRef, ReactNode } from "react";

type Variant =
	| "primary"
	| "secondary"
	| "ghost"
	| "outline"
	| "danger"
	| "link";
type Size = "sm" | "md" | "lg";
type Shape = "pill" | "rounded" | "square";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
	variant?: Variant;
	size?: Size;
	shape?: Shape;
	fullWidth?: boolean;
	isLoading?: boolean;
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	asLink?: boolean;
	href?: string;
}

const variantStyles: Record<Variant, string> = {
	primary:
		"bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md hover:brightness-105 active:scale-98",
	secondary:
		"bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50",
	ghost: "bg-transparent text-gray-900 hover:bg-gray-50",
	outline:
		"bg-transparent border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50",
	danger: "bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-md hover:brightness-95",
	link: "bg-transparent text-indigo-600 underline-offset-2 hover:underline px-0 py-0",
};

const sizeStyles: Record<Size, string> = {
	sm: "text-sm px-3 py-1.5",
	md: "text-base px-4 py-2",
	lg: "text-lg px-6 py-3",
};

const shapeStyles: Record<Shape, string> = {
	pill: "rounded-full",
	rounded: "rounded-2xl",
	square: "rounded-md",
};

const base =
	"inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		const {
			children,
			variant = "primary",
			size = "md",
			shape = "pill",
			fullWidth = false,
			isLoading = false,
			leftIcon,
			rightIcon,
			asLink = false,
			href,
			className,
			disabled,
			...rest
		} = props;

		const classes = cx(
			base,
			variantStyles[variant],
			sizeStyles[size],
			shapeStyles[shape],
			fullWidth ? "w-full" : "w-auto",
			"shadow-sm hover:shadow-md active:translate-y-0.5",
			"cursor-pointer",
			className
		);

		const ariaBusy: React.AriaAttributes = isLoading
			? { "aria-busy": true }
			: {};

		if (asLink && href) {
			return (
				<a
					ref={ref as React.Ref<HTMLAnchorElement>}
					href={href}
					className={classes}
					aria-disabled={disabled}
					{...ariaBusy}
					{...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{isLoading ? <Loader2 size={16} /> : null}
					{!isLoading && leftIcon ? (
						<span className="-ml-1">{leftIcon}</span>
					) : null}
					{!isLoading && children}
					{!isLoading && rightIcon ? (
						<span className="-mr-1">{rightIcon}</span>
					) : null}
				</a>
			);
		}

		return (
			<button
				ref={ref}
				className={classes}
				disabled={disabled || isLoading}
				{...ariaBusy}
				{...rest}
			>
				{isLoading ? (
					<span className="flex items-center gap-2">
						<Loader2 size={18} />
						<span className="sr-only">Loading</span>
					</span>
				) : (
					<>
						{leftIcon ? (
							<span className="flex items-center">
								{leftIcon}
							</span>
						) : null}
						<span>{children}</span>
						{rightIcon ? (
							<span className="flex items-center">
								{rightIcon}
							</span>
						) : null}
					</>
				)}
			</button>
		);
	}
);

Button.displayName = "Button";

export const IconButton = forwardRef<
	HTMLButtonElement,
	Omit<ButtonProps, "children">
>(
	(
		{
			variant = "ghost",
			size = "md",
			shape = "rounded",
			isLoading = false,
			leftIcon,
			className,
			...rest
		},
		ref
	) => {
		const classes = cx(
			base,
			variantStyles[variant],
			size === "sm" ? "p-2" : size === "lg" ? "p-3" : "p-2.5",
			shapeStyles[shape],
			"w-auto h-auto cursor-pointer",
			className
		);

		return (
			<button
				ref={ref}
				className={classes}
				disabled={isLoading}
				{...rest}
			>
				{isLoading ? <Loader2 size={16} /> : leftIcon}
			</button>
		);
	}
);

IconButton.displayName = "IconButton";

export default Button;
