/**
 * Date du lundi de la premiere sceance de la legislature.
 */
export const legistature_begining: Record<number, number | undefined> = {
  14: new Date("2012-06-18T00:00:00Z").getTime(),
  15: new Date("2017-06-26T00:00:00Z").getTime(),
  16: new Date("2022-06-27T00:00:00Z").getTime(),
  17: new Date("2024-07-15T00:00:00Z").getTime(),
  18: undefined,
  0: undefined,
};

const MILLISECONDS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export function getWeekIndex(legislature: number, date: Date) {
  if (legistature_begining[legislature] === undefined) {
    throw new Error(
      `La legislature ${legislature} n'as pas de date de départ.`
    );
  }

  return Math.floor(
    (date.getTime() - legistature_begining[legislature]) / MILLISECONDS_PER_WEEK
  );
}

export function getMondayDate(legislature: number, weekIndex: number) {
  if (legistature_begining[legislature] === undefined) {
    throw new Error(
      `La legislature ${legislature} n'as pas de date de départ.`
    );
  }

  return new Date(
    legistature_begining[legislature] + weekIndex * MILLISECONDS_PER_WEEK
  );
}
