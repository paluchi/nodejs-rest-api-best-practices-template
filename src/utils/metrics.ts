export const get_metric_by_closest_date = (metrics: any[], date: string) => {
  if (!metrics || !metrics.length)
    return;
    
  const goal = new Date(date).valueOf();
  const found = metrics.reduce((prev, curr) => Math.abs(new Date(curr.metric_date).valueOf() - goal) < Math.abs(new Date(prev.metric_date).valueOf() - goal) ? curr : prev);
  return found;
}