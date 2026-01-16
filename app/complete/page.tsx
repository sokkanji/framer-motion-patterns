"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import exerciseData from "@/data/exerciseData.json";
import remedyData from "@/data/remedyData.json";

function CompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedIds = searchParams.get("ids")?.split(",") || [];

  const selectedExercises = useMemo(() => {
    const allExerciseKeys = new Set<string>();
    const diagnosisMap = new Map<string, string>();
    selectedIds.forEach((id) => {
      const remedy = (remedyData as any)[id];
      if (remedy && remedy.exercises) {
        remedy.exercises.forEach((key: string) => {
          // exerciseData에 존재하는 운동만 추가
          if ((exerciseData as any)[key]) {
            allExerciseKeys.add(key);
            if (!diagnosisMap.has(key)) diagnosisMap.set(key, remedy.title);
          }
        });
      }
    });
    const combinedKeys = [...allExerciseKeys].slice(0, 9);
    return combinedKeys.map((key) => {
      const info = (exerciseData as any)[key];
      const type = info.exerciseType === "Stretching" ? "스트레칭" : "근력 운동";
      return {
        diagnosis: diagnosisMap.get(key) || "맞춤 운동",
        name: info.name.ko,
        key: key,
        type: type,
        duration: type === "스트레칭" ? "30초 / 3세트" : "15회 / 3세트",
      };
    });
  }, [selectedIds]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      layoutId="main-card"
      className="w-full max-w-[600px] bg-white h-screen sm:h-[calc(100vh-2rem)] flex flex-col shadow-xl sm:rounded-3xl overflow-hidden relative p-8"
    >
      <div className="flex flex-col items-center w-full mt-8 mb-8 text-center">
        <motion.div
          layoutId="icon-wrapper"
          className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-lg mb-6 text-blue-600"
        >
          <CheckCircle2 className="w-16 h-16" />
        </motion.div>

        <motion.h2 layoutId="status-title" className="text-2xl font-bold text-gray-900 mb-3">
          처방이 완료되었습니다
        </motion.h2>
        <motion.p layoutId="status-desc" className="text-gray-500 text-lg">
          고객님을 스트레칭 존으로 안내해 주세요.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 overflow-x-hidden overflow-y-auto space-y-4 mb-8"
      >
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider text-left">선택된 운동 루틴</p>
        <div className="grid gap-3">
          {selectedExercises.map((ex) => (
            <motion.div
              key={ex.key}
              variants={itemVariants}
              className="flex p-4 bg-white rounded-[32px] border border-gray-100 shadow-sm items-stretch text-left"
            >
              <div className="w-32 h-32 bg-gray-50 rounded-[24px] flex items-center justify-center mr-4 shrink-0 overflow-hidden">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span
                  className={`w-fit text-[10px] font-bold px-2 py-1 rounded-md mb-1 ${
                    ex.type === "스트레칭" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                  }`}
                >
                  {ex.type}
                </span>
                <h4 className="text-lg font-bold text-gray-900 truncate">{ex.name}</h4>
                <p className="text-xs text-gray-400 truncate">교정: {ex.diagnosis}</p>
                <p className="text-sm font-bold text-blue-600 mt-1">{ex.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 0.5,
        }}
        onClick={() => router.push("/")}
        className="w-full h-16 bg-black text-white rounded-2xl font-bold text-xl active:scale-95 transition-transform shrink-0"
      >
        확인
      </motion.button>
    </motion.div>
  );
}

export default function CompletePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-0 sm:p-4 font-sans text-black">
      <Suspense fallback={null}>
        <CompleteContent />
      </Suspense>
    </div>
  );
}
