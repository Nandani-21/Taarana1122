import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logo from 'figma:asset/b351f80226d29dc81dd89730efa7bf2830c8c39f.png';
import { Progress } from './ui/progress';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const steps = [
      { progress: 20, text: 'Loading wellness data...' },
      { progress: 40, text: 'Preparing yoga database...' },
      { progress: 60, text: 'Loading Ayurvedic remedies...' },
      { progress: 80, text: 'Checking authentication...' },
      { progress: 100, text: 'Ready!' },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setLoadingText(steps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <motion.img
            src={logo}
            alt="Taarana Logo"
            className="h-40 w-auto mx-auto"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl text-emerald-900 mb-2">Taarana</h1>
          <p className="text-2xl text-gray-600 italic mb-1">आरोग्यं परमं भाग्यम्</p>
          <p className="text-sm text-emerald-600 mb-8">Health is the greatest blessing</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          <Progress value={progress} className="h-2 mb-4 bg-emerald-100" />
          <p className="text-sm text-emerald-700">{loadingText}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex items-center justify-center gap-6 text-xs text-gray-500"
        >
          <span>🧘‍♀️ Yoga</span>
          <span>🌿 Ayurveda</span>
          <span>🥗 Diet</span>
          <span>💆‍♀️ Wellness</span>
        </motion.div>
      </div>
    </div>
  );
}
