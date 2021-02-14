import * as core from '@actions/core'
import Twitter from 'twitter'

async function run(): Promise<void> {
  try {
    const client = new Twitter({
      consumer_key: core.getInput('consumer_key'),
      consumer_secret: core.getInput('consumer_secret'),
      access_token_key: core.getInput('access_token_key'),
      access_token_secret: core.getInput('access_token_secret')
    })

    const getJstDate = (dateString = '') => {
      const jstOffset = 9 * 60

      if (dateString !== '') {
        const date = new Date(dateString)
        date.setTime(date.getTime() + jstOffset * 60 * 1000)

        return date
      } else {
        const date = new Date()
        date.setTime(date.getTime() + jstOffset * 60 * 1000)

        return date
      }
    }

    const now: Date = getJstDate()
    const targetDate: Date = getJstDate(core.getInput('target_date'))

    const diffTime = targetDate.getTime() - now.getTime()

    const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

    const tweet_body = `
    ${core.getInput('start_message')}

    ${diffDay}日

    ${core.getInput('end_message')}
    `

    console.log(tweet_body)

    client.post('statuses/update', {status: tweet_body}, error => {
      if (!error) {
        console.log('Succeeded!')
      } else {
        console.log('Couldnt tweet.')
      }
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
