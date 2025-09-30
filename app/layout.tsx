import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "./components/molecules/Navbar";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: {
    default: "MyShop",
    template: "%s | MyShop",
  },
  description: "Shop the best products at MyShop",
  keywords: ["ecommerce", "shopping", "myshop"],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<CartProvider>
					<Navbar />
					<main className="pt-4">{children}</main>
				</CartProvider>
			</body>
		</html>
	);
}
