import React, { useRef, useState, useEffect } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

const ScannerComponent = () => {
  const videoRef = useRef(null);
  const [scanningMessage, setScanningMessage] = useState('No se está escaneando');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    let codeReader;
    let timerId;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        codeReader = new BrowserBarcodeReader();
        codeReader.decodeFromVideoElement(videoRef.current, (result) => {
          if (result) {
            setScanningMessage(`Código de barras escaneado: ${result.getText()}`);
            setIsScanning(false);
            clearTimeout(timerId);
          }
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    if (isScanning) {
      startCamera();
      timerId = setTimeout(() => {
        setScanningMessage('No se encontró ningún código de barras');
        setIsScanning(false);
      }, 5000); // Cambiado a 5 segundos
    }

    return () => {
      if (codeReader) {
        codeReader.reset();
      }
      clearTimeout(timerId);
    };
  }, [isScanning]);

  const startScanning = () => {
    setScanningMessage('Escaneando...');
    setIsScanning(true);
  };

  const stopScanning = () => {
    setScanningMessage('No se está escaneando');
    setIsScanning(false);
  };

  return (
    <div>
      <h1>Scanner Component</h1>
      <div style={{ width: '100%', height: '300px', border: '1px solid black', position: 'relative' }}>
        <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>
      <button onClick={isScanning ? stopScanning : startScanning}>
        {isScanning ? 'Detener escaneo' : 'Iniciar escaneo'}
      </button>
      <p>{scanningMessage}</p>
    </div>
  );
};

export default ScannerComponent;
