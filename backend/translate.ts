import { Language, FromLanguage } from '../types/types.js'

const apiKey = process.env.DEEPL_API_KEY
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate'
const HEADERS = { 'Content-Type': 'application/json', 'Authorization': `DeepL-Auth-Key ${apiKey}` }

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
    source_lang: fromLanguage,
    target_lang: toLanguage,
    text: [text],
  })
  try {
    const response = await fetch(DEEPL_URL, { method: 'POST', headers: HEADERS, body: BODY })
    const json = await response.json()
    return json?.translations[0]?.text
  }
  catch (error) {}
}