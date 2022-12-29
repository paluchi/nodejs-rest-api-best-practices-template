export const parseNumber = (v: string) => {
  if (v === undefined || v === null)
    return null;

  const v_float = parseFloat(v);
  if (isNaN(v_float))
    return null;
  else
    return v_float;
}