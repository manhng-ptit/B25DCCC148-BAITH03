# ShopMini

Ứng dụng cửa hàng mini — **React + TypeScript (Vite) + Tailwind CSS v4**, quản lý state bằng **Context API** và **Redux Toolkit**.

## Chạy dự án

```bash
npm install
npm run dev
npm run build
```

Đăng nhập giả lập: username bất kỳ (không rỗng), password `123456`.

## Dữ liệu nào để ở đâu và lý do

| Dữ liệu | Nơi lưu | Lý do |
|---|---|---|
| Danh sách sản phẩm, trạng thái tải (`idle/loading/succeeded/failed`), lỗi | **Redux** (`productsSlice`) | Dữ liệu lấy từ API, nhiều trang cùng dùng (Trang chủ, Chi tiết). Cần `createAsyncThunk` để quản lý bất đồng bộ và cache, tránh gọi lại API khi chuyển trang. |
| Giỏ hàng (`items`) và selector tổng số lượng / tổng tiền | **Redux** (`cartSlice`) | State toàn cục có nhiều thao tác cập nhật (thêm, xoá, đổi số lượng, xoá hết) và được nhiều nơi đọc (Header, Giỏ hàng, Thanh toán). Reducer và selector giúp logic tập trung, dễ kiểm thử. |
| Theme sáng/tối | **Context** (`ThemeContext`) | State giao diện đơn giản, ít thay đổi, chỉ cần chia sẻ cho cây component. Không có logic phức tạp nên không cần Redux. |
| Người dùng đăng nhập (`user`, `login`, `logout`) | **Context** (`AuthContext`) | Cần dùng ở Header, `ProtectedRoute`, `LoginPage`. Là dữ liệu phiên đăng nhập giả lập, ít thay đổi, Context là đủ gọn. |
| Từ khoá tìm kiếm (HomePage) | **useState** | Chỉ trang chủ dùng; không cần chia sẻ. |
| Ô nhập username/password và thông báo lỗi (LoginPage) | **useState** | State của form, chỉ tồn tại trong trang đăng nhập. |
| Cờ `ordered` hiện thông báo đặt hàng thành công (CheckoutPage) | **useState** | Chỉ phục vụ hiển thị cục bộ ở trang thanh toán. |

**Nguyên tắc:** state chỉ một component dùng → `useState`; state giao diện/phiên ít thay đổi dùng chung → Context; dữ liệu từ API và state nghiệp vụ có nhiều thao tác → Redux Toolkit.

## Cấu trúc thư mục

```
src/
├── app/            store.ts, hooks.ts
├── features/       products/productsSlice.ts, cart/cartSlice.ts
├── contexts/       ThemeContext.tsx, AuthContext.tsx
├── components/     Header, ProductCard, ProtectedRoute
├── layouts/        MainLayout.tsx
├── pages/          Home, ProductDetail, Cart, Login, Checkout, NotFound
├── types/          index.ts
├── utils/          format.ts
├── App.tsx         khai báo Routes
└── main.tsx        bọc Provider, ThemeProvider, AuthProvider, BrowserRouter
```
