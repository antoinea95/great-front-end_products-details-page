import { Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";
import { ProductsGrid } from "./components/Products/ProductsGrid";
import { ProductDetail } from "./components/Products/ProductDetail";

function App() {
  return (
    <main className="max-w-[1280px] w-screen m-auto py-4 px-4 pb-24 sm:px-8 space-y-8">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop-all" element={<ProductsGrid />} />
        <Route path="/latest" element={<ProductsGrid params={{"collection": "latest"}} />} />
        <Route path="/:productId" element={<ProductDetail /> } />
      </Routes>
    </main>
  );
}

export default App;
