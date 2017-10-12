require('dotenv').config()

const path = require('path')

const aws = require('aws-sdk')
const nodemailer = require('nodemailer')
const pug = require('pug')

const welcomeTemplate = pug.compileFile(path.join(__dirname, 'templates', 'welcome.pug'))
const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
    region: process.env.SES_REGION
  })
})

module.exports = {
  sendWelcomeMail(to, {name}) {
    return transporter.sendMail({
      from: process.env.SES_FROM_MAIL,
      to,
      subject: `${name} 님의 가입을 진심으로 환영합니다.`,
      html: welcomeTemplate({name})
    })
  }
}
