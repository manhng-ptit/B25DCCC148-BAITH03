import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearCart, selectCartItems, selectCartTotal } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  // Cờ thông báo thành công chỉ dùng ở trang này -> useState
  const [ordered, setOrdered] = useState(false);

  if (ordered) {
    return (
      <div className="brut-card mx-auto max-w-md space-y-3 bg-mint p-10 text-center text-[#141414]">
        <p className="text-5xl">🎉</p>
        <h1 className="text-3xl font-bold">Đặt hàng thành công!</h1>
        <p className="font-medium">Cảm ơn bạn đã mua sắm tại ShopMini.</p>
        <Link to="/" className="btn btn-plain mt-2">
          Về trang chủ
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="brut-card mx-auto max-w-lg space-y-4 p-10 text-center">
        <p className="text-xl font-bold">Không có sản phẩm nào để thanh toán.</p>
        <Link to="/" className="btn btn-accent">
          ← Về trang chủ
        </Link>
      </div>
    );
  }

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">Thanh toán</h1>

      <div className="brut-card">
        <div className="border-b-2 border-ink bg-sun px-5 py-2 font-mono text-xs font-bold text-[#141414]">
          HOÁ ĐƠN
        </div>
        <ul className="divide-y-2 divide-dashed divide-ink/40">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <span className="line-clamp-1 font-medium">
                {product.title} <span className="font-mono text-muted">×{quantity}</span>
              </span>
              <span className="font-mono font-bold">{formatPrice(product.price * quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink px-5 py-4">
          <p className="text-lg">
            Tổng: <strong className="font-mono text-2xl">{formatPrice(total)}</strong>
          </p>
          <button onClick={handleOrder} className="btn btn-accent px-8 py-3 text-base">
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}
