import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function StepSecond({ progressStep }: { progressStep: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: progressStep >= 2 ? 1 : 0.3,
        y: progressStep >= 2 ? 0 : 10,
      }}
      className="flex items-center gap-3"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
          progressStep >= 3 ? "bg-blue-600 border-blue-600" : "border-blue-600"
        }`}
      >
        {progressStep >= 3 ? (
          <Check className="w-3.5 h-3.5 text-white" />
        ) : progressStep === 2 ? (
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        ) : null}
      </div>
      <span className={`font-bold text-xl transition-colors ${progressStep >= 2 ? "text-gray-900" : "text-gray-300"}`}>
        취약 근육군 식별
      </span>
    </motion.div>
  );
}
