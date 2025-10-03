"use client";

import EditorDemo from "@/components/EditorDemo";

export default function Home() {
  return (
    <main className="min-h-screen flex items-start justify-center p-8 sm:p-16">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Floating toolbar editor</h1>
        <p className="text-sm text-foreground/70 mb-6">Select some text to see the floating toolbar.</p>
        <div className="rounded-lg border border-black/10 bg-black text-black shadow">
          <EditorDemo />
        </div>
      </div>
    </main>
  );
}
