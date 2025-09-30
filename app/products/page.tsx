import { Product } from "@/lib/types";
import ProductListingTemplate from "../components/templates/ProductListingTemplate";

export const metadata = {
	title: "Products",
	description: "Browse our product catalog.",
};

const ProductsPage =() => {
	return <ProductListingTemplate />;
}

export default ProductsPage;