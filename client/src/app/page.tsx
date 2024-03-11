import Hero from "@/components/hero";
import LiveSubte from "@/components/live-subte";
import Subtes from "@/components/subtes";

export default function Home() {
  return (
    <main className="flex flex-col h-screen items-center py-10">
      <Hero />
      <LiveSubte />
      <Subtes />
    </main>
  );
}
