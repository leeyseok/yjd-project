'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
const Page = () => {
  const { t } = useTranslation();
  return (
    <div>{t('home:header')}
    </div>
  )
}

export default Page