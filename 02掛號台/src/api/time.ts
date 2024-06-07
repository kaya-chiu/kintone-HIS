export const fetchCurrentDate = async () => {
  const res = await fetch(location.href, { method: 'HEAD' })
  const systemDateString = res.headers.get('date')!
  const systemDate = new Date(systemDateString)
  const today = new Date(systemDate.setHours(0, 0, 0, 0)).toISOString()

  return today
}