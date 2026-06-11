export function calculateRoas(revenue: number, spend: number): number {
  if (spend === 0) return 0;
  return Math.round((revenue / spend) * 100) / 100;
}

export function calculateCloseRate(dealsClosed: number, leads: number): number {
  if (leads === 0) return 0;
  return Math.round((dealsClosed / leads) * 1000) / 10;
}

export function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}
