import React from 'react'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import de from 'react-intl/locale-data/de'

import localeData from './locales/data.json'

addLocaleData([...en, ...de])

const withIntl = (children, locale) => {
  const messages = localeData[locale] || localeData.en

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default withIntl
