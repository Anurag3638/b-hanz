

// Hero Slides
export const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2025",
    description: "Discover our newest arrivals for the summer season. Fresh styles, bold colors.",
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    buttonText: "Shop Now",
    link: "/categories/summer"
  },
  {
    id: 2,
    title: "Flash Sale Up to 50% Off",
    description: "Limited time offer on selected items. Hurry while supplies last!",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    buttonText: "View Deals",
    link: "/sales/flash"
  },
  {
    id: 3,
    title: "New Tech Arrivals",
    description: "Explore the latest gadgets and tech accessories at unbeatable prices.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    buttonText: "Discover",
    link: "/categories/electronics"
  }
];

// Categories
export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1001&q=80",
    productCount: 45
  },
  {
    id: "clothing",
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    productCount: 128
  },
  {
    id: "home",
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    productCount: 64
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
    productCount: 32
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
    productCount: 87
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    productCount: 41
  }
];

// Products
// const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("/api/data/products");
//       setProducts(res.data.products);
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   fetchProducts();
// }, []);
// export const products = AllProductsData();
// Featured products (subset of products)
// export const featuredProducts = [
//   products[1], // Smart Fitness Tracker
//   products[3], // Premium Coffee Maker
//   products[4], // Organic Face Serum
//   products[6]  // Building Blocks Set
// ];

// New Arrivals (subset of products marked as new)
// const newArrivals = products.filter(product => product.isNew);
// const bestSellers = products.filter(product => product.isBestSeller);
// const specialOffers = products.filter(product => product.discount > 0);
