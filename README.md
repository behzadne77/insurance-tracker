# یادآور بیمه - مدیریت هوشمند بیمه‌های شخصی

پروژه‌ای برای مدیریت و یادآوری تاریخ انقضای بیمه‌های شخصی با استفاده از Next.js، TypeScript و Ant Design.

## ویژگی‌ها

- 🔐 سیستم احراز هویت کامل
- 📋 مدیریت بیمه‌های مختلف (خودرو، عمر، خانه و...)
- 💰 پشتیبانی از پرداخت یکجا و اقساط
- 📅 یادآوری تاریخ انقضای بیمه‌ها
- 📱 طراحی پاسخگو
- 🌐 رابط کاربری فارسی

## تکنولوژی‌های استفاده شده

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Storage**: LocalStorage

## نصب و اجرا

```bash
# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev

# ساخت نسخه تولید
npm run build

# اجرای نسخه تولید
npm start
```

## ساختار پروژه

```
src/
├── app/                 # صفحات Next.js
├── components/          # کامپوننت‌های React
│   ├── base/           # کامپوننت‌های پایه
│   ├── insurance/      # کامپوننت‌های بیمه
│   └── page/           # صفحات اصلی
├── hooks/              # Custom Hooks
├── types/              # تعاریف TypeScript
└── utils/              # توابع کمکی
```

## انتشار روی GitHub Pages

این پروژه برای انتشار روی GitHub Pages بهینه‌سازی شده است.

### مراحل انتشار:

1. پروژه را در GitHub push کنید
2. در تنظیمات repository، GitHub Pages را فعال کنید
3. Source را روی `gh-pages` branch تنظیم کنید
4. پروژه در آدرس `https://username.github.io/Bime` قابل دسترسی خواهد بود

## مشارکت

برای مشارکت در پروژه:

1. پروژه را fork کنید
2. یک branch جدید ایجاد کنید
3. تغییرات خود را commit کنید
4. Pull Request ارسال کنید

## لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.
