# دليل الاستضافة الخارجية المجانية

## الخطوات بالترتيب

### 1. قاعدة البيانات — Neon.tech (مجاني مدى الحياة)
1. اذهب إلى [neon.tech](https://neon.tech) وأنشئ حساباً
2. أنشئ مشروعاً جديداً واحصل على `DATABASE_URL`
3. احتفظ برابط الاتصال — ستحتاجه في الخطوات التالية

### 2. الخادم الخلفي — Render.com (مجاني)
1. اذهب إلى [render.com](https://render.com) وأنشئ حساباً
2. اربط حسابك بـ GitHub (أو اضغط "New Web Service")
3. ارفع الكود على GitHub أولاً
4. في Render اختر "Web Service" وحدد الـ repo
5. أضف متغير البيئة: `DATABASE_URL` = رابط Neon الذي حصلت عليه
6. Render سيستخدم `render.yaml` تلقائياً
7. انتظر الـ deploy وانسخ رابط الـ API (مثل: `https://car-rental-api.onrender.com`)

> ⚠️ الخطة المجانية في Render تُوقف الخادم بعد 15 دقيقة من عدم الاستخدام (يستغرق الاستيقاظ ~30 ثانية)

### 3. الواجهة الأمامية — Vercel (مجاني مدى الحياة)
1. اذهب إلى [vercel.com](https://vercel.com) وأنشئ حساباً
2. اضغط "Add New Project" وحدد الـ repo
3. **مهم**: افتح `vercel.json` وغيّر `YOUR_RENDER_API_URL` إلى رابط Render الفعلي
4. أضف متغير البيئة: `VITE_API_BASE_URL` = رابط Render
5. اضغط Deploy

### 4. تشغيل نقل قاعدة البيانات
بعد ربط `DATABASE_URL` الجديد، شغّل:
```bash
pnpm --filter @workspace/db run push
```

---

## ملخص الخدمات
| الخدمة | الاستخدام | التكلفة |
|--------|-----------|---------|
| Neon.tech | PostgreSQL database | مجاني مدى الحياة (512MB) |
| Render.com | Express API server | مجاني (مع فترات نوم) |
| Vercel | React frontend | مجاني مدى الحياة |

## ملاحظة مهمة
بيانات الصور والعقود والتقارير محفوظة الآن في قاعدة البيانات — لا في المتصفح.
أي جهاز يدخل على التطبيق سيرى نفس البيانات.
