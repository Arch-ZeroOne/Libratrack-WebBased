import { useEffect } from "react";
import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { CreateConfigProps, ComponentCallbackProps } from "../../types/qrcode";

const qrCodeRegionId = "html5qr-code-full-region";

//settings for camera
const createConfig = (props: ComponentCallbackProps) => {
  let config: CreateConfigProps = {
    fps: 0,
    qrbox: 0,
    aspectRatio: 0,
    disableFlip: false,
  };

  //How fast camera looks for qr codes
  if (props.fps) {
    config.fps = props.fps;
  }

  //The size of the square that we will aim or the actual qr code
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }

  //Width or height for camera display
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }

  //Wether tp prevent horizontal flippinf
  if (props.disableFlip) {
    config.disableFlip = props.disableFlip;
  }

  return config;
};

const HTML5QrCodePlugin = (props: ComponentCallbackProps) => {
  useEffect(() => {
    //When component mounts

    //Creates the configuration
    const config = createConfig(props);
    //Wether to display extra information
    const verbose = props.verbose === true;

    //Runs when a qr code is found
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback";
    }

    //Creates the instance of the scanner
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrCodeRegionId,
      config,
      verbose
    );

    //Executes functions wether error or not
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    //cleanup function
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrCodeScanner", error);
      });
    };
  }, []);

  return <div id={qrCodeRegionId}></div>;
};
function ScanQR() {
  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) => {
    //Handles decoded result

    console.log(decodedText);
  };
  const onError = () => {};
  return (
    <div className="App">
      <h1>Scan Student QR</h1>
      <HTML5QrCodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
        qrCodeErrorCallback={onError}
      />
    </div>
  );
}

export default ScanQR;
