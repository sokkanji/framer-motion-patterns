import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCircle2, User } from "lucide-react";
import measurementData from "@/data/measurementData.json";

export default function StepFirst({
  selectedGoalCount,
  selectedIds,
}: {
  selectedGoalCount: number;
  selectedIds: string[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
            selectedGoalCount >= 3 ? "bg-blue-600 border-blue-600" : "border-blue-600"
          }`}
        >
          {selectedGoalCount >= 3 ? (
            <Check className="w-3.5 h-3.5 text-white" />
          ) : (
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          )}
        </div>
        <span className="font-bold text-xl text-gray-900">교정 목표 설정</span>
      </div>

      <div className="pl-9 flex flex-col gap-3">
        {selectedIds.map((id, idx) => {
          const item = measurementData.find((d) => d.id === id);
          const isSelected = selectedGoalCount > idx;
          const isSettled = selectedGoalCount > 0;

          return (
            <motion.div
              key={id}
              layoutId={`item-${id}`}
              animate={{
                backgroundColor: isSelected ? "rgba(239, 246, 255, 1)" : "rgba(249, 250, 251, 1)",
                borderColor: isSelected ? "rgba(191, 219, 254, 1)" : "rgba(243, 244, 246, 1)",
                opacity: !isSettled || isSelected ? 1 : 0.5,
              }}
              className="relative border rounded-2xl p-4 flex items-center gap-4 shadow-sm"
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <span
                className={`font-bold transition-colors duration-500 ${isSelected ? "text-blue-700" : "text-gray-500"}`}
              >
                {item?.title}
              </span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ml-auto">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
