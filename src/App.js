import React, { useRef, useState } from 'react';

const ScannerComponent = () => {
  const videoRef = useRef(null);
  const [scanningMessage, setScanningMessage] = useState('No se está escaneando');
  const [isScanning, setIsScanning] = useState(false);

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
    setIsScanning(true);
    // Lógica para iniciar el escaneo
    // Por ejemplo, puedes utilizar la biblioteca de escaneo de códigos de barras aquí
  };

  const stopScanning = () => {
    setScanningMessage('No se está escaneando');
    setIsScanning(false);
    // Lógica para detener el escaneo
  };

  return (
    <div>
      <h1>Scanner Component</h1>
      <div style={{ width: '100%', height: '300px', border: '1px solid black', position: 'relative' }}>
        <video ref={videoRef} autoPlay playsInline style={{ position: 'absolute', width: '100%', height: '100%' }} />
      </div>
      <button onClick={startCamera}>Abrir cámara</button>
      <button onClick={isScanning ? stopScanning : startScanning}>
        {isScanning ? 'Detener escaneo' : 'Iniciar escaneo'}
      </button>
      <p>{scanningMessage}</p>
    </div>
  );
};

export default ScannerComponent;
