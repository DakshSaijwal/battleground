import GameCanvas from "@/components/GameCanvas";

export default function Home() {
  return (
    <main 
      className="w-full h-screen overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: "#000"
      }}
    >
      <GameCanvas />
    </main>
  );
}
