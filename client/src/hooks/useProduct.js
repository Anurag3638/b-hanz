import axios from "axios";
import { useEffect, useState } from "react";

export default function useProduct() {
    const [product, setProduct] = useState();
    const getProduct = async () => {
        try {
            const response = await axios.get("/api/data/products");
            setProduct(response.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    return product;
}
