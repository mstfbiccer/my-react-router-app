import Banner from "~/components/Banner";
import type { Route } from "./+types/home";
import Layout from "~/layouts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <Layout>
      <h1
        style={{
          color: "blue",
        }}
      >Home Page</h1>
    </Layout>
  )
}
