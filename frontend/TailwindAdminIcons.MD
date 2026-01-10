# 🎨 Icons & SVG Architecture

This project uses **SVG icons as React components**, following modern Tailwind + TypeScript best practices commonly used in admin dashboards.

---

## 📁 Project Structure

```
src/
└── icons/
    ├── BoxCubeIcon.tsx
    ├── CalendarIcon.tsx
    ├── GridIcon.tsx
    ├── UserCircleIcon.tsx
    └── index.ts
```

### Why this approach?

- ✨ Icons are fully stylable using Tailwind classes
- 🎯 Supports hover, active, dark mode, and transitions
- 📦 Centralized icon management
- 🚀 Clean and scalable imports

---

## 📦 Barrel Export Pattern

All icons are re-exported from a single entry file:

```ts
// src/icons/index.ts
export { default as BoxCubeIcon } from "./BoxCubeIcon";
export { default as CalendarIcon } from "./CalendarIcon";
export { default as GridIcon } from "./GridIcon";
export { default as UserCircleIcon } from "./UserCircleIcon";
```

### Usage

```tsx
import { GridIcon, UserCircleIcon } from "@/icons";

<GridIcon className="w-5 h-5 text-slate-400" />;
```

This keeps imports clean and avoids deep file paths.

---

## 🧩 Icon Component Structure

Each icon is a simple React component wrapping an SVG:

```tsx
// BoxCubeIcon.tsx
import React from "react";

const BoxCubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    {/* SVG paths */}
  </svg>
);

export default BoxCubeIcon;
```

### Key details

- Uses `currentColor` for easy Tailwind styling
- Accepts all SVG props
- Works seamlessly with `className`

---

## 🧠 SVG TypeScript Declaration

To allow importing SVGs as React components, the project includes a TypeScript module declaration.

### File Location

```
src/types/svg.d.ts
```

### Declaration

```ts
declare module "*.svg?react" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
```

### ❓ What this declaration does

> **Important:** This file does not render icons and does not store SVGs.

It tells TypeScript how to understand imports like:

```ts
import Icon from "./icon.svg?react";
```

It enables:

- ✅ SVG → React component imports
- ✅ Full TypeScript support
- ✅ Proper IntelliSense for SVG props
- ✅ Compatibility with Vite + SVGR

---

## ⚙️ SVG Transformation

The actual SVG-to-React conversion is handled by the build tool (e.g. Vite with SVGR):

```ts
import svgr from "vite-plugin-svgr";

export default {
  plugins: [svgr()],
};
```

**The `.d.ts` file only provides type information.**

---

## ✅ Best Practices Used

- 🎨 SVG icons instead of icon fonts
- 📦 Centralized icon exports
- 🔒 Type-safe SVG imports
- 🎯 Tailwind-friendly icon styling
- 🏢 Scalable admin dashboard pattern

---

## 🚫 Common Mistakes to Avoid

| ❌ Don't                             | ✅ Do                                     |
| ------------------------------------ | ----------------------------------------- |
| Put `declare module` files in `.tsx` | Use `.d.ts` files in `src/types/`         |
| Import SVGs without `?react`         | Use `import Icon from "./icon.svg?react"` |
| Use `<img>` for UI icons             | Use SVG components                        |
| Scatter icon imports across the app  | Use barrel exports from `@/icons`         |

---

## 🏁 Summary

This icon system ensures:

- 🧹 Clean JSX
- 🔒 Strong typing
- 🛠️ Easy maintenance
- 🚀 Production-ready admin UI architecture

---

## 📚 Additional Resources

- [Vite + SVGR Plugin](https://github.com/pd4d10/vite-plugin-svgr)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Module Declarations](https://www.typescriptlang.org/docs/handbook/modules.html)

---

**Need help?** Feel free to open an issue or contribute to the project! 🙌
