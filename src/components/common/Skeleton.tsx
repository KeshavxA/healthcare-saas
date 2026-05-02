import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = "rectangular" }) => {
  const baseClasses = "animate-pulse bg-slate-200 dark:bg-slate-800";
  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-2xl",
  };

  return <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />;
};

export default Skeleton;
