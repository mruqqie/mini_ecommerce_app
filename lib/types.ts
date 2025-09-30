export interface Product {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand: string;
	sku: string;
	weight: number;
	dimensions: {
		width: number;
		height: number;
		depth: number;
	};
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: {
		rating: number;
		comment: string;
		date: string;
		reviewerName: string;
		reviewerEmail: string;
	}[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: {
		createdAt: string;
		updatedAt: string;
		barcode: string;
		qrCode: string;
	};
	thumbnail: string;
	images: string[];
}

export interface ProductListingTemplateProps {
	products: Product[];
	onAddToCart: (product: Product) => void;
	onView: (id: string | number) => void;
}

export type SortOption = "price_asc" | "price_desc" | "default";

interface CartItemType {
	id: number;
	name: string;
	price: number;
	qty: number;
	image?: string;
	inStock?: boolean;
}

export interface CartItemProps {
	item: CartItemType;
	onRemove?: (id: string | number) => void;
	onUpdateQty?: (id: number, qty: number) => void;
}

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export interface PaymentProps {
	status: "idle" | "processing" | "success" | "failure";
	errorMsg?: string | null;
}

export interface ProductFilterProps {
	brands: string[];
	selectedBrand?: string;
	onChangeBrand?: (brand: string) => void;
	onClear?: () => void;
}

export interface ProductSortProps {
	value?: SortOption;
	onChange?: (val: SortOption) => void;
}

export interface QuantitySelectorProps {
	value: number;
	min?: number;
	max?: number;
	onChange: (v: number) => void;
}

export interface ProductGalleryProps {
	images: string[];
	alt: string;
}

interface CartItem {
	product: Product;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
}

export type CartAction =
	| { type: "ADD_ITEM"; product: Product; quantity?: number }
	| { type: "REMOVE_ITEM"; productId: number }
	| { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
	| { type: "CLEAR_CART" };

export interface ProductsResponse {
	products: Product[];
}
