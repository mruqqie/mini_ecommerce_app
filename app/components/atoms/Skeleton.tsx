import { cx } from "@/lib/utils";
import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	width?: string | number;
	height?: string | number;
	rounded?: boolean;
	animate?: boolean;
	className?: string;
}

export const Skeleton = ({
	width = "100%",
	height = "100%",
	rounded = true,
	animate = true,
	className,
	...rest
}: SkeletonProps) => {
	const style: React.CSSProperties = { width, height };
	return (
		<div
			className={cx(
				"bg-gray-200/70",
				rounded ? "rounded-2xl" : "rounded-md",
				animate ? "animate-pulse" : "",
				"overflow-hidden",
				className
			)}
			style={style}
			{...rest}
		/>
	);
};

export default Skeleton;
