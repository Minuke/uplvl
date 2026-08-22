import type { XpState } from '@core/models/xp-state.model';

/**
 * Calcula cuánto XP total hace falta para ALCANZAR un nivel determinado.
 * Fórmula: 50 * nivel * (nivel + 1) -> números triangulares escalados.
 * El producto de dos enteros consecutivos SIEMPRE es par, así que esta
 * fórmula da un entero exacto en todos los niveles, sin decimales y sin
 * necesidad de redondear nada.
 * Ejemplos: nivel 1 -> 100 XP, nivel 2 -> 300 XP, nivel 5 -> 1500 XP, nivel 10 -> 5500 XP
 */
export function xpRequiredForLevel(level: number): number {
  const requiredXp = 50 * level * (level + 1);

  return requiredXp;
}

/**
 * Dado el XP TOTAL acumulado de un usuario, calcula:
 * - en qué nivel está
 * - cuánto XP lleva acumulado en total
 * - cuánto XP total hace falta para alcanzar el siguiente nivel
 */
export function calculateLevelStatus(xpTotal: number): XpState {
  let level = 1;
  let xpForNextLevel = xpRequiredForLevel(level + 1);

  // Mientras el XP total acumulado sea suficiente para el SIGUIENTE nivel,
  // seguimos subiendo el contador de nivel y recalculamos el nuevo objetivo.
  while (xpTotal >= xpForNextLevel) {
    level++;
    xpForNextLevel = xpRequiredForLevel(level + 1);
  }

  const xpState: XpState = {
    level,
    currentXp: xpTotal,
    xpForNextLevel,
  };

  return xpState;
}

/**
 * Calcula el porcentaje (0-100) de progreso DENTRO del nivel actual.
 * No mide el XP total acumulado, sino solo el tramo que va desde el
 * inicio de este nivel hasta el inicio del siguiente.
 */
export function calculateLevelProgressPercentage(xpState: XpState): number {
  const levelStartXp = xpState.level <= 1 ? 0 : xpRequiredForLevel(xpState.level);
  const xpIntoLevel = xpState.currentXp - levelStartXp;
  const levelSpan = xpState.xpForNextLevel - levelStartXp;

  const percentage = Math.round((xpIntoLevel / levelSpan) * 100);

  return percentage;
}
