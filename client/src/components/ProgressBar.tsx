import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { animations } from '@/lib/gsap';

interface ProgressBarProps {
  progress: number;
  className?: string;
  animate?: boolean;
  showPercentage?: boolean;
}

export function ProgressBar({ 
  progress, 
  className, 
  animate = false,
  showPercentage = false 
}: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const prevProgress = useRef(0);

  useEffect(() => {
    if (animate && progressRef.current && progress !== prevProgress.current) {
      animations.progressBar(progressRef.current, progress);
      prevProgress.current = progress;
    }
  }, [progress, animate]);

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          ref={progressRef}
          className="progress-bar h-2 rounded-full transition-all duration-300"
          style={animate ? undefined : { width: `${clampedProgress}%` }}
          data-testid="progress-bar"
        />
      </div>
      {showPercentage && (
        <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
}
