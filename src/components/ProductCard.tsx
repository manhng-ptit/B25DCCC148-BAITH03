import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="brut-card group flex flex-col transition hover:-translate-y-1">
      <Link
        to={`/products/${product.id}`}
        className="relative flex h-52 items-center justify-center border-b-2 border-ink bg-white p-5"
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain transition group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 border-2 border-ink bg-sun px-2 py-0.5 font-mono text-sm font-bold text-[#141414]">
          {formatPrice(product.price)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <span className="tag self-start">{product.category}</span>
        <Link to={`/products/${product.id}`} className="line-clamp-2 leading-snug font-bold hover:underline">
          {product.title}
        </Link>
        <button onClick={() => dispatch(addToCart(product))} className="btn btn-accent mt-auto w-full">
          + Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
