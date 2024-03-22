import React, { useRef } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);

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
    </div>
  );
};

export default CameraComponent;
