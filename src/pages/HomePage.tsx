import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  // Từ khoá tìm kiếm chỉ dùng ở trang này -> useState (local state)
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(keyword.trim().toLowerCase()));

  return (
    <section className="space-y-8">
      <div className="brut-card grid gap-6 bg-sky p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
        <div className="space-y-3 text-[#141414]">
          <span className="inline-block border-2 border-ink bg-paper px-2 py-0.5 font-mono text-xs font-bold">
            BỘ SƯU TẬP MỚI
          </span>
          <h1 className="text-4xl leading-none font-bold tracking-tight sm:text-5xl">
            Mua sắm gọn,
            <br />
            chọn nhanh.
          </h1>
        </div>
        <div className="w-full md:w-80">
          <label htmlFor="search" className="mb-1.5 block font-mono text-xs font-bold text-[#141414]">
            TÌM THEO TÊN
          </label>
          <input
            id="search"
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="vd: backpack, jacket..."
            className="field"
          />
        </div>
      </div>

      {status === "loading" && (
        <p className="py-10 text-center font-mono font-bold">Đang tải sản phẩm...</p>
      )}

      {status === "failed" && (
        <div className="brut-card bg-accent p-5 text-center text-[#141414]">
          <p className="font-bold">{error}</p>
          <button onClick={() => dispatch(fetchProducts())} className="btn btn-plain mt-3">
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" && (
        <>
          <p className="font-mono text-sm text-muted">
            {filtered.length} / {items.length} sản phẩm
          </p>
          {filtered.length === 0 ? (
            <p className="py-10 text-center font-bold">Không tìm thấy sản phẩm phù hợp.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
