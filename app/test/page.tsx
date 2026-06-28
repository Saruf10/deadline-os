import { db } from "@/lib/firebase";

export default function TestPage() {
  console.log(db);

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        Firebase Connected ✅
      </h1>
    </div>
  );
}