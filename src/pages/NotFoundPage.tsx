import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="brut-card mx-auto max-w-lg space-y-4 bg-sun p-10 text-center text-[#141414]">
      <p className="text-8xl leading-none font-bold">404</p>
      <p className="text-lg font-bold">Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="btn btn-plain">
        ← Về trang chủ
      </Link>
    </div>
  );
}
