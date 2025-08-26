import React, { Suspense, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCcw, Maximize, Info, Eye, X } from 'lucide-react';

// 3D Model Components
const BatterySystem: React.FC = () => {
  return (
    <group>
      {/* Battery Pack */}
      <Box args={[4, 1, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2563eb" />
      </Box>
      
      {/* Battery Cells */}
      {Array.from({ length: 8 }, (_, i) => (
        <Cylinder
          key={i}
          args={[0.1, 0.1, 0.8]}
          position={[-1.5 + i * 0.4, 0.6, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial color="#10b981" />
        </Cylinder>
      ))}
      
      {/* Cooling System */}
      <Box args={[4.2, 0.2, 2.2]} position={[0, -0.6, 0]}>
        <meshStandardMaterial color="#06b6d4" />
      </Box>
      
      {/* Labels */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        EV Battery Pack
      </Text>
    </group>
  );
};

const MotorAssembly: React.FC = () => {
  return (
    <group>
      {/* Stator */}
      <Cylinder args={[1.5, 1.5, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#dc2626" />
      </Cylinder>
      
      {/* Rotor */}
      <Cylinder args={[0.8, 0.8, 1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#7c2d12" />
      </Cylinder>
      
      {/* Windings */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        return (
          <Box key={i} args={[0.15, 0.8, 0.15]} position={[x, 0, z]}>
            <meshStandardMaterial color="#f59e0b" />
          </Box>
        );
      })}
      
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Electric Motor
      </Text>
    </group>
  );
};

const ChargingStation: React.FC = () => {
  return (
    <group>
      {/* Base */}
      <Box args={[1, 3, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      
      {/* Screen */}
      <Box args={[0.8, 0.6, 0.05]} position={[0, 0.8, 0.3]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      
      {/* Charging Cable */}
      <Cylinder args={[0.05, 0.05, 2]} position={[0.6, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#000000" />
      </Cylinder>
      
      {/* Connector */}
      <Box args={[0.2, 0.3, 0.15]} position={[1.5, -1.5, 0]}>
        <meshStandardMaterial color="#ef4444" />
      </Box>
      
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        DC Fast Charger
      </Text>
    </group>
  );
};

export const ARViewerPage: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const controlsRef = useRef<any>();

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const getModelComponent = () => {
    switch (modelId) {
      case 'battery-system':
        return <BatterySystem />;
      case 'motor-assembly':
        return <MotorAssembly />;
      case 'charging-station':
        return <ChargingStation />;
      default:
        return <BatterySystem />;
    }
  };

  const getModelInfo = () => {
    const info = {
      'battery-system': {
        title: 'EV Battery System',
        description: 'Interactive 3D model of a lithium-ion battery pack with cooling system',
        keyFeatures: [
          'Individual battery cells',
          'Thermal management system',
          'Battery management electronics',
          'Structural housing'
        ]
      },
      'motor-assembly': {
        title: 'Electric Motor Assembly',
        description: 'Detailed view of an AC induction motor used in electric vehicles',
        keyFeatures: [
          'Copper windings',
          'Rotor assembly',
          'Stator core',
          'Magnetic field visualization'
        ]
      },
      'charging-station': {
        title: 'DC Fast Charging Station',
        description: 'Commercial fast-charging infrastructure for electric vehicles',
        keyFeatures: [
          'Power electronics',
          'Charging cable and connector',
          'User interface display',
          'Safety systems'
        ]
      }
    };
    
    return info[modelId as keyof typeof info] || info['battery-system'];
  };

  const modelInfo = getModelInfo();

  const [showInfo, setShowInfo] = React.useState(false);
  const [isARMode, setIsARMode] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile-Optimized Header */}
      <div className="bg-gray-800 text-white p-3 sm:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2 sm:mb-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/course/beginner"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Course</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <h1 className="text-lg sm:text-2xl font-bold truncate">{modelInfo.title}</h1>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={resetCamera}
                className="flex items-center px-2 sm:px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button 
                onClick={() => setIsARMode(!isARMode)}
                className={`flex items-center px-2 sm:px-3 py-2 rounded-lg transition-colors text-sm ${
                  isARMode ? 'bg-purple-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
                <span className="hidden sm:inline">AR</span>
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="lg:hidden flex items-center px-2 sm:px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
              >
                <Info className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                <span className="hidden sm:inline">Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* 3D Viewer - Full Screen on Mobile */}
        <div className="h-[70vh] sm:h-[80vh] lg:h-screen relative">
          <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <pointLight position={[-10, -10, -10]} intensity={0.7} />
              {getModelComponent()}
              <OrbitControls 
                ref={controlsRef} 
                enablePan={true} 
                enableZoom={true} 
                enableRotate={true}
                minDistance={2}
                maxDistance={15}
                enableDamping={true}
                dampingFactor={0.1}
              />
            </Suspense>
          </Canvas>

          {/* Mobile Touch Instructions */}
          <div className="absolute top-2 left-2 bg-black/70 text-white p-3 rounded-lg max-w-xs text-xs sm:text-sm">
            <div className="flex items-center mb-2">
              <Info className="h-4 w-4 text-blue-400 mr-2" />
              <h3 className="font-semibold">Controls</h3>
            </div>
            <p className="text-gray-300">
              <span className="sm:hidden">Touch & drag to rotate • Pinch to zoom</span>
              <span className="hidden sm:inline">Drag to rotate • Scroll to zoom • Right-click to pan</span>
            </p>
            {isARMode && (
              <p className="text-green-400 mt-2 font-semibold">
                AR Mode Active - Point camera at flat surface
              </p>
            )}
          </div>

          {/* Mobile Floating Action Buttons */}
          <div className="lg:hidden absolute bottom-4 right-4 flex flex-col space-y-2">
            <button
              onClick={resetCamera}
              className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full shadow-lg transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors">
              <Maximize className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Information Panel - Slide Up */}
        <div className={`lg:hidden fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-2xl transform transition-transform duration-300 z-50 ${
          showInfo ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">{modelInfo.title}</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">{modelInfo.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 mb-4">
              {modelInfo.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-2 gap-2">
              <button className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                Take Quiz
              </button>
              <button className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Information Panel */}
        <div className="hidden lg:block absolute top-0 right-0 w-80 h-full bg-white shadow-lg overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{modelInfo.title}</h2>
            <p className="text-gray-600 mb-6">{modelInfo.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
            <ul className="space-y-2 mb-6">
              {modelInfo.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Learning Objectives</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Identify major components</li>
                <li>• Understand system interactions</li>
                <li>• Recognize maintenance points</li>
                <li>• Analyze safety considerations</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Take Quiz
              </button>
              <button className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Download 3D Model
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Related Topics</h4>
              <div className="space-y-2">
                <Link to="/ar/battery-system" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → Battery Technology
                </Link>
                <Link to="/ar/motor-assembly" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → Electric Motors
                </Link>
                <Link to="/ar/charging-station" className="block text-blue-600 hover:text-blue-800 text-sm">
                  → Charging Systems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};