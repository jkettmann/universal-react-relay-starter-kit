import acceptLanguage from 'accept-language'

const languages = ['en', 'de']
const defaultLanguage = 'en'

acceptLanguage.languages(languages)

export default (req, res, next) => {
  const cookieLocale = req.cookies.locale
  const locale = acceptLanguage.get(cookieLocale || req.headers['accept-language']) || defaultLanguage
  req.cookies.locale = locale
  res.cookie('locale', locale, { maxAge: (Date.now() / 1000) + (365 * 24 * 3600) })
  next()
}
