module.exports = ({strapi}) => ({
  formatData(data) {
    let message = ''
    //Loop through data and construct message from data object
    for (let key in data) {
      if (typeof data[key] === 'object') {
        message += `${key}: ${JSON.stringify(data[key], null, 2)}\n`
      } else {
        message += `${key}: ${data[key]}\n`
      }
    }
    return message
  },
  formatHtmlData(data) {
    let message = ''
    //Loop through data and construct message from data object
    for (let key in data) {
      if (typeof data[key] === 'object') {
        message += `<tr><td style="padding: 10px 5px; width: 50vw; border: 1px solid #333333;">${key}</td><td style="width: 50vw; border: 1px solid #333333;"> ${JSON.stringify(data[key], null, 2)}</td></tr>`
      } else {
        message += `<tr><td style="padding: 10px 5px;width: 50vw; border: 1px solid #333333;">${key}</td><td style="width: 50vw; border: 1px solid #333333;"> ${data[key]}</td></tr>`
      }
    }
    return message
  }
})
