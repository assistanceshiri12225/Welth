"use client";

export const dynamic = "force-dynamic";  // ← add this line

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transaction";

export default function AddTransactionPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    async function fetchAccounts() {
      const data = await getUserAccounts();
      setAccounts(data);
    }
    fetchAccounts();
  }, []);

  useEffect(() => {
    async function fetchTransaction() {
      if (editId) {
        const transaction = await getTransaction(editId);
        setInitialData(transaction);
      }
    }
    fetchTransaction();
  }, [editId]);

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}
