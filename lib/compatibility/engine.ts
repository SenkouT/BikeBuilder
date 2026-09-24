import type { Component, CompatibilityResult } from '@/types/components';

export function checkCompatibility(selected: Partial<Record<string, Component>>): CompatibilityResult[] {
  const results: CompatibilityResult[] = [];
  const frame = selected.cadre;
  const fork = selected.fourche;
  const wheels = selected.roues;
  const tyre = selected.pneus;
  const crank = selected.transmission;

  if (frame && fork && frame.specs.wheelSize !== fork.specs.wheelSize) {
    results.push({
      status: 'incompatible',
      message: `La fourche est en ${fork.specs.wheelSize} alors que le cadre accepte du ${frame.specs.wheelSize}.`,
      related: ['cadre', 'fourche'],
    });
  }

  if (frame && wheels && frame.specs.axle !== wheels.specs.axle) {
    results.push({
      status: 'incompatible',
      message: `Le cadre utilise un axe ${frame.specs.axle} alors que les roues sont ${wheels.specs.axle}.`,
      related: ['cadre', 'roues'],
    });
  }

  if (wheels && tyre && wheels.specs.wheelSize !== tyre.specs.wheelSize) {
    results.push({
      status: 'incompatible',
      message: `La roue ${wheels.specs.wheelSize} n'est pas compatible avec le pneu ${tyre.specs.wheelSize}.`,
      related: ['roues', 'pneus'],
    });
  }

  if (frame && crank && crank.specs.bottomBracket && frame.specs.bottomBracket !== crank.specs.bottomBracket) {
    results.push({
      status: 'incompatible',
      message: `Le cadre utilise un boîtier ${frame.specs.bottomBracket} alors que la transmission sélectionnée demande ${crank.specs.bottomBracket}.`,
      related: ['cadre', 'transmission'],
    });
  }

  if (frame && selected.selle && frame.specs.seatpost !== selected.selle.specs.rail) {
    results.push({
      status: 'warning',
      message: `La selle peut nécessiter un réglage spécifique pour la tige du cadre.`,
      related: ['cadre', 'selle'],
    });
  }

  if (results.length === 0) {
    results.push({
      status: 'compatible',
      message: 'Aucune incompatibilité détectée sur la configuration actuelle.',
    });
  }

  return results;
}
