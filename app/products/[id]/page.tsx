import ProductDetailTemplate from "@/app/components/templates/ProductDetailTemplate";

interface ProductPageProps {
	params: { id: string };
}

const ProductPage = ({ params }: ProductPageProps) => {
	return <ProductDetailTemplate id={params.id} />;
};

export default ProductPage;
