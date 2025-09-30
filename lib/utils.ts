export const cx = (...args: Array<string | false | null | undefined>) =>
	args.filter(Boolean).join(" ");

export type Size = "sm" | "md" | "lg";

export type Shape = "pill" | "rounded" | "square";

export const sizeMap: Record<Size, string> = {
	sm: "text-sm px-3 py-2",
	md: "text-base px-4 py-3",
	lg: "text-lg px-5 py-4",
};

export const shapeMap: Record<Shape, string> = {
	pill: "rounded-full",
	rounded: "rounded-2xl",
	square: "rounded-md",
};

export const baseInputClasses =
	"flex items-center gap-3 border bg-white transition focus-within:ring-2 focus-within:ring-offset-1 shadow-sm";

export const simulatePayment = (shouldSucceed = true) =>
	new Promise<{ success: boolean; message?: string }>((res) => {
		setTimeout(() => {
			if (shouldSucceed) {
				res({ success: true });
			} else {
				res({
					success: false,
					message: "Payment declined. Try another card.",
				});
			}
		}, 1400 + Math.random() * 1200);
	});
