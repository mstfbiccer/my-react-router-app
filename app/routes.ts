import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("cart", "routes/cart.tsx"),
  route("category/:categoryName", "routes/category.tsx"),
  route("product/:productId", "routes/product.tsx")
] satisfies RouteConfig;
