import { FromLanguage, Language } from '../../../types/types'

export async function translate({
  fromLanguage,
  toLanguage,
  text }: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const BODY = JSON.stringify({
    from_language: fromLanguage,
    to_language: toLanguage,
    text: text,
  })
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: BODY })
    const json = await response.json()
    return json?.text
  }
  catch (error) {
    console.log(error)
  }
}
