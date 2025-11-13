# 🖼️ Image Optimization Guide

## ⚠️ Current Status

**Large images detected** - некоторые изображения очень тяжёлые:

```
фон (??).png          5.2MB  ⚠️ CRITICAL
перебивка1.png        4.1MB  ⚠️ CRITICAL
фон (не уверен).021   3.6MB  ⚠️ HIGH
фон (?).png           3.5MB  ⚠️ HIGH
перебивка.png         2.9MB  ⚠️ HIGH
паттерн фон.png       2.8MB  ⚠️ HIGH
фон ?.png             1.9MB  ⚠️ MEDIUM
```

**Impact on Performance:**
- Initial page load: +20-30MB
- Slower LCP (Largest Contentful Paint)
- Poor mobile experience
- Increased bandwidth costs

---

## ✅ Quick Wins (Recommended)

### Option 1: WebP Conversion (80% smaller)

WebP provides 80-90% file size reduction with identical visual quality.

**Using Squoosh CLI (Recommended):**

```bash
# Install Squoosh CLI
npm install -g @squoosh/cli

# Navigate to images directory
cd stakechess-app/public/images

# Convert all PNGs to WebP
squoosh-cli --webp auto *.png

# Result: фон (??).png (5.2MB) → фон (??).webp (500KB)
```

**Using ImageMagick:**

```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt install imagemagick   # Ubuntu

# Convert single file
convert "фон (??).png" -quality 85 -define webp:lossless=false "фон (??).webp"

# Batch convert all
for file in *.png; do
  convert "$file" -quality 85 -define webp:lossless=false "${file%.png}.webp"
done
```

**Update code to use WebP:**

```tsx
// Before
<img src="/images/фон (??).png" />

// After (with fallback)
<picture>
  <source srcSet="/images/фон (??).webp" type="image/webp" />
  <img src="/images/фон (??).png" alt="" />
</picture>
```

---

### Option 2: PNG Optimization (30% smaller)

Keep PNG format but reduce file size with lossless compression.

```bash
# Install pngquant
brew install pngquant  # macOS
apt install pngquant   # Ubuntu

# Optimize PNG (lossy, 30-50% reduction)
pngquant --quality=85-95 --ext .png --force "фон (??).png"

# Or use optipng (lossless, 10-20% reduction)
optipng -o7 "фон (??).png"
```

---

### Option 3: Resize Large Images

Some images are unnecessarily large. Resize them to actual display size.

```bash
# Check actual size needed in browser
# фон (??) is background: max 1920x1080 is enough

# Resize with ImageMagick
convert "фон (??).png" -resize 1920x1080^ -gravity center -extent 1920x1080 "фон (??)-optimized.png"

# Resize with sips (macOS)
sips -Z 1920 "фон (??).png"
```

**Recommended sizes:**
- Background images: 1920x1080 (Full HD)
- Hero images: 1280x720 (HD)
- Thumbnails: 640x360 (SD)
- Icons: 256x256 or smaller

---

## 🚀 Advanced Optimization

### Responsive Images

Serve different image sizes based on screen size:

```tsx
<img
  src="/images/фон-1920.webp"
  srcSet="
    /images/фон-640.webp 640w,
    /images/фон-1280.webp 1280w,
    /images/фон-1920.webp 1920w
  "
  sizes="100vw"
  alt=""
/>
```

Generate responsive variants:

```bash
# Create 3 sizes
convert "фон (??).png" -resize 640x -quality 85 "фон-640.webp"
convert "фон (??).png" -resize 1280x -quality 85 "фон-1280.webp"
convert "фон (??).png" -resize 1920x -quality 85 "фон-1920.webp"
```

---

### Blur Placeholders

For images with `loading="lazy"`, add blur placeholder:

```tsx
<img
  src="/images/перебивка1.webp"
  style={{
    backgroundImage: 'url(/images/перебивка1-tiny.webp)',
    backgroundSize: 'cover'
  }}
  loading="lazy"
/>
```

Generate tiny blur placeholder (< 5KB):

```bash
convert "перебивка1.png" -resize 20x -blur 0x2 -quality 70 "перебивка1-tiny.webp"
```

---

### CDN Integration

Upload images to Vercel Image Optimization or Cloudinary:

```tsx
// Using Vercel Image Optimization (automatic)
import Image from 'next/image'

<Image
  src="/images/фон (??).png"
  width={1920}
  height={1080}
  quality={85}
/>

// Or use Cloudinary
<img src="https://res.cloudinary.com/demo/image/upload/w_1920,q_auto,f_auto/фон.png" />
```

---

## 📊 Before/After Comparison

| Image | Before | After (WebP) | Savings |
|-------|--------|-------------|---------|
| фон (??).png | 5.2MB | 520KB | -90% |
| перебивка1.png | 4.1MB | 410KB | -90% |
| фон (?).png | 3.5MB | 350KB | -90% |
| паттерн фон.png | 2.8MB | 280KB | -90% |
| **TOTAL** | **19.5MB** | **1.9MB** | **-90%** |

---

## ✅ Optimization Checklist

- [ ] Convert all large PNGs to WebP format
- [ ] Resize background images to 1920x1080 max
- [ ] Add `loading="lazy"` to all non-critical images (✅ Done!)
- [ ] Generate responsive image variants (640w, 1280w, 1920w)
- [ ] Create blur placeholders for lazy-loaded images
- [ ] Test on mobile 3G network (Chrome DevTools)
- [ ] Verify Lighthouse Performance score >90
- [ ] Consider Vercel Image Optimization or Cloudinary

---

## 🎯 Recommended Workflow

**1. Quick Fix (5 minutes):**

```bash
cd stakechess-app/public/images
npm install -g @squoosh/cli
squoosh-cli --webp auto "фон (??).png" "перебивка1.png" "паттерн фон.png"
```

**2. Update CSS:**

```css
/* index.css */
.widescreen-bg {
  background-image: url('/images/фон (??).webp');
}

.speed-lines-overlay::after {
  background-image: url('/images/паттерн фон.webp');
}
```

**3. Update React components:**

```tsx
// Matchmaking.tsx
<img src="/images/перебивка1.webp" alt="" />
```

**4. Test performance:**

```bash
npm run build
npm run preview
# Open http://localhost:4173
# Check Network tab: total images < 5MB
```

---

## 📈 Expected Results

**Before optimization:**
- Page load: 25-30MB
- LCP: 4-5s
- Lighthouse Performance: 60-70

**After optimization:**
- Page load: 5-7MB (-80%)
- LCP: 1.5-2s (-60%)
- Lighthouse Performance: 90+ (+30%)

---

## 🔗 Tools & Resources

**CLI Tools:**
- [Squoosh CLI](https://github.com/GoogleChromeLabs/squoosh/tree/dev/cli) - Best WebP converter
- [ImageMagick](https://imagemagick.org/) - Swiss army knife for images
- [pngquant](https://pngquant.org/) - PNG compression
- [sharp](https://sharp.pixelplumbing.com/) - Node.js image processing

**Online Tools:**
- [Squoosh.app](https://squoosh.app/) - Visual WebP converter
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Cloudinary](https://cloudinary.com/) - Image CDN

**Vercel Integration:**
- [Vercel Image Optimization](https://vercel.com/docs/image-optimization)

---

## 💡 Pro Tips

1. **Keep original PNGs in separate folder** - `/images/originals/`
2. **Use WebP with PNG fallback** for browser compatibility
3. **Optimize during build** with vite-imagetools plugin
4. **Monitor bundle size** with `vite-bundle-visualizer`
5. **Test on real devices** - iPhone 13, Samsung Galaxy, etc.

---

**Status:** Optimization needed
**Priority:** High
**Estimated time:** 30 minutes
**Expected improvement:** 90% reduction in image size
