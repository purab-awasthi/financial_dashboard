import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { TransactionTable, Transaction } from "@/components/dashboard/TransactionTable";
import BorderGlow from "@/components/ui/BorderGlow";

// Placeholder data
const transactionData: Transaction[] = [
  {
    id: "1",
    date: "Dec 15, 2024",
    amount: "$125.00",
    category: "Shopping",
    type: "expense",
  },
  {
    id: "2",
    date: "Dec 14, 2024",
    amount: "$3,500.00",
    category: "Salary",
    type: "income",
  },
  {
    id: "3",
    date: "Dec 13, 2024",
    amount: "$45.50",
    category: "Food",
    type: "expense",
  },
  {
    id: "4",
    date: "Dec 12, 2024",
    amount: "$120.00",
    category: "Transport",
    type: "expense",
  },
  {
    id: "5",
    date: "Dec 11, 2024",
    amount: "$85.00",
    category: "Utilities",
    type: "expense",
  },
  {
    id: "6",
    date: "Dec 10, 2024",
    amount: "$2,000.00",
    category: "Bonus",
    type: "income",
  },
  {
    id: "7",
    date: "Dec 09, 2024",
    amount: "$200.00",
    category: "Shopping",
    type: "expense",
  },
  {
    id: "8",
    date: "Dec 08, 2024",
    amount: "$1,500.00",
    category: "Freelance",
    type: "income",
  },
];

const CARD_BG = "#0f131f";

export default function Transactions() {
  const [transactions] = useState<Transaction[]>(transactionData);

  return (
    <div className="flex-1 p-8 pt-10 overflow-y-auto animate-fade-in w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
            Transactions
          </h1>
        </div>
        <p className="text-muted-foreground">
          View and manage all your transactions in one place.
        </p>
      </div>

      {/* Transactions Table Wrapped in BorderGlow */}
      <BorderGlow
        className="w-full"
        backgroundColor={CARD_BG}
        glowColor="199 89 48" // Cyan HSL
        colors={['#38bdf8', '#818cf8', '#0ea5e9']}
        borderRadius={16}
        animated={true}
      >
        {/* overflow-x-auto keeps table from breaking layout */}
        <div className="p-6 w-full overflow-x-auto">
          <TransactionTable transactions={transactions} />
        </div>
      </BorderGlow>
    </div>
  );
}