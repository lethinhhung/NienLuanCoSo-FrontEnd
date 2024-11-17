
# Dự án Quản lý Học tập Cá nhân - Frontend

Dự án này là một ứng dụng web giúp người dùng quản lý việc học tập cá nhân, bao gồm các tính năng như quản lý khóa học, bài học, dự án, bài kiểm tra và thống kê tiến độ học tập.


## Tính năng

- Đăng ký và đăng nhập: Cho phép người dùng tạo tài khoản và đăng nhập vào hệ thống.
- Quản lý hồ sơ cá nhân: Người dùng có thể cập nhật thông tin cá nhân và ảnh đại diện.
- Ghi chú cá nhân: Tạo và quản lý các ghi chú phục vụ cho việc học tập.
- Quản lý thẻ (Tags): Tạo và quản lý các thẻ để phân loại khóa học, dự án, bài học.
- Quản lý kỳ học (Terms): Tạo và quản lý các kỳ học, liên kết với các khóa học và bài học.
- Quản lý dự án: Tạo và theo dõi tiến độ các dự án học tập, bao gồm các bước thực hiện.
- Quản lý bài kiểm tra: Tạo và quản lý các bài kiểm tra, cập nhật điểm số.
- Thống kê học tập: Cung cấp các thống kê về tiến độ học tập, số lượng dự án hoàn thành, điểm số trung bình, v.v.
- Lịch sự kiện: Hiển thị lịch các sự kiện quan trọng liên quan đến việc học tập.
## Công nghệ sử dụng

**Frontend:** ReactJS, Ant Design, Chart.js, Axios, Classnames.

**Backend:** Node.js, Express.js, MongoDB (mongoose), Multer, bcrypt, dotenv.

**Authentication:** JSON Web Token (JWT).

**Styling:** SASS (SCSS Modules), CSS.

## Links


[Frontend](https://github.com/lethinhhung/NienLuanCoSo-FrontEnd)

[Backend](https://github.com/lethinhhung/NienLuanCoSo-BackEnd)


## Cài đặt

Yêu cầu hệ thống

- Node.js (>=12.x)
- npm hoặc yarn
- MongoDB

Clone repository

```bash
git clone project-link
cd project-name
```

Cài đặt các package

```bash
npm install
```

Cấu hình biến môi trường - tạo file .env ở thư mục gốc với nội dung

```bash
REACT_APP_VITE_BACKEND_URL=your_backend_url
//your_backend_url là url của backend, ví dụ http://localhost:8080
```


## Triển khai ứng dụng

```bash
  npm start
```

Ứng dụng sẽ chạy tại địa chỉ http://localhost:3000

Lưu ý cần chạy backend trước


## Sử dụng

- Truy cập vào trang chủ và tạo tài khoản mới hoặc đăng nhập nếu đã có tài khoản.
- Sau khi đăng nhập, người dùng sẽ được chuyển đến bảng điều khiển (Dashboard) nơi hiển thị tổng quan về tiến độ học tập.
- Người dùng có thể truy cập các mục như Khóa học, Kỳ học, Dự án, Bài kiểm tra để quản lý chi tiết.
## APIs

[Frontend](https://github.com/lethinhhung/NienLuanCoSo-FrontEnd)

[Backend](https://github.com/lethinhhung/NienLuanCoSo-BackEnd)
## Authors

[@thinghunggg](https://github.com/lethinhhung)

