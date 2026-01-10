# React + TypeScript + AG Grid — Daily Reference

This document summarizes **key concepts, reasons, and best practices** discussed today for using **React + TypeScript with AG Grid**, including typing rows, columns, action buttons, and icons.

---

## 1. `interface` vs `type` (When to Use Which)

### ✅ Use `interface` for

- Object shapes
- React props
- AG Grid row data models
- Public / extendable APIs

```ts
interface Student {
  id: number;
  name: string;
  age: number;
  isActive: boolean;
}
```

**Why?**

- Readable
- Extendable
- Preferred by React & AG Grid typings

---

### ✅ Use `type` for

- Union types
- Function aliases
- Utility / conditional types

```ts
type Status = "loading" | "success" | "error";

type OnSubmit = (data: Student) => void;
```

---

## 2. Row Data Interface (Why It Matters)

```ts
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
```

### Purpose

- Defines the **shape of ONE grid row**
- Used by AG Grid to type:

  - Columns
  - Cell values
  - Renderers

> Think: `IRow` = blueprint of a single row

---

## 3. `ColDef<IRow>` — Why Columns Are Typed

```ts
const [colDefs] = useState<ColDef<IRow>[]>([
  { field: "make" },
  { field: "model" },
  { field: "price" },
  { field: "electric" },
]);
```

### What This Does

- Locks column `field` values to keys of `IRow`
- Prevents typos
- Enables autocomplete
- Types `params.value` correctly

❌ Without generics → `field: string`, `value: any`

---

## 4. Adding Action Buttons (Edit / Delete)

### Step 1: Define props for the action cell

```ts
interface ActionCellProps extends ICellRendererParams<Student> {
  onEdit: (row: Student) => void;
  onDelete: (row: Student) => void;
}
```

### Why This Interface Exists

- Defines **what the cell renderer receives**
- Combines:

  - AG Grid cell data (`data`, `value`, etc.)
  - Custom actions (`onEdit`, `onDelete`)

---

## 5. What `void` Means (Beginner Explanation)

```ts
(row: Student) => void
```

### Meaning

- The function **returns nothing**
- It performs an action (open modal, delete row)

### Why `void` is correct

- Button clicks don’t expect results
- UI events are "fire-and-forget"

---

## 6. Action Cell Renderer Component

```tsx
const ActionCell: React.FC<ActionCellProps> = ({ data, onEdit, onDelete }) => {
  if (!data) return null;

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onEdit(data)}>Edit</button>
      <button onClick={() => onDelete(data)}>Delete</button>
    </div>
  );
};
```

### TypeScript Guarantees

- `data` is a `Student`
- `onEdit(data)` is valid
- No runtime guessing

---

## 7. Using Icons in Action Cells (Why They Look Small)

### Problem

- AG Grid cells have small default font size
- SVG icons inherit that size

### ✅ Correct Fix

```tsx
<Edit size={18} />
<Trash2 size={18} />
```

or

```tsx
<Edit className="w-5 h-5" />
```

---

## 8. Recommended Icon Sizes

| Location          | Size    |
| ----------------- | ------- |
| AG Grid action    | 16–18px |
| Toolbar           | 20–24px |
| Standalone button | 24–28px |

---

## 9. Best Practices (Remember These)

✔ Always type row data (`IRow`, `Student`)
✔ Use `ColDef<IRow>`
✔ Use a dedicated action cell renderer
✔ UI event handlers should return `void`
✔ Explicitly size icons inside AG Grid
✔ Avoid `any`

---

## 10. One-Line Summary

> TypeScript binds your data model to AG Grid so errors are caught at compile time, not in production.

---

## 11. Mental Model

```txt
Row Interface
   ↓
ColDef<IRow>
   ↓
Cell Renderer gets typed data
   ↓
Buttons act on the correct row
```

---

**Use this README as your quick reference while building React + TypeScript + AG Grid projects.**
