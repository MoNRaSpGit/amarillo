import React, { useRef, useState, useEffect } from 'react';
import jsQR from 'jsqr';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedResult, setScannedResult] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setScannedResult(code.data);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div>
      <h1>Camera Component</h1>
      <button onClick={startCamera}>Start Camera</button>
      <div style={{ width: '100%', height: '300px', border: '1px solid black' }}>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
      </div>
      <p>Scanned Result: {scannedResult}</p>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraComponent;
