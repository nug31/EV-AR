import React from 'react';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-green-500 p-2 rounded-lg">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">EV AR</span>
            </div>
            <p className="text-gray-300 max-w-md text-sm sm:text-base">
              Revolutionary electric vehicle education through augmented reality. Learn EV technology 
              with immersive 3D experiences and hands-on virtual training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">EV Basics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Battery Technology</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Charging Systems</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">Maintenance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">contact@evar.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm sm:text-base">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-xs sm:text-sm">&copy; 2025 EV AR Educational Platform. All rights reserved.</p>
          
          {/* PWA Install Button for Mobile */}
          <div className="mt-4 sm:hidden" id="pwa-install-section" style="display: none;">
            <button 
              id="pwa-install-btn" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              style="display: none;"
            >
              📱 Install App
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
