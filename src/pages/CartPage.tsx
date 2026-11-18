import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
} from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="brut-card mx-auto max-w-lg space-y-4 p-10 text-center">
        <p className="text-5xl">🧺</p>
        <p className="text-xl font-bold">Giỏ hàng đang trống</p>
        <Link to="/" className="btn btn-accent">
          Đi mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">
        Giỏ hàng <span className="font-mono text-xl text-muted">({count})</span>
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <ul className="space-y-4">
          {items.map(({ product, quantity }) => (
            <li key={product.id} className="brut-card flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap">
              <img
                src={product.image}
                alt={product.title}
                className="h-20 w-20 shrink-0 border-2 border-ink bg-white object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 leading-snug font-bold">{product.title}</p>
                <p className="mt-1 font-mono text-sm text-muted">{formatPrice(product.price)}</p>
              </div>

              <div className="flex items-center border-2 border-ink">
                <button
                  onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}
                  className="h-9 w-9 cursor-pointer text-lg font-bold hover:bg-sun hover:text-[#141414]"
                  aria-label="Giảm số lượng"
                >
                  −
                </button>
                <span className="grid h-9 w-10 place-items-center border-x-2 border-ink font-mono font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}
                  className="h-9 w-9 cursor-pointer text-lg font-bold hover:bg-sun hover:text-[#141414]"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>

              <div className="flex w-24 flex-col items-end gap-1">
                <span className="font-mono font-bold">{formatPrice(product.price * quantity)}</span>
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="cursor-pointer text-xs font-bold text-accent underline"
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="brut-card space-y-4 bg-sun p-5 text-[#141414] lg:sticky lg:top-24">
          <h2 className="font-mono text-sm font-bold">TÓM TẮT ĐƠN</h2>
          <div className="flex justify-between">
            <span>Số lượng</span>
            <span className="font-mono font-bold">{count}</span>
          </div>
          <div className="flex items-end justify-between border-t-2 border-dashed border-[#141414] pt-4">
            <span className="font-bold">Tổng cộng</span>
            <span className="font-mono text-3xl font-bold">{formatPrice(total)}</span>
          </div>
          <Link to="/checkout" className="btn btn-plain w-full !bg-[#141414] !text-white">
            Thanh toán →
          </Link>
          <button onClick={() => dispatch(clearCart())} className="btn btn-plain w-full">
            Xoá tất cả
          </button>
        </aside>
      </div>
    </div>
  );
}
