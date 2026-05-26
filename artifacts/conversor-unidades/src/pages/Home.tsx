import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Ruler, Scale, Gauge, Droplets, Coins } from "lucide-react";
import Converter from "@/components/Converter";
import { UnitCategory } from "@/lib/conversions";

const tabs = [
  { id: "temperature" as UnitCategory, label: "Temperatura", icon: Thermometer },
  { id: "length" as UnitCategory, label: "Comprimento", icon: Ruler },
  { id: "weight" as UnitCategory, label: "Peso", icon: Scale },
  { id: "speed" as UnitCategory, label: "Velocidade", icon: Gauge },
  { id: "volume" as UnitCategory, label: "Volume", icon: Droplets },
  { id: "currency" as UnitCategory, label: "Moeda", icon: Coins },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<UnitCategory>("temperature");

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <header className="w-full py-8 px-6 flex flex-col items-center text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-4"
        >
          <SettingsIcon className="h-6 w-6" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold tracking-tight text-foreground"
        >
          Conversor
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm text-muted-foreground mt-2 max-w-sm"
        >
          Uma ferramenta simples e precisa para converter unidades no seu dia a dia.
        </motion.p>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 pb-20 flex flex-col relative z-10">
        <div className="w-full mb-8 relative">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 p-1 relative z-10 -mx-4 px-4 md:mx-0 md:px-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0
                    ${isActive ? "text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}
                  `}
                  data-testid={`tab-${tab.id}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full bg-card border border-border shadow-sm rounded-3xl p-6 md:p-8"
            >
              <div className="mb-8 flex items-center gap-3 text-primary">
                {(() => {
                  const activeItem = tabs.find(t => t.id === activeTab);
                  const ActiveIcon = activeItem?.icon || Thermometer;
                  return (
                    <>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ActiveIcon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground tracking-tight">
                        {activeItem?.label}
                      </h2>
                    </>
                  );
                })()}
              </div>

              <Converter category={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] rounded-full bg-accent/30 blur-[100px]" />
      </div>
    </div>
  );
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
