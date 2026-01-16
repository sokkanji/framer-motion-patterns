"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import List from "./components/List";
import { useEffect, useMemo, useState } from "react";
import measurementData from "@/data/measurementData.json";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";

type Diagnosis = {
  id: string;
  title: string;
  level: string;
  score: number;
  rank: string;
  script: string;
  thumbnail?: string;
  detailImages?: string[];
};

type ViewMode = "VIEW" | "EDIT";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<ViewMode>("VIEW");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(measurementData.slice(0, 3).map((item) => item.id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-0 sm:p-4 font-sans text-black">
      <motion.div
        layoutId="main-card"
        className="w-full max-w-[600px] bg-white h-screen sm:h-[calc(100vh-2rem)] flex flex-col shadow-xl sm:rounded-3xl overflow-hidden relative"
      >
        <div className="flex flex-col gap-4 p-6">
          <h1 className="text-2xl font-bold pt-4 pb-10">바디닷 피트니스 애니메이션 3가지</h1>

          <main className="flex-1 overflow-y-scroll pb-32">
            {isLoading ? (
              <Loading />
            ) : (
              <List
                key="list"
                sortedData={measurementData}
                selectedIds={selectedIds}
                mode={mode}
                toggleSelection={toggleSelection}
                setSelectedDiagnosis={setSelectedDiagnosis}
              />
            )}
          </main>

          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] p-6 bg-linear-to-t from-white via-white/95 to-transparent pt-12 z-20">
            <Link
              href={`/generating?ids=${selectedIds.join(",")}`}
              className="w-full h-16 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              처방 생성하기
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
