"use client";
import React from "react";
import StatCard from "../ui/StatCard";

interface Props {
  title: string;
  value: number | string;
  subtle?: string;
}

export default function StatsCard({ title, value, subtle }: Props) {
  return <StatCard title={title} value={value} note={subtle} />;
}
