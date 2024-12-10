import { Header } from "../components/Header/Header";
import { ProductsGrid } from "../components/Products/ProductsGrid";

export const Home = () => {
  return (
    <main className="max-w-[1280px] w-screen h-screen max-h-dvh m-auto py-8 px-4 sm:px-8 space-y-8">
      <Header />
      <ProductsGrid />
    </main>
  );
};
