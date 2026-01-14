import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";

export interface CreateConfigProps {
  fps: number;
  qrbox: number;
  aspectRatio?: number;
  disableFlip?: boolean;
}
export interface QrConfigProps {
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
}

export type ComponentCallbackProps = CreateConfigProps & QrConfigProps;
