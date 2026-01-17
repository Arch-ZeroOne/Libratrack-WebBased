import { QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { Dispatch, SetStateAction } from "react";

export type CreateConfigProps = {
  fps: number;
  qrbox: number;
  aspectRatio?: number;
  disableFlip?: boolean;
};
export type QrConfigProps = {
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback: QrcodeErrorCallback;
};

export type HandleAddProps = {
  //Default handling type for states
  schoolId: string | undefined;
  //Typing the setter
  setSchoolId: Dispatch<SetStateAction<string | undefined>>;
  handleSubmit: () => void;
};
export type ComponentCallbackProps = CreateConfigProps & QrConfigProps;
