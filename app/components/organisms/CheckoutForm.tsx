"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/CartContext";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import PaymentStatus from "../molecules/PaymentStatus";
import OrderSummary from "../molecules/OrderSummary";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { simulatePayment } from "@/lib/utils";

const checkoutSchema = z.object({
	name: z.string().min(2, "Please enter your name"),
	email: z.email("Please use a valid email"),
	address: z.string().min(5, "Enter a delivery address"),
	cardNumber: z
		.string()
		.min(15, "Card number too short")
		.max(20, "Card number too long")
		.regex(/^[0-9\s-]+$/, "Card must be numeric"),
	expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY"),
	cvc: z.string().min(3, "CVC is 3 digits").max(4),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = ({ className }: { className?: string }) => {
	const { items, clearCart } = useCart();
	const router = useRouter();

	const [status, setStatus] = useState<
		"idle" | "processing" | "success" | "failure"
	>("idle");
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
	});

	const onSubmit = async () => {
		if (items.length === 0) {
			setErrorMsg("Your cart is empty — add something cute first 🛍️");
			return;
		}

		setStatus("processing");
		setErrorMsg(null);

		const shouldSucceed = Math.random() > 0.15;

		try {
			const result = await simulatePayment(shouldSucceed);
			if (result.success) {
				setStatus("success");
				clearCart();
				setTimeout(() => {
					reset();
					router.push("/checkout/success");
				}, 800);
			} else {
				setStatus("failure");
				setErrorMsg(result.message ?? "Payment failed");
				setTimeout(() => {
					router.push("/checkout/failure");
				}, 800);
			}
		} catch {
			setStatus("failure");
			setErrorMsg("Something went wrong — try again");
			setTimeout(() => router.push("/checkout/failure"), 800);
		}
	};

	return (
		<div className={className}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<motion.form
					onSubmit={handleSubmit(onSubmit)}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.28 }}
					className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-2"
				>
					<h2 className="text-lg sm:text-xl font-bold mb-4">
						Payment details
					</h2>

					<Input
						label="Full name"
						placeholder="John Doe"
						{...register("name")}
						error={errors.name?.message}
						fullWidth
					/>
					<Input
						label="Email"
						placeholder="johndoe@sample.com"
						type="email"
						{...register("email")}
						error={errors.email?.message}
						fullWidth
					/>
					<Input
						label="Delivery address"
						placeholder="17, John street, Doe"
						{...register("address")}
						error={errors.address?.message}
						fullWidth
					/>
					<Input
						label="Card number"
						placeholder="1234 5678 9012 3456"
						{...register("cardNumber")}
						error={errors.cardNumber?.message}
						fullWidth
					/>
					<div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
						<Input
							label="Expiry (MM/YY)"
							placeholder="MM/YY"
							type="password"
							showPasswordToggle
							{...register("expiry")}
							error={errors.expiry?.message}
						/>
						<Input
							label="CVC"
							placeholder="123"
							{...register("cvc")}
							error={errors.cvc?.message}
						/>
					</div>

					<div className="mt-5 flex flex-col gap-3">
						<PaymentStatus status={status} errorMsg={errorMsg} />

						<div className="flex gap-3 mt-2">
							<Button
								type="button"
								variant="secondary"
								className="flex-1"
								onClick={() => {
									reset();
									setStatus("idle");
									setErrorMsg(null);
								}}
							>
								Reset
							</Button>
							<Button
								type="submit"
								variant="primary"
								className="flex-1"
								size="lg"
								isLoading={status === "processing"}
							>
								{status === "processing"
									? "Processing..."
									: "Pay Now"}
							</Button>
						</div>
					</div>
				</motion.form>

				<motion.div
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.28, delay: 0.06 }}
				>
					<OrderSummary />
				</motion.div>
			</div>
		</div>
	);
};

export default CheckoutForm;
