"use client";

import { useQuery } from "@tanstack/react-query";

import { alphaService } from "@/services/alpha-service";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: alphaService.getDashboardData,
    staleTime: 1000 * 60,
  });
}
