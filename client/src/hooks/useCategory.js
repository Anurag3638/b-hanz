import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [category, setCategory] = useState();
    const getCategory = async () => {
        try {
            const response = await axios.get("/api/data/categories");
            setCategory(response.data.categorySearch);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return category;
}
