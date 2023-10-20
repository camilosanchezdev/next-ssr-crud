"use client";

import { Skeleton as Mask } from "primereact/skeleton";

type SkeletonProps = {
  className?: string;
  width?: string;
  height?: string;
};
export default function Skeleton({ className, width, height }: SkeletonProps) {
  return <Mask className={className} width={width} height={height}></Mask>;
}
