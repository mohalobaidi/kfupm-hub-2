export default defineEventHandler(async event => {
  const cityHeader = getHeader(event, 'x-vercel-ip-city')
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = getHeader(event, 'x-forwarded-for')
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'
  const storage = useStorage('data')
  let pageVisits = (await storage.getItem('pageVisits')) as number
  const updatedPageVisits = pageVisits + 1
  await storage.setItem('pageVisits', updatedPageVisits)

  return {
    city,
    ip,
    pageVisits: updatedPageVisits,
  }
})