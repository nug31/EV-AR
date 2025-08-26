import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Eye, BookOpen, Zap } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock search data - in a real app, this would come from an API
  const searchResults = [
    {
      id: 1,
      title: "Introduction to Electric Vehicles",
      description: "Learn the basics of electric vehicle technology and components",
      type: "lesson",
      category: "beginner",
      duration: "30 min",
      hasAR: false,
      url: "/course/beginner"
    },
    {
      id: 2,
      title: "Battery System AR Model",
      description: "Interactive 3D visualization of EV battery pack components",
      type: "ar",
      category: "interactive",
      duration: "15 min",
      hasAR: true,
      url: "/ar/battery-system"
    },
    {
      id: 3,
      title: "Electric Motor Types",
      description: "Understanding different types of electric motors used in EVs",
      type: "lesson",
      category: "beginner",
      duration: "40 min",
      hasAR: true,
      url: "/course/beginner"
    },
    {
      id: 4,
      title: "Battery Chemistry Deep Dive",
      description: "Advanced concepts in lithium-ion battery technology",
      type: "lesson",
      category: "intermediate",
      duration: "45 min",
      hasAR: true,
      url: "/course/intermediate"
    },
    {
      id: 5,
      title: "Charging Infrastructure",
      description: "Types of charging stations and protocols",
      type: "lesson",
      category: "intermediate",
      duration: "35 min",
      hasAR: true,
      url: "/course/intermediate"
    },
    {
      id: 6,
      title: "EV Diagnostic Tools",
      description: "Professional diagnostic equipment and procedures",
      type: "lesson",
      category: "advanced",
      duration: "60 min",
      hasAR: true,
      url: "/course/advanced"
    }
  ];

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         result.category === selectedFilter || 
                         result.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ar':
        return Eye;
      case 'lesson':
        return BookOpen;
      default:
        return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'from-green-500 to-emerald-600';
      case 'intermediate':
        return 'from-blue-500 to-cyan-600';
      case 'advanced':
        return 'from-purple-500 to-violet-600';
      case 'interactive':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for lessons, AR models, topics..."
                className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <Search className="absolute left-4 top-3.5 h-6 w-6 text-gray-400" />
            </div>
            
            {/* Filter Dropdown */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="lesson">Lessons</option>
                <option value="ar">AR Models</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {searchQuery && (
            <p className="mt-4 text-gray-600">
              Found {filteredResults.length} results for "{searchQuery}"
            </p>
          )}
        </motion.div>

        {/* Search Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResults.map((result, index) => {
            const TypeIcon = getTypeIcon(result.type);
            
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 overflow-hidden"
              >
                <Link to={result.url} className="block">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-r ${getCategoryColor(result.category)} w-10 h-10 rounded-lg flex items-center justify-center`}>
                          <TypeIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {result.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                              result.category === 'beginner' ? 'bg-green-100 text-green-800' :
                              result.category === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                              result.category === 'advanced' ? 'bg-purple-100 text-purple-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                            </span>
                            {result.hasAR && (
                              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                                AR
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{result.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {result.duration}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {result.type === 'ar' && (
                          <span className="text-sm font-medium text-purple-600">View in AR</span>
                        )}
                        {result.type === 'lesson' && (
                          <span className="text-sm font-medium text-blue-600">Start Lesson</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {filteredResults.length === 0 && searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
              <button
                onClick={() => setSelectedFilter('all')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};