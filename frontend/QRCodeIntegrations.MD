# Html5QrcodePlugin for React

A **React wrapper component** around the [html5-qrcode](https://github.com/mebjas/html5-qrcode) library that allows you to **scan QR codes using the device camera** with a simple built-in UI.

This component handles mounting, cleanup, and configuration, making it easy to integrate QR scanning into your React applications.

---

## 📌 Purpose of the Library

- Provides a **ready-to-use QR code scanner** for React applications
- Handles **camera access, QR code detection, and UI** automatically
- Allows you to **configure scanning options** like frame rate, scanning box size, and aspect ratio
- Automatically **cleans up the camera feed** when the component unmounts to prevent memory leaks
- Designed to be **reusable**, **configurable**, and **production-ready** for applications such as:
  - Student attendance systems
  - Event check-ins
  - Library management
  - Access control

---

## 🔹 Features

- Uses **device camera** to detect QR codes in real-time
- Built-in **scanning UI** with camera preview, scanning square, and multiple camera support
- Configurable **FPS**, **QR box size**, **aspect ratio**, and **flip behavior**
- Provides **success and error callbacks** for handling QR code data
- React-friendly with **automatic cleanup** on unmount
- Optional **verbose logging** for debugging

---

## 📦 Installation

```bash
npm install html5-qrcode
```

Add the `Html5QrcodePlugin.jsx` file to your project:

```jsx
import Html5QrcodePlugin from "./Html5QrcodePlugin";
```

---

## ⚙️ Props

| Prop                    | Type                                          | Default      | Description                                            |
| ----------------------- | --------------------------------------------- | ------------ | ------------------------------------------------------ |
| `fps`                   | `number`                                      | `undefined`  | Frames per second to scan for QR codes                 |
| `qrbox`                 | `number` or `{width: number, height: number}` | `undefined`  | Size of the QR code scanning box                       |
| `aspectRatio`           | `number`                                      | `undefined`  | Width/Height ratio for camera preview                  |
| `disableFlip`           | `boolean`                                     | `undefined`  | Prevent horizontal flipping of the camera              |
| `verbose`               | `boolean`                                     | `false`      | Enable console logs for debugging                      |
| `qrCodeSuccessCallback` | `(decodedText: string) => void`               | **REQUIRED** | Function to run when a QR code is successfully scanned |
| `qrCodeErrorCallback`   | `(errorMessage: string) => void`              | Optional     | Function to run when an error occurs during scanning   |

---

## 🎯 Usage (React Example)

```jsx
import React from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

function App() {
  const handleScanSuccess = (decodedText) => {
    console.log("QR Code Found:", decodedText);
  };

  const handleScanError = (errorMessage) => {
    console.warn("QR Code Error:", errorMessage);
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        verbose={true}
        qrCodeSuccessCallback={handleScanSuccess}
        qrCodeErrorCallback={handleScanError}
      />
    </div>
  );
}

export default App;
```

---

## 🔹 How It Works

1. `Html5QrcodePlugin` creates a React component that mounts a div for the QR scanner
2. The `html5-qrcode` library renders a built-in UI into the div:
   - Camera preview
   - Scanning square
   - Start/Stop buttons
3. When a QR code is detected, `qrCodeSuccessCallback` is triggered with the decoded value
4. If an error occurs during scanning, `qrCodeErrorCallback` is triggered
5. When the component unmounts, it automatically stops the camera using the `clear()` method

---

## 🧩 TypeScript Usage

To use this plugin in TypeScript, you can create a `Html5QrcodePlugin.tsx` file and define prop types using interface:

```tsx
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number | { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props: Html5QrcodePluginProps) => {
  const config: any = {};
  if (props.fps) config.fps = props.fps;
  if (props.qrbox) config.qrbox = props.qrbox;
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
  return config;
};

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
  useEffect(() => {
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required.");
    }

    const config = createConfig(props);
    const verbose = props.verbose === true;
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      html5QrcodeScanner.clear().catch(console.error);
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
```

### ✅ Advantages of TypeScript

- Type safety for props
- Auto-completion in IDE
- Fewer runtime errors

---

## 🔹 Notes / Tips

- **HTTPS required** for camera access in browsers
- `verbose={true}` is useful for debugging, but set `false` in production
- `qrbox` can be a number or width/height object
- If you need custom UI, consider using `Html5Qrcode` instead of `Html5QrcodeScanner`

---

## 📖 References

- [html5-qrcode GitHub](https://github.com/mebjas/html5-qrcode)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🔑 Summary

This plugin is a React-friendly QR code scanner that leverages the built-in UI of `html5-qrcode` and provides an easy way to integrate real-time scanning into React apps. It also works with TypeScript, making it safe, scalable, and production-ready.
