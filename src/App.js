import React, { useRef, useState, useEffect } from 'react';
import Quagga from 'quagga'; // Importa la biblioteca de escaneo de códigos de barras

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [scannedResult, setScannedResult] = useState('');

  useEffect(() => {
    console.log('Initializing Quagga...');
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["ean_reader"] // Especifica el tipo de código de barras que deseas escanear
      }
    }, function (err) {
      if (err) {
        console.error('Quagga initialization error:', err);
        return;
      }
      console.log('Quagga initialization finished. Ready to start scanning.');
    });

    return () => {
      Quagga.stop(); // Detener Quagga cuando el componente se desmonte para liberar recursos
    };
  }, []);

  // Función para activar la cámara y comenzar el escaneo
  const startScanner = () => {
    console.log('Starting scanner...');
    Quagga.start();
  };

  // Función para manejar el resultado del escaneo
  Quagga.onDetected(data => {
    console.log('Barcode detected:', data.codeResult.code);
    setScannedResult(data.codeResult.code);
    Quagga.stop();
  });

  return (
    <div>
      <h1>Barcode Scanner V2</h1>
      <button onClick={startScanner}>Start Scanning</button>
      <p>Scanned Result: {scannedResult}</p>
      <div style={{ width: '100%', height: '300px', border: '1px solid black' }}>
        <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default BarcodeScanner;
