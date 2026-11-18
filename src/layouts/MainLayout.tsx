import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="overflow-hidden border-b-2 border-ink bg-sun py-1.5 font-mono text-xs font-bold whitespace-nowrap text-[#141414]">
        ★ MIỄN PHÍ VẬN CHUYỂN ĐƠN TỪ $50 &nbsp;★&nbsp; ĐỔI TRẢ TRONG 7 NGÀY &nbsp;★&nbsp;
      </div>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t-2 border-ink bg-card py-4 text-center font-mono text-xs text-muted">
        ShopMini · Bài thực hành 03 · React + TypeScript + Redux Toolkit
      </footer>
    </div>
  );
}
