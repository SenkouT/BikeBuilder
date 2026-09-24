import type { Component, CompatibilityResult } from '@/types/components';

export type Category = 'cadre' | 'fourche' | 'roues' | 'pneus' | 'transmission' | 'freinage' | 'cockpit' | 'selle' | 'pedales' | 'accessoires';

export type BikeComponent = Component;

export type CompatibilityStatus = 'compatible' | 'warning' | 'incompatible';

export type CompatibilityResult = {
  status: CompatibilityStatus;
  message: string;
  related?: string[];
};
