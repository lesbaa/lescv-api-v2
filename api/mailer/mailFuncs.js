const nodemailer = require('nodemailer')

const host = process.env.MAIL_SERVER
const user = process.env.MAIL_USERNAME
const pass = process.env.MAIL_PW

const smtpConf = {
  host,
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  }
}

const transporter = nodemailer.createTransport(smtpConf)
transporter.verify((err) => {
  if (err) {
    console.log('*** cannot init mailsender ***')
    console.log(err)
  } else {
    console.log('*** Mail sender ready ***')
  }
})

const rthMailer = ({
  name = 'none given',
  email = 'none given',
  tel = 'none given',
  message = 'none given',
}) => {
  const msg = {
    from: 'robot@lesmoffat.co.uk',
    replyTo: `${name} <${email}>`,
    // to: 'les@lesmoffat.co.uk',
    to: 'hello@theglasgowdogwalker.co.uk',
    subject: `Woof! woof! ${name} needs a dog walker!`,
    text: 'Walk-a-ding-dong-diddlies',
    html: `
            <h2><span style="color: #01DFA5">${name}</span> has sent you a message from your website.</h2>
            <h3>Phone number</h3>
            <p><a href="tel:${tel}" title="name">${tel}</a></p>
            <h3>Message:</h3>
            <p>${message}</p>
        `
  }
      
  transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err)
      throw new Error('Unable to rth send mail!', err)
    } else {
      console.log('*** RTH: message sent boiiii ***')
    }
  })
}

const anaMailer = ({
  name = 'none given',
  email = 'none given',
  tel = 'none given',
  message = 'none given',
}) => {
  const msg = {
    from: 'robot@lesmoffat.co.uk',
    replyTo: `${name} <${email}>`,
    // to: 'les@lesmoffat.co.uk',
    to: 'contact@anateresavicente.com',
    subject: `Hiya! You have a new message from ${name}`,
    text: 'hello-hello-hello',
    html: `
            <h2><span style="color: #01DFA5">${name}</span> has sent you a message from your website.</h2>
            <h3>Phone number</h3>
            <p><a href="tel:${tel}" title="name">${tel}</a></p>
            <h3>Message:</h3>
            <p>${message}</p>
        `
  }
      
  transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err)
      throw new Error('Unable to atv send mail!', err)
    } else {
      console.log('*** ATV: message sent boiiii ***')
    }
  })
}

const mailer = ({
  ref = 'some user',
  page = 'some page',
  platform = 'unknown',
  geoData,
}) => {
  const msg = {
    from: 'les@lesmoffat.co.uk',
    to: 'les@lesmoffat.co.uk',
    subject: `Hey Les! ${ref} is looking at your cv!`,
    text: 'Well, someone is looking at your cv',
    html: `<p>ref: ${ref}</p><p>page: ${page}</p><p>platform: ${platform}</p><p>${JSON.stringify(geoData)}</p>`
  }
  
  transporter.sendMail(msg, (err, info) => {
    if (err) {
      console.log(err)
      throw new Error('Unable to send mail!', err)
    } else {
      console.log('*** message sent boiiii ***')
    }
  })
} 

module.exports = {
  mailer,
  rthMailer,
  anaMailer,
}
