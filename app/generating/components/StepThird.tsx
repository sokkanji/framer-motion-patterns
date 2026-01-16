import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function StepThird({ progressStep }: { progressStep: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: progressStep >= 3 ? 1 : 0.1,
        y: progressStep >= 3 ? 0 : 10,
      }}
      className="flex items-center gap-3 pt-2"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
          progressStep >= 4 ? "bg-blue-600 border-blue-600" : "border-gray-200"
        }`}
      >
        {progressStep >= 4 ? (
          <Check className="w-3.5 h-3.5 text-white" />
        ) : progressStep === 3 ? (
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
        ) : null}
      </div>
      <span className={`font-bold text-xl transition-colors ${progressStep >= 3 ? "text-gray-900" : "text-gray-300"}`}>
        {progressStep >= 4 ? "맞춤 운동 처방 완료" : "맞춤 운동 처방 생성 중..."}
      </span>
    </motion.div>
  );
}
