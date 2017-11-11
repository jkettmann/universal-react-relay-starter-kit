import Cookies from 'cookies'
import acceptLanguage from 'accept-language'

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365
const languages = ['en', 'de']
const defaultLanguage = 'en'

acceptLanguage.languages(languages)

export default (req, res, next) => {
  const cookies = new Cookies(req, res)
  const cookieLocale = cookies.locale
  const locale = acceptLanguage.get(cookieLocale || req.headers['accept-language']) || defaultLanguage
  cookies.set('locale', locale, { maxAge: ONE_YEAR })
  next()
}
