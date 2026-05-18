import { useState, useEffect } from "react";
import { Copy, RefreshCw, Settings2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { convertValue, CATEGORIES, UnitCategory } from "@/lib/conversions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ConverterProps {
  category: UnitCategory;
}

export default function Converter({ category }: ConverterProps) {
  const units = CATEGORIES[category];
  const [unitA, setUnitA] = useState(units[0].id);
  const [unitB, setUnitB] = useState(units[1].id);
  const [valueA, setValueA] = useState<string>("");
  const [valueB, setValueB] = useState<string>("");
  const [activeInput, setActiveInput] = useState<"A" | "B" | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (activeInput === "A" && valueA !== "") {
      const num = parseFloat(valueA);
      if (!isNaN(num)) {
        const result = convertValue(num, unitA, unitB, category);
        setValueB(Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString());
      } else {
        setValueB("");
      }
    } else if (activeInput === "A" && valueA === "") {
      setValueB("");
    }
  }, [valueA, unitA, unitB, category, activeInput]);

  useEffect(() => {
    if (activeInput === "B" && valueB !== "") {
      const num = parseFloat(valueB);
      if (!isNaN(num)) {
        const result = convertValue(num, unitB, unitA, category);
        setValueA(Number.isInteger(result) ? result.toString() : parseFloat(result.toFixed(6)).toString());
      } else {
        setValueA("");
      }
    } else if (activeInput === "B" && valueB === "") {
      setValueA("");
    }
  }, [valueB, unitA, unitB, category, activeInput]);

  const handleSwap = () => {
    setUnitA(unitB);
    setUnitB(unitA);
    setActiveInput("A");
  };

  const handleClear = () => {
    setValueA("");
    setValueB("");
    setActiveInput(null);
  };

  const handleCopy = (value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast({
      title: "Copiado para a área de transferência",
      description: `${value} foi copiado com sucesso.`,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center relative">
        <div className="w-full flex flex-col space-y-2 relative">
          <Label htmlFor="inputA" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider ml-1">De</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="inputA"
                type="number"
                placeholder="0"
                className="text-lg font-mono pl-4 pr-10 py-6 bg-card border-border focus-visible:ring-primary/50 shadow-sm transition-all rounded-xl"
                value={valueA}
                onChange={(e) => {
                  setActiveInput("A");
                  setValueA(e.target.value);
                }}
                data-testid={`input-${category}-from`}
              />
              <AnimatePresence>
                {valueA && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary rounded-lg"
                      onClick={() => handleCopy(valueA)}
                      data-testid={`btn-copy-${category}-from`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Select value={unitA} onValueChange={setUnitA}>
              <SelectTrigger className="w-[140px] py-6 rounded-xl bg-card border-border font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u.id} value={u.id} data-testid={`select-${category}-from-${u.id}`}>
                    <span className="flex items-center gap-2">
                      <span className="w-6 text-muted-foreground font-mono text-xs">{u.symbol}</span>
                      {u.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-6 shrink-0 z-10 flex flex-row md:flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 shadow-sm border-border bg-background hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-all active:scale-95"
            onClick={handleSwap}
            data-testid={`btn-swap-${category}`}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <div className="w-full flex flex-col space-y-2 relative">
          <Label htmlFor="inputB" className="text-muted-foreground text-xs font-semibold uppercase tracking-wider ml-1">Para</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="inputB"
                type="number"
                placeholder="0"
                className="text-lg font-mono pl-4 pr-10 py-6 bg-card border-border focus-visible:ring-primary/50 shadow-sm transition-all rounded-xl"
                value={valueB}
                onChange={(e) => {
                  setActiveInput("B");
                  setValueB(e.target.value);
                }}
                data-testid={`input-${category}-to`}
              />
              <AnimatePresence>
                {valueB && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary rounded-lg"
                      onClick={() => handleCopy(valueB)}
                      data-testid={`btn-copy-${category}-to`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Select value={unitB} onValueChange={setUnitB}>
              <SelectTrigger className="w-[140px] py-6 rounded-xl bg-card border-border font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(u => (
                  <SelectItem key={u.id} value={u.id} data-testid={`select-${category}-to-${u.id}`}>
                    <span className="flex items-center gap-2">
                      <span className="w-6 text-muted-foreground font-mono text-xs">{u.symbol}</span>
                      {u.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          variant="ghost"
          onClick={handleClear}
          disabled={!valueA && !valueB}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg px-4"
          data-testid={`btn-clear-${category}`}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Limpar
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!valueA && !valueB && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="py-12 flex flex-col items-center justify-center text-center space-y-3 rounded-2xl bg-muted/30 border border-dashed border-border"
          >
            <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center text-accent-foreground mb-2">
              <Settings2 className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-foreground">Aguardando valor</p>
            <p className="text-xs text-muted-foreground max-w-[250px]">
              Digite um valor acima para ver a conversão em tempo real.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
