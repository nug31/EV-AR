import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Star,
  Trophy,
  Eye
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const ProgressPage: React.FC = () => {
  const { progress } = useProgress();

  // Mock data for demonstration
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first lesson",
      icon: BookOpen,
      earned: true,
      date: "2025-01-15"
    },
    {
      id: 2,
      title: "AR Explorer",
      description: "Viewed 5 AR models",
      icon: Eye,
      earned: true,
      date: "2025-01-16"
    },
    {
      id: 3,
      title: "Quick Learner",
      description: "Completed a course in under a week",
      icon: Clock,
      earned: false,
      date: null
    },
    {
      id: 4,
      title: "Perfect Score",
      description: "Achieved 100% on 3 quizzes",
      icon: Star,
      earned: false,
      date: null
    },
    {
      id: 5,
      title: "Expert Level",
      description: "Completed all advanced courses",
      icon: Trophy,
      earned: false,
      date: null
    }
  ];

  const coursesProgress = [
    {
      id: 'beginner',
      title: 'EV Fundamentals',
      totalLessons: 12,
      completedLessons: progress.completedLessons.filter(id => 
        ['intro-to-evs', 'ev-components', 'battery-basics', 'electric-motors', 'charging-intro', 'safety-basics'].includes(id)
      ).length,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'intermediate',
      title: 'Battery & Charging',
      totalLessons: 15,
      completedLessons: progress.completedLessons.filter(id => 
        ['battery-chemistry', 'bms-systems', 'charging-infrastructure', 'thermal-management'].includes(id)
      ).length,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'advanced',
      title: 'Maintenance & Repair',
      totalLessons: 18,
      completedLessons: progress.completedLessons.filter(id => 
        ['diagnostic-tools', 'battery-maintenance', 'troubleshooting'].includes(id)
      ).length,
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'lesson',
      title: 'Completed "Battery Fundamentals"',
      date: '2025-01-16',
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'ar',
      title: 'Viewed AR Battery System Model',
      date: '2025-01-16',
      icon: Eye
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Earned "AR Explorer" Achievement',
      date: '2025-01-16',
      icon: Award
    }
  ];

  const totalLessons = coursesProgress.reduce((sum, course) => sum + course.totalLessons, 0);
  const totalCompleted = progress.completedLessons.length;
  const overallProgress = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Progress</h1>
          <p className="text-xl text-gray-600">Track your journey through EV education</p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{overallProgress}%</div>
            <div className="text-gray-600">Overall Progress</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalCompleted}</div>
            <div className="text-gray-600">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-gradient-to-br from-purple-500 to-violet-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{progress.arModelsViewed}</div>
            <div className="text-gray-600">AR Models Viewed</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {achievements.filter(a => a.earned).length}
            </div>
            <div className="text-gray-600">Achievements</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Progress */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-md p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Progress</h2>
              <div className="space-y-6">
                {coursesProgress.map((course, index) => {
                  const progressPercent = Math.round((course.completedLessons / course.totalLessons) * 100);
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <span className="text-sm font-medium text-gray-600">
                          {course.completedLessons}/{course.totalLessons} lessons
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="bg-gray-200 rounded-full h-3">
                          <div 
                            className={`bg-gradient-to-r ${course.color} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{progressPercent}% Complete</span>
                        {progressPercent === 100 && (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Completed
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        achievement.earned 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Earned on {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};