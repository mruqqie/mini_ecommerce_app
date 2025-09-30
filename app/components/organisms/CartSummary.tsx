import React from "react";
import CartItem from "../molecules/CartItem";
import Button from "../atoms/Button";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const CartSummary = () => {
	const { items, removeItem, updateQuantity, clearCart } = useCart();
	const router = useRouter();

	const getSubtotal = () =>
		items.reduce((total, item) => {
			if (item.product.stock > 0) {
				return total + item.product.price * item.quantity;
			}
			return total;
		}, 0);

	return (
		<div className="flex flex-col gap-6 w-[100%]">
			<div className="flex flex-col gap-4">
				{items.length === 0 ? (
					<p className="text-gray-500 text-lg text-center">
						Your cart is empty 🛒
					</p>
				) : (
					items.map((item) => (
						<CartItem
							key={item.product.id}
							item={{
								id: item.product.id,
								name: item.product.title,
								price: item.product.price,
								qty: item.quantity,
								image: item.product.thumbnail,
								inStock: item.product.stock > 0 ? true : false,
							}}
							onRemove={() => removeItem(item.product.id)}
							onUpdateQty={(id, qty) => updateQuantity(id, qty)}
						/>
					))
				)}
			</div>

			{items.length > 0 && (
				<div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-md">
					<div className="flex justify-between text-lg font-semibold">
						<span>Subtotal</span>
						<span>${getSubtotal().toLocaleString()}</span>
					</div>
					<div className="flex gap-3">
						<Button
							variant="secondary"
							className="flex-1"
							onClick={clearCart}
						>
							Clear Cart
						</Button>
						<Button
							variant="primary"
							className="flex-1"
							onClick={() => router.push("/checkout")}
						>
							Proceed to Checkout
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartSummary;
