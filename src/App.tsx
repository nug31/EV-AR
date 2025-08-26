import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Simple working components
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">
          🚗⚡ EV AR Learning Platform
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Platform pembelajaran kendaraan listrik dengan teknologi AR
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link to="/ar/battery-pack" className="block">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">🔋</div>
              <h3 className="text-xl font-bold mb-2">Battery System AR</h3>
              <p className="text-blue-100">Lihat baterai EV dalam AR 3D</p>
            </div>
          </Link>
          
          <Link to="/ar/motor-assembly" className="block">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-2">Motor Assembly</h3>
              <p className="text-blue-100">Eksplorasi motor listrik 3D</p>
            </div>
          </Link>
          
          <Link to="/progress" className="block">
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl hover:bg-white/30 transition-all transform hover:scale-105">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">Progress Dashboard</h3>
              <p className="text-blue-100">Lihat kemajuan belajar</p>
            </div>
          </Link>
        </div>
        
        <div className="mt-12">
          <Link 
            to="/ar/battery-pack" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg mr-4"
          >
            🔋 AR Battery Pack
          </Link>
          <Link 
            to="/course/beginner" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all shadow-lg"
          >
            📚 Start Learning
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const CoursePage = () => (
  <div className="min-h-screen bg-blue-500 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 EV Course</h1>
      <p className="text-xl mb-8">Kursus pembelajaran kendaraan listrik lengkap</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Lesson 1: EV Basics</h3>
          <p className="mb-4">Pengenalan dasar kendaraan listrik</p>
          <Link to="/ar/battery-system" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
            🥽 View in AR
          </Link>
        </div>
        
        <div className="bg-white/20 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Lesson 2: Battery Tech</h3>
          <p className="mb-4">Teknologi baterai EV</p>
          <Link to="/ar/motor-assembly" className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700">
            🔧 Explore Motor
          </Link>
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-blue-200 hover:text-white">
          ← Back to Home
        </Link>
      </div>
    </div>
  </div>
);

const ARViewer = () => (
  <div className="min-h-screen bg-gray-900 text-white p-8">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">🥽 AR Viewer</h1>
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <div className="text-6xl mb-4">🔋</div>
        <h2 className="text-2xl font-bold mb-4">EV Battery System</h2>
        <p className="text-gray-300 mb-6">Interactive 3D model - Touch controls enabled</p>
        
        <div className="bg-blue-900 p-6 rounded-lg">
          <p className="text-sm text-blue-200 mb-2">AR Controls:</p>
          <p className="text-blue-100">📱 Touch & drag to rotate • 🤏 Pinch to zoom</p>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link to="/ar/motor-assembly" className="bg-purple-600 px-6 py-3 rounded hover:bg-purple-700">
          Next: Motor 🔧
        </Link>
        <Link to="/" className="bg-gray-600 px-6 py-3 rounded hover:bg-gray-700">
          Home 🏠
        </Link>
      </div>
    </div>
  </div>
);

const ProgressDashboard = () => (
  <div className="min-h-screen bg-green-600 text-white p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">📊 Progress Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/20 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold mb-2">75%</div>
          <div className="text-green-100">Course Progress</div>
        </div>
        <div className="bg-white/20 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold mb-2">12</div>
          <div className="text-green-100">Lessons Done</div>
        </div>
        <div className="bg-white/20 p-6 rounded-lg text-center">
          <div className="text-3xl font-bold mb-2">5</div>
          <div className="text-green-100">AR Models Viewed</div>
        </div>
      </div>
      
      <div className="bg-white/20 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🏆 Achievements</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 w-8 h-8 rounded-full flex items-center justify-center">🎯</div>
            <span>First AR Experience</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">📚</div>
            <span>Course Beginner Completed</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-green-200 hover:text-white">
          ← Back to Home
        </Link>
      </div>
    </div>
  </div>
);

// AR Battery Pack Component
const ARBatteryPage = () => {
  const [cameraActive, setCameraActive] = React.useState(false);
  
  React.useEffect(() => {
    // Try to activate camera for AR effect
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }, 
          audio: false 
        });
        setCameraActive(true);
        // In real implementation, we'd show video background
      } catch (e) {
        setCameraActive(false);
      }
    };
    startCamera();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Simulated camera background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"></div>
      
      {/* Top navigation */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between z-20">
        <Link to="/" className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
          ← Home
        </Link>
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          🔋 AR Battery Pack
        </div>
        <div className={`px-3 py-1 rounded-lg text-xs ${
          cameraActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}>
          {cameraActive ? '📹 AR Mode' : '🚫 No Camera'}
        </div>
      </div>

      {/* 3D Battery Visualization Area */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Battery Pack Visualization */}
          <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">EV Battery Pack</h1>
              <p className="text-blue-200">Interactive 3D Model based on E-GMP Architecture</p>
            </div>
            
            {/* Battery Components Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {/* Battery Modules */}
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bg-blue-600/40 p-4 rounded-lg border border-blue-400/30 hover:bg-blue-500/50 transition-colors cursor-pointer">
                  <div className="text-2xl mb-2">🔋</div>
                  <div className="text-xs">Module {i + 1}</div>
                </div>
              ))}
            </div>
            
            {/* Main Components */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-yellow-600/40 p-6 rounded-xl border border-yellow-400/30 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold mb-2">800V Fuse</h3>
                <p className="text-sm text-gray-300">High voltage protection</p>
              </div>
              
              <div className="bg-green-600/40 p-6 rounded-xl border border-green-400/30 text-center">
                <div className="text-3xl mb-3">🧠</div>
                <h3 className="font-bold mb-2">BMS</h3>
                <p className="text-sm text-gray-300">Battery Management System</p>
              </div>
              
              <div className="bg-cyan-600/40 p-6 rounded-xl border border-cyan-400/30 text-center">
                <div className="text-3xl mb-3">❄️</div>
                <h3 className="font-bold mb-2">Cooling</h3>
                <p className="text-sm text-gray-300">Thermal management</p>
              </div>
            </div>
            
            {/* Connectors */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-600/40 p-4 rounded-lg border border-purple-400/30 text-center">
                <div className="text-xl mb-2">🔌</div>
                <div className="text-sm">Rear HV Connector</div>
              </div>
              <div className="bg-lime-600/40 p-4 rounded-lg border border-lime-400/30 text-center">
                <div className="text-xl mb-2">🔌</div>
                <div className="text-sm">ICCU Connector</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-20">
        <div className="max-w-md mx-auto bg-black/60 backdrop-blur-sm text-center rounded-xl p-4">
          <p className="text-sm text-gray-300 mb-3">
            📱 Touch components to explore • 🤏 Pinch to zoom
          </p>
          <div className="flex justify-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors">
              Reset View
            </button>
            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors">
              Info Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
        <Route path="/ar/battery-pack" element={<ARBatteryPage />} />
        <Route path="/ar/:modelId" element={<ARViewer />} />
        <Route path="/progress" element={<ProgressDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;