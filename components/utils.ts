export const compareDate = (a?: Date, b?: Date) =>
  (a?.getTime() ?? 0) > (b?.getTime() ?? 0) ? 1 : -1;
