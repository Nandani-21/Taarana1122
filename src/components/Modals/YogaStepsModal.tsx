import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Clock, AlertCircle, Target } from 'lucide-react';
import type { YogaPose } from '../../types';
import type { Language } from '../../App';

interface YogaStepsModalProps {
  open: boolean;
  onClose: () => void;
  pose: YogaPose;
  language: Language;
}

export function YogaStepsModal({ open, onClose, pose, language }: YogaStepsModalProps) {
  const steps = language === 'en' ? pose.steps : pose.stepsHi;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
              {pose.emoji}
            </div>
            <div>
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
          {/* Benefits */}
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Target className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-emerald-900 mb-1">Benefits</h4>
                <p className="text-sm text-emerald-700">
                  {language === 'en' ? pose.benefits : pose.benefitsHi}
                </p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-teal-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-teal-900 mb-1">Duration</h4>
                <p className="text-sm text-teal-700">{pose.duration}</p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h4 className="text-emerald-900 mb-3">Step-by-Step Instructions:</h4>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="flex-1 text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Precautions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-700 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-amber-900 mb-1">Precautions</h4>
                <p className="text-sm text-amber-700">
                  {language === 'en' ? pose.precautions : pose.precautionsHi}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
