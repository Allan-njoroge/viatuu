export type ProductType = {
    id: number;
    name: string;
    description: string;
    category: string;
    image_url?: string;
    price: number;
    sale_price?: number;
    stock_quantity: number;
}

export type CartProductItems = {
    name: string;
    image_url: string;
    product_id: number;
    price: number;
    quantity: number;
};

export type ProductCardProps = {
    key: number,
    product_id: number,
    name: string,
    price: number,
    link: string,
    category: string,
    image: string
}