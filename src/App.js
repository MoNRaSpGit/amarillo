import React, { useRef, useState } from 'react';
import Quagga from 'quagga'; // Importa la biblioteca de escaneo de códigos de barras

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [scannedResult, setScannedResult] = useState('');

  // Función para activar la cámara y comenzar el escaneo
  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["ean_reader"] // Especifica el tipo de código de barras que deseas escanear
      }
    }, function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    // Función para manejar el resultado del escaneo
    Quagga.onDetected(data => {
      setScannedResult(data.codeResult.code);
      Quagga.stop();
    });
  };

  return (
    <div>
      <h1>Barcode Scannerrrrrrr</h1>
      <video ref={videoRef} />
      <button onClick={startScanner}>Start Scanning</button>
      <p>Scanned Result: {scannedResult}</p>
    </div>
  );
};

export default BarcodeScanner;
