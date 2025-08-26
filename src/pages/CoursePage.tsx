import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  Lock, 
  Eye, 
  Clock, 
  Award,
  ArrowRight,
  Book,
  Target
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { progress, completeLesson } = useProgress();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Mock course data - in a real app, this would come from an API
  const courseData = {
    beginner: {
      title: "EV Fundamentals",
      description: "Master the basics of electric vehicles",
      totalLessons: 12,
      estimatedTime: "6 hours",
      lessons: [
        {
          id: "intro-to-evs",
          title: "Introduction to Electric Vehicles",
          description: "Overview of EV technology and benefits",
          duration: "30 min",
          hasAR: false,
          type: "video"
        },
        {
          id: "ev-components",
          title: "EV Components Overview",
          description: "Main components of an electric vehicle",
          duration: "25 min",
          hasAR: true,
          arModel: "ev-overview",
          type: "interactive"
        },
        {
          id: "battery-basics",
          title: "Battery Fundamentals",
          description: "Understanding EV battery technology",
          duration: "35 min",
          hasAR: true,
          arModel: "battery-system",
          type: "interactive"
        },
        {
          id: "electric-motors",
          title: "Electric Motor Types",
          description: "Different types of electric motors in EVs",
          duration: "40 min",
          hasAR: true,
          arModel: "motor-assembly",
          type: "interactive"
        },
        {
          id: "charging-intro",
          title: "Charging Basics",
          description: "Introduction to EV charging methods",
          duration: "20 min",
          hasAR: false,
          type: "video"
        },
        {
          id: "safety-basics",
          title: "EV Safety Fundamentals",
          description: "Basic safety considerations for EVs",
          duration: "25 min",
          hasAR: false,
          type: "video"
        }
      ]
    },
    intermediate: {
      title: "Battery & Charging Systems",
      description: "Deep dive into EV power systems",
      totalLessons: 15,
      estimatedTime: "8 hours",
      lessons: [
        {
          id: "battery-chemistry",
          title: "Battery Chemistry Deep Dive",
          description: "Understanding lithium-ion and other battery types",
          duration: "45 min",
          hasAR: true,
          arModel: "battery-chemistry",
          type: "interactive"
        },
        {
          id: "bms-systems",
          title: "Battery Management Systems",
          description: "How BMS monitors and protects batteries",
          duration: "50 min",
          hasAR: true,
          arModel: "bms-system",
          type: "interactive"
        },
        {
          id: "charging-infrastructure",
          title: "Charging Infrastructure",
          description: "Types of charging stations and protocols",
          duration: "35 min",
          hasAR: true,
          arModel: "charging-station",
          type: "interactive"
        },
        {
          id: "thermal-management",
          title: "Thermal Management",
          description: "Battery cooling and heating systems",
          duration: "40 min",
          hasAR: true,
          arModel: "cooling-system",
          type: "interactive"
        }
      ]
    },
    advanced: {
      title: "Maintenance & Diagnostics",
      description: "Professional-level EV service and repair",
      totalLessons: 18,
      estimatedTime: "10 hours",
      lessons: [
        {
          id: "diagnostic-tools",
          title: "EV Diagnostic Equipment",
          description: "Professional diagnostic tools and procedures",
          duration: "60 min",
          hasAR: true,
          arModel: "diagnostic-tools",
          type: "interactive"
        },
        {
          id: "battery-maintenance",
          title: "Battery Maintenance Procedures",
          description: "Proper battery care and maintenance schedules",
          duration: "55 min",
          hasAR: true,
          arModel: "battery-maintenance",
          type: "simulation"
        },
        {
          id: "troubleshooting",
          title: "System Troubleshooting",
          description: "Identifying and resolving common issues",
          duration: "70 min",
          hasAR: true,
          arModel: "troubleshooting-sim",
          type: "simulation"
        }
      ]
    }
  };

  const course = courseData[courseId as keyof typeof courseData];
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Return Home</Link>
        </div>
      </div>
    );
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const isLessonUnlocked = (lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const previousLessonId = course.lessons[lessonIndex - 1].id;
    return isLessonCompleted(previousLessonId);
  };

  const getCompletionPercentage = () => {
    const completedCount = course.lessons.filter(lesson => 
      isLessonCompleted(lesson.id)
    ).length;
    return Math.round((completedCount / course.lessons.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <section className="bg-gradient-to-r from-blue-900 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl text-blue-100 mb-8">{course.description}</p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Book className="h-5 w-5 mr-2" />
                {course.totalLessons} Lessons
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Clock className="h-5 w-5 mr-2" />
                {course.estimatedTime}
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Target className="h-5 w-5 mr-2" />
                {getCompletionPercentage()}% Complete
              </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lessons List */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Lessons</h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => {
                  const isCompleted = isLessonCompleted(lesson.id);
                  const isUnlocked = isLessonUnlocked(index);
                  
                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`bg-white rounded-lg shadow-md border-2 transition-all ${
                        isCompleted 
                          ? 'border-green-200 bg-green-50' 
                          : isUnlocked 
                            ? 'border-gray-200 hover:border-blue-300 hover:shadow-lg cursor-pointer' 
                            : 'border-gray-100 bg-gray-50 opacity-60'
                      }`}
                      onClick={() => isUnlocked && setSelectedLesson(lesson.id)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className="flex items-center mr-4">
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6 text-green-500" />
                                ) : isUnlocked ? (
                                  <div className="w-6 h-6 border-2 border-blue-300 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                  </div>
                                ) : (
                                  <Lock className="h-6 w-6 text-gray-400" />
                                )}
                                <span className="ml-2 text-sm font-medium text-gray-500">
                                  Lesson {index + 1}
                                </span>
                              </div>
                              {lesson.hasAR && (
                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                  AR Experience
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {lesson.title}
                            </h3>
                            <p className="text-gray-600 mb-3">{lesson.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.duration}
                              {lesson.type === 'interactive' && (
                                <span className="ml-4 flex items-center">
                                  <Play className="h-4 w-4 mr-1" />
                                  Interactive
                                </span>
                              )}
                              {lesson.type === 'simulation' && (
                                <span className="ml-4 flex items-center">
                                  <Target className="h-4 w-4 mr-1" />
                                  Simulation
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-4">
                            {isUnlocked && (
                              <div className="flex space-x-2">
                                {lesson.hasAR && (
                                  <Link
                                    to={`/ar/${lesson.arModel}`}
                                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    AR View
                                  </Link>
                                )}
                                <button
                                  onClick={() => !isCompleted && completeLesson(lesson.id)}
                                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isCompleted 
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-blue-600 text-white hover:bg-blue-700'
                                  }`}
                                >
                                  {isCompleted ? 'Completed' : 'Start Lesson'}
                                  {!isCompleted && <ArrowRight className="ml-1 h-4 w-4" />}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Course Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Progress</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Overall Progress</span>
                    <span>{getCompletionPercentage()}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Completed Lessons</span>
                    <span className="font-semibold">
                      {course.lessons.filter(lesson => isLessonCompleted(lesson.id)).length} / {course.lessons.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">AR Experiences</span>
                    <span className="font-semibold">
                      {course.lessons.filter(lesson => lesson.hasAR).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Time</span>
                    <span className="font-semibold">{course.estimatedTime}</span>
                  </div>
                </div>

                {getCompletionPercentage() === 100 && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Award className="h-8 w-8 text-green-500 mr-3" />
                      <div>
                        <h4 className="font-semibold text-green-800">Course Complete!</h4>
                        <p className="text-sm text-green-600">You've earned a certificate</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Next Steps</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {courseId === 'beginner' && (
                      <Link to="/course/intermediate" className="block hover:text-blue-600">
                        → Advanced to Intermediate Course
                      </Link>
                    )}
                    {courseId === 'intermediate' && (
                      <Link to="/course/advanced" className="block hover:text-blue-600">
                        → Try the Advanced Course
                      </Link>
                    )}
                    <Link to="/progress" className="block hover:text-blue-600">
                      → View Your Progress
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};