import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-full space-y-6"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent" />
        <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-gray-900">체형 데이터 분석 중</h3>
        <p className="text-gray-500">
          24개의 관절 포인트를
          <br />
          정밀 분석하고 있습니다...
        </p>
      </div>
    </motion.div>
  );
}
