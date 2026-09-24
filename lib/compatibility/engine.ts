import type { Component, CompatibilityResult } from '@/types/components';

export function checkCompatibility(selected: Partial<Record<string, Component>>): CompatibilityResult[] {
  const results: CompatibilityResult[] = [];
  const frame = selected.cadre;
  const fork = selected.fourche;
  const wheels = selected.roues;
  const tyre = selected.pneus;
  const transmission = selected.transmission;

  if (frame && fork && frame.specs.wheelSize !== fork.specs.wheelSize) {
    results.push({ status: 'incompatible', message: `La fourche est en ${fork.specs.wheelSize} alors que le cadre accepte du ${frame.specs.wheelSize}.`, related: ['cadre', 'fourche'] });
  }
  if (frame && wheels && frame.specs.axle !== wheels.specs.axle) {
    results.push({ status: 'incompatible', message: `Le cadre utilise un axe ${frame.specs.axle} alors que les roues sont ${wheels.specs.axle}.`, related: ['cadre', 'roues'] });
  }
  if (wheels && tyre && wheels.specs.wheelSize !== tyre.specs.wheelSize) {
    results.push({ status: 'incompatible', message: `La roue ${wheels.specs.wheelSize} n'est pas compatible avec le pneu ${tyre.specs.wheelSize}.`, related: ['roues', 'pneus'] });
  }
  if (frame && transmission && frame.specs.bottomBracket && transmission.specs.bottomBracket && frame.specs.bottomBracket !== transmission.specs.bottomBracket) {
    results.push({ status: 'incompatible', message: `Le cadre utilise un boîtier ${frame.specs.bottomBracket}, tandis que le pédalier demande ${transmission.specs.bottomBracket}.`, related: ['cadre', 'transmission'] });
  }
  if (results.length === 0) {
    results.push({ status: 'compatible', message: 'Aucune incompatibilité détectée sur la configuration actuelle.' });
  }
  return results;
}
