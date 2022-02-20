const {
  mailer: lesMailer,
  rthMailer,
  anaMailer,
} = require('../mailFuncs')
const fetch = require('node-fetch')
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const mailerMap = {
  rth: rthMailer,
  atv: anaMailer,
  lesalytics: lesMailer
}

async function getGeoLocation({ ip }) {
  try {
    const req = await fetch(`http://api.ipstack.com/${ip}?access_key=${process.env.IP_LOOKUP}`)
    return await req.json()
  } catch(e) {
    return { location: 'unknown' }
  }
}

module.exports = {
  async send({ params, request, header, ...ctx }) {
    try {
      const mailer = mailerMap[params.id]
      if (!mailer) {
        lesMailer({
          ref: 'error, somebody tried a dodgy mailer...',
          page: 'strapi service',
          platform: JSON.stringify(header)
        })
      }

      const geoData = params.id === 'lesalytics'
      ? await getGeoLocation(request)
      : {}

      mailer({
        ...request.body,
        platform: header['user-agent'],
        geoData,
      })

      return { ok: true }
    } catch(e) {
      ctx.body = { error: 'Error Sending Mail!' }
      ctx.status = 500
      console.error(e)
    }
  }
}
