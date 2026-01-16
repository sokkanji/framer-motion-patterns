"use client";

import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import StepFirst from "./components/StepFirst";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StepSecond from "./components/StepSecond";
import StepThird from "./components/StepThird";

function GeneratingContent() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids") || "";

  const selectedIds = useMemo(() => idsParam.split(",").filter(Boolean), [idsParam]);

  const [progressStep, setProgressStep] = useState(0);
  const [selectedGoalCount, setSelectedGoalCount] = useState(0);

  useEffect(() => {
    if (!idsParam) return;

    // Step 1: Fly-in
    const step1 = setTimeout(() => setProgressStep(1), 100);

    // Goal selection sequence (1.0s ~ 2.0s)
    const goal1 = setTimeout(() => setSelectedGoalCount(1), 1000);
    const goal2 = setTimeout(() => setSelectedGoalCount(2), 1500);
    const goal3 = setTimeout(() => setSelectedGoalCount(3), 2000);

    // Step 2: Identification starts (2.8s) and completes (4.0s)
    const step2 = setTimeout(() => setProgressStep(2), 2800);

    // Step 3: Final generating starts (4.0s) and completes (5.2s)
    const step3 = setTimeout(() => setProgressStep(3), 4000);

    // NEW Step 4: Show final checkmark (5.2s)
    const step4 = setTimeout(() => setProgressStep(4), 5200);

    // Finish and transition (6.5s) - give user time to see the final check
    const finish = setTimeout(() => {
      router.push(`/complete?ids=${idsParam}`);
    }, 6500);

    return () => {
      [step1, goal1, goal2, goal3, step2, step3, step4, finish].forEach(clearTimeout);
    };
  }, [router, idsParam]);

  return (
    <motion.div
      layoutId="main-card"
      className="w-full max-w-[600px] bg-white h-screen sm:h-[calc(100vh-2rem)] flex flex-col shadow-xl sm:rounded-3xl overflow-hidden relative p-8 text-center"
    >
      <div className="relative z-10 flex flex-col items-center w-full mt-32">
        <motion.div
          layoutId="icon-wrapper"
          className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg relative mb-10"
        >
          <Brain className="w-16 h-16 text-blue-600 animate-pulse" />
          <div className="absolute inset-0 -m-3 border-4 border-blue-100 rounded-full animate-[spin_3s_linear_infinite]" />
          <div className="absolute inset-0 -m-3 border-t-4 border-blue-500 rounded-full animate-[spin_2s_linear_infinite]" />
        </motion.div>

        <motion.h2 layoutId="status-title" className="text-2xl font-bold text-gray-900 mb-3">
          맞춤 운동 처방 생성 중
        </motion.h2>
        <motion.p layoutId="status-desc" className="text-gray-500 text-lg mb-12">
          고객님의 체형 데이터를 분석하고 있습니다...
        </motion.p>

        <div className="w-full max-w-sm space-y-8 text-left">
          <StepFirst selectedGoalCount={selectedGoalCount} selectedIds={selectedIds} />

          <StepSecond progressStep={progressStep} />

          <StepThird progressStep={progressStep} />
        </div>
      </div>
    </motion.div>
  );
}

export default function GeneratingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-0 sm:p-4 font-sans text-black">
      <Suspense fallback={null}>
        <GeneratingContent />
      </Suspense>
    </div>
  );
}
