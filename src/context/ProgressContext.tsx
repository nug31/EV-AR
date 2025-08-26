import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProgressState {
  completedLessons: string[];
  arModelsViewed: number;
  currentStreak: number;
  totalTimeSpent: number;
}

interface ProgressContextType {
  progress: ProgressState;
  completeLesson: (lessonId: string) => void;
  viewARModel: () => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const initialProgress: ProgressState = {
  completedLessons: [],
  arModelsViewed: 2,
  currentStreak: 5,
  totalTimeSpent: 180 // minutes
};

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(initialProgress);

  const completeLesson = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId) 
        ? prev.completedLessons 
        : [...prev.completedLessons, lessonId],
      currentStreak: prev.currentStreak + 1,
      totalTimeSpent: prev.totalTimeSpent + 30 // Add 30 minutes per lesson
    }));
  };

  const viewARModel = () => {
    setProgress(prev => ({
      ...prev,
      arModelsViewed: prev.arModelsViewed + 1
    }));
  };

  const resetProgress = () => {
    setProgress(initialProgress);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      completeLesson,
      viewARModel,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};