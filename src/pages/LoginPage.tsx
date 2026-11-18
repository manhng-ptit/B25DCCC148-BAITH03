import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LocationState {
  from?: string;
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? "/";

  // Form chỉ dùng cục bộ trong trang này -> useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate(from, { replace: true });
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
    }
  };

  return (
    <div className="brut-card mx-auto grid max-w-3xl overflow-hidden md:grid-cols-2">
      <div className="hidden flex-col justify-between border-r-2 border-ink bg-accent p-8 text-[#141414] md:flex">
        <span className="font-mono text-xs font-bold">SHOPMINI / ACCOUNT</span>
        <div>
          <p className="text-5xl leading-none font-bold">Chào mừng trở lại.</p>
          <p className="mt-3 text-sm font-medium">
            {from === "/checkout" ? "Đăng nhập để tiếp tục thanh toán." : "Đăng nhập để mua sắm nhanh hơn."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8">
        <h1 className="text-3xl font-bold">Đăng nhập</h1>
        <div>
          <label htmlFor="username" className="mb-1 block font-mono text-xs font-bold">
            TÊN ĐĂNG NHẬP
          </label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="field" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block font-mono text-xs font-bold">
            MẬT KHẨU
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field"
          />
        </div>
        {error && (
          <p className="border-2 border-ink bg-accent px-3 py-2 text-sm font-bold text-[#141414]">{error}</p>
        )}
        <button type="submit" className="btn btn-sun w-full py-3 text-base">
          Đăng nhập →
        </button>
      </form>
    </div>
  );
}
