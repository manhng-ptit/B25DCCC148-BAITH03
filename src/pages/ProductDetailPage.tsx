import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  // Vào thẳng URL chi tiết (chưa qua trang chủ) thì vẫn cần tải dữ liệu
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "idle" || status === "loading") {
    return <p className="py-10 text-center font-mono font-bold">Đang tải sản phẩm...</p>;
  }

  const product = items.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 font-bold">Không tìm thấy sản phẩm.</p>
        <Link to="/" className="btn btn-plain">
          ← Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Link to="/" className="btn btn-plain">
        ← Quay lại
      </Link>

      <div className="grid gap-0 md:grid-cols-5">
        <div className="brut-card flex items-center justify-center bg-white p-8 md:col-span-2 md:border-r-0">
          <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
        </div>

        <div className="brut-card space-y-5 p-6 md:col-span-3 md:p-8">
          <span className="tag">{product.category}</span>
          <h1 className="text-3xl leading-tight font-bold">{product.title}</h1>
          <p className="inline-block border-2 border-ink bg-sun px-3 py-1 font-mono text-3xl font-bold text-[#141414]">
            {formatPrice(product.price)}
          </p>
          <p className="leading-relaxed text-muted">{product.description}</p>
          <button onClick={() => dispatch(addToCart(product))} className="btn btn-accent px-8 py-3 text-base">
            + Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
