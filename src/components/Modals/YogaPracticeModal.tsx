import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';
import type { YogaPose } from '../../types';
import type { Language } from '../../App';
import { motion } from 'motion/react';

interface YogaPracticeModalProps {
  open: boolean;
  onClose: () => void;
  pose: YogaPose;
  language: Language;
}

export function YogaPracticeModal({ open, onClose, pose, language }: YogaPracticeModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [timer, setTimer] = useState(0);
  const steps = language === 'en' ? pose.steps : pose.stepsHi;

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setTimer(0);
    setIsPlaying(false);
  };

  const handleComplete = () => {
    setIsPlaying(false);
    // Could save progress here
    setTimeout(() => {
      onClose();
      handleReset();
    }, 1500);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
              {pose.emoji}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl text-emerald-900">
                {language === 'en' ? pose.name : pose.nameHi}
              </DialogTitle>
              {pose.condition && (
                <DialogDescription>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 mt-1">
                    {language === 'en' ? pose.condition : pose.conditionHi}
                  </Badge>
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-emerald-700">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-emerald-600">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
            </div>
            <Progress value={progress} className="bg-emerald-100" />
          </div>

          {/* Current Step */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                {currentStep + 1}
              </div>
              <div className="flex-1">
                <p className="text-lg text-emerald-900 leading-relaxed">
                  {steps[currentStep]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Animation Visualization */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-8 text-center">
            <motion.div
              animate={{
                scale: isPlaying ? [1, 1.05, 1] : 1,
                rotate: isPlaying ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="text-6xl mb-4"
            >
              {pose.emoji}
            </motion.div>
            <p className="text-sm text-teal-700">
              {isPlaying ? 'Practice in progress...' : 'Start practicing'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              className="border-emerald-300 hover:bg-emerald-50"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="border-emerald-300 hover:bg-emerald-50"
            >
              Previous
            </Button>

            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  {currentStep === 0 && timer === 0 ? 'Start' : 'Resume'}
                </>
              )}
            </Button>

            <Button
              onClick={handleNext}
              className="bg-teal-500 hover:bg-teal-600"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Complete
                </>
              ) : (
                'Next'
              )}
            </Button>
          </div>

          {/* All Steps Overview */}
          <div className="border-t border-emerald-100 pt-4">
            <h4 className="text-sm text-emerald-800 mb-3">All Steps:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-2 rounded-lg text-sm ${
                    index === currentStep
                      ? 'bg-emerald-100 text-emerald-900'
                      : index < currentStep
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs">
                    {index < currentStep ? '✓' : index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
