import { Route, Routes } from "react-router";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home";
import { ProductsGrid } from "./components/Products/ProductsGrid";

function App() {
  return (
    <main className="max-w-[1280px] w-screen h-screen max-h-dvh m-auto py-8 px-4 sm:px-8 space-y-8">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shop-all" element={<ProductsGrid />} />
        <Route path="latest" element={<ProductsGrid params={{"collection": "latest"}} />} />
      </Routes>
    </main>
  );
}

export default App;
