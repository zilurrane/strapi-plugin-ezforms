'use strict'
const formSubmissionTemplate = require('./email-templates/form-submission');

module.exports = ({ strapi }) => ({
  async send(config, formName, data) {
    let recipients = await strapi.query('plugin::ezforms.recipient').findMany()
    //Loop through data and construct message from data object
    let formattedTableData = strapi.plugin('ezforms').service('formatData').formatHtmlData(data)
    //loop through the recipients and send an email
    for (let recipient of recipients) {
      try {
        await strapi.plugins['email'].services.email.send({
          to: recipient.email,
          from: config.from,
          subject: config.subject ? config.subject : `New ${formName} Submission`,
          html: formSubmissionTemplate(formattedTableData),
          attachments: [
            {
              filename: data.resume,
              path: data.resume,
              cid: data.resume
            }
          ]
        })
      } catch (e) {
        strapi.log.error(e)
      }
    }

  }
})
