import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder } from '@react-three/drei';
import { Link } from 'react-router-dom';

// Camera background (pseudo-AR)
const CameraBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream as any;
          await videoRef.current.play();
          setAvailable(true);
        }
      } catch (e) {
        setAvailable(false);
      }
    };
    start();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <video ref={videoRef} playsInline muted className={`w-full h-full object-cover ${available ? '' : 'hidden'}`} />
      {!available && (
        <div className="w-full h-full flex items-center justify-center text-white/80">
          <span>Camera not available. Showing 3D on dark background.</span>
        </div>
      )}
    </div>
  );
};

// 3D: Battery Pack based on diagram
const BatteryModule: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <Box args={[1.2, 0.25, 0.6]}> <meshStandardMaterial color="#1f78ff" /> </Box>
    {/* Cooling plates */}
    <Box args={[1.22, 0.02, 0.62]} position={[0, -0.14, 0]}> <meshStandardMaterial color="#66e0ff" /> </Box>
  </group>
);

const CoolingPipe: React.FC<{ from: [number, number, number]; to: [number, number, number] }>
= ({ from, to }) => {
  const dx = to[0]-from[0]; const dy = to[1]-from[1]; const dz = to[2]-from[2];
  const len = Math.sqrt(dx*dx + dy*dy + dz*dz);
  const dir = [dx/len, dy/len, dz/len] as [number, number, number];
  // Simple cylinder aligned along vector (approximate)
  return (
    <Cylinder args={[0.03, 0.03, len]} position={[ (from[0]+to[0])/2, (from[1]+to[1])/2, (from[2]+to[2])/2 ]}
      rotation={[ Math.acos(dir[1]), Math.atan2(dir[0], dir[2]), 0 ]}>
      <meshStandardMaterial color="#00c2a8" />
    </Cylinder>
  );
};

const BatteryPack3D: React.FC = () => {
  // Base tray
  return (
    <group>
      {/* Base tray */}
      <Box args={[6, 0.15, 3]} position={[0, -0.2, 0]}> <meshStandardMaterial color="#7fe3d0" /> </Box>

      {/* Modules grid 2 x 4 */}
      {Array.from({ length: 2 }).map((_, row) =>
        Array.from({ length: 4 }).map((__, col) => (
          <BatteryModule key={`${row}-${col}`} position={[-2.25 + col*1.5, 0, -0.9 + row*0.9]} />
        ))
      )}

      {/* 800V Fuse block */}
      <Box args={[0.9, 0.3, 0.5]} position={[-2.8, 0.05, 1.1]}> <meshStandardMaterial color="#fbbf24" /> </Box>
      <Text position={[-2.8, 0.6, 1.1]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">800V Fuse</Text>

      {/* BMS */}
      <Box args={[0.9, 0.2, 0.5]} position={[2.8, 0.05, 1.1]}> <meshStandardMaterial color="#9ca3af" /> </Box>
      <Text position={[2.8, 0.5, 1.1]} fontSize={0.2} color="black" anchorX="center" anchorY="middle">BMS</Text>

      {/* Connectors */}
      <Box args={[0.7, 0.2, 0.4]} position={[2.8, 0.05, -1.2]}> <meshStandardMaterial color="#c084fc" /> </Box>
      <Text position={[2.8, 0.5, -1.2]} fontSize={0.18} color="black" anchorX="center" anchorY="middle">Rear HV</Text>

      <Box args={[0.7, 0.2, 0.4]} position={[1.8, 0.05, -1.2]}> <meshStandardMaterial color="#a3e635" /> </Box>
      <Text position={[1.8, 0.5, -1.2]} fontSize={0.18} color="black" anchorX="center" anchorY="middle">ICCU</Text>

      {/* Cooling manifold left/right */}
      <CoolingPipe from={[-2.8, -0.1, -1.3]} to={[-2.8, -0.1, 1.3]} />
      <CoolingPipe from={[2.8, -0.1, -1.3]} to={[2.8, -0.1, 1.3]} />
      {/* Cross pipes feeding modules */}
      {[-1.35, 0.15, 1.65, -0.6, 0.9].map((z, i) => (
        <CoolingPipe key={i} from={[-2.8, -0.1, z]} to={[2.8, -0.1, z]} />
      ))}

      {/* Labels */}
      <Text position={[0, 1.2, 0]} fontSize={0.35} color="black" anchorX="center" anchorY="middle">EV Battery Pack</Text>
    </group>
  );
};

export const ARBatteryPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <CameraBackground />

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between text-white z-10">
        <Link to="/" className="bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30">← Home</Link>
        <div className="text-sm bg-white/20 px-3 py-1.5 rounded-lg">AR Battery Pack</div>
      </div>

      <Canvas camera={{ position: [6, 4, 6], fov: 55 }} className="h-screen">
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <directionalLight position={[-5, 6, -5]} intensity={0.5} />
          <BatteryPack3D />
          <OrbitControls enablePan enableZoom enableRotate />
        </Suspense>
      </Canvas>

      {/* Bottom help */}
      <div className="absolute bottom-0 inset-x-0 p-3 z-10">
        <div className="mx-auto max-w-md bg-black/60 text-white text-center text-sm rounded-lg p-3">
          Touch & drag to rotate • Pinch to zoom • Move phone to align with real world
        </div>
      </div>
    </div>
  );
};

export default ARBatteryPage;

