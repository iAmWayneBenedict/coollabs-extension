const WEB_APP_URL = 'http://localhost:8080'
const EXTENSION_ID = chrome?.runtime?.id || 'placeholder'

const config = {
  WEB_APP_URL,
  SERVER_API: `${WEB_APP_URL}/api/v1/rest`,
  EXTENSION_ID,
  CALLBACK_URL: `${WEB_APP_URL}/external/${EXTENSION_ID}/callback`,
}

export default config
