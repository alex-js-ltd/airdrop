"use client";

import useSWR from "swr";
import Link from "next/link";

const walletAddress = "3SxXqLiTSwLsJvttqMEzgZrJryw5f23AabQB89TUcPAE"; //👈 Replace with your wallet address

async function fetcher(): Promise<{ message: string }> {
  const res = await fetch(`/api/airdrop?query=${walletAddress}`);

  if (!res.ok) {
    throw new Error("Failed to fetch airdrop");
  }

  const data = await res.json();

  return { ...data };
}

export function Airdrop() {
  const { data, error } = useSWR("/api/airdrop", fetcher, {
    refreshInterval: 4200000, // Poll every hour and 10 minutes
  });

  console.log(data);

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Link href={data.message} target="_blank" rel="noopener noreferrer">
      transaction
    </Link>
  );
}
