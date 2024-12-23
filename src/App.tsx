import { Route, Routes } from "react-router";
import { Header } from "./layout/Header/Header";
import { Home } from "./pages/Home";
import { ProductsGrid } from "./components/Products/ProductsGrid";
import { ProductDetail } from "./components/Products/ProductDetail";
import { Footer } from "./layout/Footer/Footer";

function App() {
  return (
    <main className="mx-auto px-4 pb-4">
      <Header />
      <div className="bg-white rounded-md mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop-all" element={<ProductsGrid />} />
        <Route path="/latest" element={<ProductsGrid params={{"collection": "latest"}} />} />
        <Route path="/:productId" element={<ProductDetail /> } />
      </Routes>
      <Footer/>
      </div>
    </main>
  );
}

export default App;
