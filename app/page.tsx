import Image from "next/image";
import { Airdrop } from "./comps/airdrop";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Airdrop />
    </main>
  );
}
