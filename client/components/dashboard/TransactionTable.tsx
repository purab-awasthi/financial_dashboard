import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/UserContext"; 

export type Transaction = {
  id: string;
  date: string;
  amount: string;
  category: string;
  type: "income" | "expense";
};

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const { isAdmin } = useUser(); 
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeRowMenu, setActiveRowMenu] = useState<string | null>(null);
  
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      const target = event.target as HTMLElement;
      if (!target.closest('.row-action-menu')) {
        setActiveRowMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.amount.includes(searchQuery) ||
      tx.date.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || tx.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col w-full h-full animate-fade-in pb-32">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        
        <div className="relative w-full sm:max-w-xs group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-secondary/30 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          
          <div className="relative w-full sm:w-auto" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full sm:w-auto flex items-center justify-between gap-3 bg-secondary/30 border border-white/5 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              <span className="capitalize text-muted-foreground">
                Type: <span className="text-foreground ml-1">{filterType}</span>
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isFilterOpen && "rotate-180")} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-full sm:w-40 bg-[#141824] border border-white/5 rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden py-1">
                {["all", "income", "expense"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type as "all" | "income" | "expense");
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm capitalize transition-colors",
                      filterType === type 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAdmin && (
            <button className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]">
              <Plus className="w-4 h-4" />
              New Transaction
            </button>
          )}

        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-white/5 bg-secondary/10">
        <table className="w-full min-w-[700px] text-left text-sm whitespace-nowrap">
          <thead className="bg-white/[0.02] border-b border-white/5 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Transaction</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {isAdmin && <th className="px-6 py-4 font-medium text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-lg flex items-center justify-center",
                        tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary"
                      )}>
                        {tx.type === "income" ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                      </div>
                      <span className="font-medium text-foreground">{tx.category}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-muted-foreground">{tx.date}</td>
                  
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      tx.type === "income" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    )}>
                      {tx.type === "income" ? "Completed" : "Processed"}
                    </span>
                  </td>
                  
                  <td className={cn(
                    "px-6 py-4 text-right font-bold tracking-tight",
                    tx.type === "income" ? "text-emerald-400" : "text-foreground"
                  )}>
                    {tx.type === "income" ? "+" : "-"}{tx.amount}
                  </td>
                  
                  {isAdmin && (
                    <td className="px-6 py-4 text-center relative row-action-menu">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveRowMenu(activeRowMenu === tx.id ? null : tx.id);
                        }}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          activeRowMenu === tx.id 
                            ? "bg-rose-500/10 text-rose-400 opacity-100" 
                            : "text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100"
                        )}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {activeRowMenu === tx.id && (
                        <div className="absolute right-8 top-10 mt-1 w-36 bg-[#141824] border border-white/10 rounded-xl shadow-2xl shadow-black/80 z-[60] overflow-hidden py-1 animate-fade-in">
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-all">
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-white/[0.04] hover:text-foreground transition-all">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <div className="h-px w-full bg-white/[0.05] my-1"></div>
                          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition-all font-medium">
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-12 text-center text-muted-foreground">
                  No transactions found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}