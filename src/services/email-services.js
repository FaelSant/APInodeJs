"use strict"

import sendgrid from "@sendgrid/mail"
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
export const send = async (to, subject, body) => {
  sendgrid.send({
    to: to,
    from: "hello@rafael.io",
    subject: subject,
    html: body,
  })
}
