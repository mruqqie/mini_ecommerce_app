import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const OrderSummary = () => {
	const { items } = useCart();

	const getSubtotal = () =>
		items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);

	const subtotal = getSubtotal();
	const tax = +(subtotal * 0.075).toFixed(2);
	const total = +(subtotal + tax).toFixed(2);

	return (
		<aside className="bg-white p-6 rounded-2xl shadow-md h-fit">
			<h3 className="text-md font-semibold mb-3">Order summary</h3>

			<div className="flex flex-col gap-3 max-h-[48vh] overflow-auto pb-2">
				{items.length === 0 ? (
					<div className="text-gray-500 text-sm">
						No items in cart
					</div>
				) : (
					items.map((ci) => (
						<div
							key={ci.product.id}
							className="flex items-center gap-3"
						>
							<div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
								{ci.product.thumbnail ? (
									<Image
										src={ci.product.thumbnail}
										alt={ci.product.title}
										width={48}
										height={48}
										className="object-cover w-full h-full"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
										No image
									</div>
								)}
							</div>

							<div className="flex-1">
								<div className="text-sm font-medium line-clamp-1">
									{ci.product.title}
								</div>
								<div className="text-xs text-gray-500">
									${ci.product.price.toLocaleString()}
								</div>
							</div>

							<div className="text-sm font-semibold">
								x{ci.quantity}
							</div>
						</div>
					))
				)}
			</div>

			<div className="mt-4 border-t pt-4">
				<div className="flex justify-between text-sm text-gray-600">
					<span>Subtotal</span>
					<span>${subtotal.toLocaleString()}</span>
				</div>
				<div className="flex justify-between text-sm text-gray-600 mt-1">
					<span>Tax (7.5%)</span>
					<span>${tax.toLocaleString()}</span>
				</div>
				<div className="flex justify-between text-lg font-semibold mt-3">
					<span>Total</span>
					<span>${total.toLocaleString()}</span>
				</div>
			</div>

			<p className="text-xs text-gray-500 mt-3">
				By continuing you agree to our{" "}
				<button className="underline">Terms</button>.
			</p>
		</aside>
	);
};

export default OrderSummary;
