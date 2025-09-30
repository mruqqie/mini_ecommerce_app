import { cx, Size } from "@/lib/utils";
import React from "react";

type BadgeVariant = "neutral" | "success" | "warning" | "danger" | "accent";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	children?: React.ReactNode;
	variant?: BadgeVariant;
	size?: Size;
	rounded?: boolean;
	className?: string;
}

const variantMap: Record<BadgeVariant, string> = {
	neutral: "bg-gray-100 text-gray-800",
	success: "bg-emerald-100 text-emerald-800",
	warning: "bg-amber-100 text-amber-800",
	danger: "bg-rose-100 text-rose-800",
	accent: "bg-indigo-100 text-indigo-800",
};

const badgeSizeMap: Record<Size, string> = {
	sm: "text-xs px-2 py-0.5",
	md: "text-sm px-3 py-1",
	lg: "text-base px-4 py-1.5",
};

export const Badge = ({
	children,
	variant = "neutral",
	size = "sm",
	rounded = true,
	className,
	...rest
}: BadgeProps) => {
	return (
		<span
			className={cx(
				"inline-flex items-center font-medium",
				badgeSizeMap[size],
				variantMap[variant],
				rounded ? "rounded-full" : "rounded-md",
				"shadow-sm",
				className
			)}
			{...rest}
		>
			{children}
		</span>
	);
};

export default Badge;
