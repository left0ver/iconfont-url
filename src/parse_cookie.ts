export function parseCookie(cookie: string): Record<string, string> {
  const cookieArr = cookie.split('; ')
  return cookieArr.reduce<Record<string, string>>((pre, currentValue) => {
    const [key, value] = currentValue.split('=')
    return { ...pre, [key]: value }
  }, {})
}
