import { motion } from "framer-motion";
import { User, Check, AlertCircle } from "lucide-react";

interface ListProps {
  sortedData: any;
  selectedIds: string[];
  mode: string;
  toggleSelection: (id: string) => void;
  setSelectedDiagnosis: (item: any) => void;
}

export default function List({ sortedData, selectedIds, mode, toggleSelection, setSelectedDiagnosis }: ListProps) {
  return (
    <motion.div
      key="list"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="space-y-4"
    >
      {sortedData.map((item: any) => {
        const isSelected = selectedIds.includes(item.id);
        return (
          <motion.div
            layout
            layoutId={`item-${item.id}`}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
            }}
            id={`card-${item.id}`}
            key={item.id}
            onClick={() => {
              if (mode === "EDIT") toggleSelection(item.id);
              else setSelectedDiagnosis(item);
            }}
            className={`group relative transition-all duration-500 rounded-2xl p-4 border flex items-center gap-4
${isSelected ? "bg-white border-blue-500 shadow-md opacity-100" : "bg-white border-gray-100 opacity-60 grayscale"}
${mode === "EDIT" ? "cursor-pointer" : "cursor-pointer hover:border-gray-300"}`}
          >
            <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight truncate pr-2">{item.title}</h3>
                {mode === "EDIT" ? (
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                      isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                ) : (
                  <span className="text-blue-600 font-extrabold text-sm shrink-0">{item.rank}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.level === "caution" ? (
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> 주의
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded">정상</span>
                )}
                <p className="text-sm text-gray-500 truncate flex-1">{item.script}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
