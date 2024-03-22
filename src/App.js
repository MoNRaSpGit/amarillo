import React, { useRef, useState, useEffect } from 'react';
import Quagga from 'quagga'; // Importa la biblioteca de escaneo de códigos de barras

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [scannedResult, setScannedResult] = useState('');
  const [scanningMessage, setScanningMessage] = useState('No se ha escaneado ningún código de barras');

  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoRef.current
      },
      decoder: {
        readers: ["code_128_reader", "ean_reader"] // Especifica los tipos de código de barras que deseas escanear
      },
      locate: true
    }, function (err) {
      if (err) {
        console.error('Quagga initialization error:', err);
        return;
      }
      console.log('Quagga initialization finished. Ready to start scanning.');
    });

    return () => {
      Quagga.stop();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startScanning = () => {
    setScanningMessage('Escaneando...');
    Quagga.start();
  };

  Quagga.onDetected(data => {
    console.log('Barcode detected:', data.codeResult.code);
    setScannedResult(data.codeResult.code);
    setScanningMessage('Código de barras escaneado con éxito');
    Quagga.stop();
  });

  return (
    <div>
      <h1>Componente de Cámara</h1>
      <div style={{ width: '100%', height: '300px', border: '1px solid black', position: 'relative' }}>
        <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>
      <button onClick={startCamera}>Iniciar cámara</button>
      <button onClick={startScanning}>Iniciar escaneo</button>
      <p>{scanningMessage}</p>
      {scannedResult && <p>Resultado escaneado: {scannedResult}</p>}
    </div>
  );
};

export default CameraComponent;