import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Battery, 
  Zap, 
  Wrench, 
  BookOpen, 
  Eye, 
  Award,
  ArrowRight,
  CheckCircle,
  Users,
  Clock
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: Eye,
      title: "AR Visualization",
      description: "Interactive 3D models of EV components with augmented reality overlay"
    },
    {
      icon: BookOpen,
      title: "Structured Learning",
      description: "Progressive curriculum from basics to advanced EV maintenance"
    },
    {
      icon: Wrench,
      title: "Virtual Maintenance",
      description: "Hands-on simulations for battery care and system troubleshooting"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Complete assessments and earn certificates for your achievements"
    }
  ];

  const courses = [
    {
      id: "beginner",
      title: "EV Fundamentals",
      description: "Learn the basics of electric vehicles, components, and operation",
      icon: Battery,
      color: "from-green-500 to-emerald-600",
      lessons: 12,
      duration: "6 hours",
      level: "Beginner"
    },
    {
      id: "intermediate",
      title: "Battery & Charging",
      description: "Deep dive into battery technology and charging infrastructure",
      icon: Zap,
      color: "from-blue-500 to-cyan-600",
      lessons: 15,
      duration: "8 hours",
      level: "Intermediate"
    },
    {
      id: "advanced",
      title: "Maintenance & Repair",
      description: "Advanced troubleshooting and maintenance procedures",
      icon: Wrench,
      color: "from-purple-500 to-violet-600",
      lessons: 18,
      duration: "10 hours",
      level: "Advanced"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
              Learn Electric Vehicles
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl">Through AR</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto px-2">
              Master electric vehicle technology with immersive augmented reality experiences. 
              From battery basics to advanced maintenance, learn by seeing and doing.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                to="/course/beginner"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg text-sm sm:text-base"
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/ar/battery-system"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30 text-sm sm:text-base"
              >
                <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Try AR Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionary EV Education
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of automotive education with cutting-edge AR technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-green-500 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Structured courses designed to take you from beginner to expert
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className={`h-32 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                  <course.icon className="h-16 w-16 text-white" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Start Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Students Enrolled</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">AR Learning Modules</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Completion Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};