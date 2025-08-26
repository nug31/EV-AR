import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

// ---------- Camera feed background (pseudo-AR) ----------
const CameraBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream as any;
          await videoRef.current.play();
          setOk(true);
        }
      } catch (e) {
        setOk(false);
      }
    };
    start();
    return () => {
      stream?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <video ref={videoRef} muted playsInline className={`w-full h-full object-cover ${ok ? '' : 'hidden'}`} />
      {!ok && (
        <div className="w-full h-full flex items-center justify-center text-white/80">
          Camera not available. Using dark background.
        </div>
      )}
    </div>
  );
};

// ---------- Simple battery pack (parametric boxes) ----------
const BatteryModule: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={[1.2, 0.24, 0.6]} />
      <meshStandardMaterial color="#2563eb" metalness={0.2} roughness={0.4} />
    </mesh>
    <mesh position={[0, -0.15, 0]} receiveShadow>
      <boxGeometry args={[1.22, 0.02, 0.62]} />
      <meshStandardMaterial color="#67e8f9" metalness={0.1} roughness={0.6} />
    </mesh>
  </group>
);

const BatteryPack3D: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <group scale={scale}>
    {/* Tray */}
    <mesh position={[0, -0.25, 0]} castShadow receiveShadow>
      <boxGeometry args={[6, 0.18, 3]} />
      <meshStandardMaterial color="#7fe3d0" metalness={0.1} roughness={0.7} />
    </mesh>
    {/* 8 modules */}
    {Array.from({ length: 2 }).map((_, r) =>
      Array.from({ length: 4 }).map((__, c) => (
        <BatteryModule key={`${r}-${c}`} position={[-2.25 + c * 1.5, 0, -0.9 + r * 0.9]} />
      )),
    )}
    {/* 800V fuse */}
    <mesh position={[-2.8, 0.05, 1.1]} castShadow>
      <boxGeometry args={[0.9, 0.28, 0.5]} />
      <meshStandardMaterial color="#fbbf24" />
    </mesh>
    {/* BMS */}
    <mesh position={[2.8, 0.05, 1.1]} castShadow>
      <boxGeometry args={[0.9, 0.2, 0.5]} />
      <meshStandardMaterial color="#a3a3a3" />
    </mesh>
    {/* Connectors */}
    <mesh position={[2.6, 0.05, -1.2]} castShadow>
      <boxGeometry args={[0.7, 0.18, 0.4]} />
      <meshStandardMaterial color="#c084fc" />
    </mesh>
    <mesh position={[1.6, 0.05, -1.2]} castShadow>
      <boxGeometry args={[0.7, 0.18, 0.4]} />
      <meshStandardMaterial color="#a3e635" />
    </mesh>
    {/* Label */}
    <Text position={[0, 1.2, 0]} fontSize={0.3} color="black" anchorX="center" anchorY="middle">
      EV Battery Pack
    </Text>
  </group>
);

// ---------- Gyro-based subtle parallax ----------
const GyroParallax: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<THREE.Group>(null);
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      // Apply very subtle tilt for realism
      const tiltX = THREE.MathUtils.degToRad((e.beta || 0) * 0.02); // front/back
      const tiltY = THREE.MathUtils.degToRad((e.gamma || 0) * 0.02); // left/right
      if (ref.current) ref.current.rotation.set(tiltX, tiltY, 0);
    };
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      try {
        // iOS permission flow
        // @ts-ignore
        if (DeviceOrientationEvent.requestPermission) {
          // @ts-ignore
          DeviceOrientationEvent.requestPermission().then((res: string) => {
            if (res === 'granted') window.addEventListener('deviceorientation', handler, true);
          });
        } else {
          window.addEventListener('deviceorientation', handler, true);
        }
      } catch {}
    }
    return () => window.removeEventListener('deviceorientation', handler, true);
  }, []);
  return <group ref={ref}>{children}</group>;
};

// ---------- Placement helpers ----------
function useTapPlacement(onPlace: (p: THREE.Vector3) => void) {
  const { camera, gl, scene } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []); // y=0
  const ndc = new THREE.Vector2();

  useEffect(() => {
    const handler = (ev: MouseEvent | TouchEvent) => {
      let x = 0, y = 0;
      if (ev instanceof TouchEvent) {
        const t = ev.touches[0] || ev.changedTouches[0];
        if (!t) return;
        const rect = gl.domElement.getBoundingClientRect();
        x = (t.clientX - rect.left) / rect.width;
        y = (t.clientY - rect.top) / rect.height;
      } else {
        const me = ev as MouseEvent;
        const rect = gl.domElement.getBoundingClientRect();
        x = (me.clientX - rect.left) / rect.width;
        y = (me.clientY - rect.top) / rect.height;
      }
      ndc.set(x * 2 - 1, -(y * 2 - 1));
      raycaster.setFromCamera(ndc, camera);
      const p = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, p);
      if (isFinite(p.x) && isFinite(p.z)) onPlace(p);
    };
    gl.domElement.addEventListener('click', handler);
    gl.domElement.addEventListener('touchend', handler);
    return () => {
      gl.domElement.removeEventListener('click', handler);
      gl.domElement.removeEventListener('touchend', handler);
    };
  }, [camera, gl, onPlace, plane, raycaster]);
}

// ---------- Dynamic light estimation (simple) ----------
const useAmbientIntensity = () => {
  const [intensity, setIntensity] = useState(0.9);
  useEffect(() => {
    // Try AmbientLightSensor first (not widely supported)
    // @ts-ignore
    if (typeof AmbientLightSensor !== 'undefined') {
      try {
        // @ts-ignore
        const sensor = new AmbientLightSensor();
        // @ts-ignore
        sensor.onreading = () => setIntensity(THREE.MathUtils.clamp(sensor.illuminance / 500, 0.3, 1.5));
        // @ts-ignore
        sensor.start();
        return () => sensor.stop();
      } catch {}
    }
    // Fallback: time-of-day heuristic
    const h = new Date().getHours();
    setIntensity(h >= 18 || h < 6 ? 0.6 : 1.0);
  }, []);
  return intensity;
};

// ---------- Main AR Scene ----------
const ARScene: React.FC = () => {
  const [anchor, setAnchor] = useState<THREE.Vector3 | null>(null);
  const [modelScale, setModelScale] = useState(1);
  const intensity = useAmbientIntensity();

  // Tap to place
  useTapPlacement((p) => {
    setAnchor(p.clone());
  });

  // Pinch to scale (basic)
  useEffect(() => {
    let startDist = 0;
    const handleStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        startDist = Math.hypot(dx, dy);
      }
    };
    const handleMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && startDist > 0) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const d = Math.hypot(dx, dy);
        const s = THREE.MathUtils.clamp(d / startDist, 0.5, 2.0);
        setModelScale(s);
      }
    };
    window.addEventListener('touchstart', handleStart, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3 * intensity} />
      <directionalLight position={[5, 8, 2]} intensity={0.8 * intensity} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      {/* Infinite ground plane (invisible) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <GyroParallax>
        {anchor && (
          <group position={[anchor.x, 0, anchor.z]}>
            <BatteryPack3D scale={modelScale} />
            <ContactShadows opacity={0.6} scale={10} blur={2.5} far={2.5} resolution={1024} color="#000000" />
          </group>
        )}
      </GyroParallax>

      {!anchor && (
        <group position={[0, 0.02, 0]}>
          {/* Placement reticle */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.25, 0.28, 32]} />
            <meshBasicMaterial color="#22c55e" opacity={0.9} transparent />
          </mesh>
          <Text position={[0, 0.02, 0.6]} fontSize={0.16} color="white" anchorX="center" anchorY="middle">
            Tap a surface to place the battery
          </Text>
        </group>
      )}

      {/* Desktop fallback controls */}
      <OrbitControls enablePan enableZoom enableRotate />
      <Environment preset="city" />
    </>
  );
};

export const ARBatteryRealPage: React.FC = () => (
  <div className="relative min-h-screen bg-black">
    <CameraBackground />

    {/* Top UI */}
    <div className="absolute top-0 inset-x-0 p-3 flex items-center justify-between text-white z-10">
      <Link to="/" className="bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30">← Home</Link>
      <div className="text-sm bg-white/20 px-3 py-1.5 rounded-lg">AR Battery (Real-like)</div>
    </div>

    <Canvas className="h-screen" shadows gl={{ antialias: true }} camera={{ position: [4.5, 3.2, 4.5], fov: 55 }}>
      <Suspense fallback={null}>
        <ARScene />
      </Suspense>
    </Canvas>

    {/* Bottom help */}
    <div className="absolute bottom-0 inset-x-0 p-3 z-10">
      <div className="mx-auto max-w-md bg-black/60 text-white text-center text-sm rounded-lg p-3">
        Tap untuk meletakkan baterai • Cubit untuk ubah ukuran • Gerakkan ponsel untuk efek realistis
      </div>
    </div>
  </div>
);

export default ARBatteryRealPage;

