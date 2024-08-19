import { NextResponse } from "next/server";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

import { invariantResponse } from "@/app/utils/misc";

const SOLANA_CONNECTION = new Connection(clusterApiUrl("devnet"));
const AIRDROP_AMOUNT = 5 * LAMPORTS_PER_SOL; // 1 SOL

export async function POST(request: Request) {
  const { walletAddress } = await request.json();

  const signature = await SOLANA_CONNECTION.requestAirdrop(
    new PublicKey(walletAddress),
    AIRDROP_AMOUNT
  );
  // 2 - Fetch the latest blockhash
  const { blockhash, lastValidBlockHeight } =
    await SOLANA_CONNECTION.getLatestBlockhash();
  // 3 - Confirm transaction success
  const confirm = await SOLANA_CONNECTION.confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight,
      signature,
    },
    "finalized"
  );

  const tx = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

  invariantResponse(confirm.value.err === null, "air drop failed", {
    status: 500,
  });

  return NextResponse.json({ message: tx });
}
