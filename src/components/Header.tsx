import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCartCount } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const cartCount = useAppSelector(selectCartCount);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center border-2 border-ink bg-accent text-xl font-bold text-[#141414] shadow-[3px_3px_0_0_var(--ink)] transition group-hover:-rotate-6">
            S
          </span>
          <span className="text-2xl font-bold tracking-tight">
            shop<span className="text-accent">mini</span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2.5">
          {user && (
            <span className="hidden items-center gap-2 border-2 border-ink bg-mint px-3 py-1.5 text-sm font-bold text-[#141414] sm:flex">
              <span className="h-2 w-2 rounded-full bg-[#141414]" />
              {user.username}
            </span>
          )}

          <button onClick={toggleTheme} aria-label="Đổi giao diện sáng/tối" className="btn btn-plain">
            {theme === "light" ? "◐ Tối" : "◑ Sáng"}
          </button>

          {user ? (
            <button onClick={handleLogout} className="btn btn-plain">
              Đăng xuất
            </button>
          ) : (
            <Link to="/login" className="btn btn-plain">
              Đăng nhập
            </Link>
          )}

          <Link to="/cart" className="btn btn-accent">
            Giỏ hàng
            <span className="grid min-w-6 place-items-center border-2 border-ink bg-card px-1 font-mono text-xs text-ink">
              {cartCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
