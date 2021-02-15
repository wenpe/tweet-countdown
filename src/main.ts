import * as core from '@actions/core'
import Twitter from 'twitter'

const client = new Twitter({
  consumer_key: core.getInput('consumer_key'),
  consumer_secret: core.getInput('consumer_secret'),
  access_token_key: core.getInput('access_token_key'),
  access_token_secret: core.getInput('access_token_secret')
})

const first_message = core.getInput('first_message')
const target_date = core.getInput('target_date')
const last_message = core.getInput('last_message')

const getJstDate = (target_date = '') => {
  const jstOffset = 9 * 60

  if (target_date !== '') {
    const date = new Date(target_date)
    date.setTime(date.getTime() + jstOffset * 60 * 1000)

    return date
  } else {
    const date = new Date()
    date.setTime(date.getTime() + jstOffset * 60 * 1000)

    return date
  }
}

const now = getJstDate()
const targetDate = getJstDate(target_date)
const diffTime = targetDate.getTime() - now.getTime()
const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

const message = `${first_message}

のこり ${diffDay.toString()} 日!!

${last_message}`

const main = async (client: Twitter, message: string) => {
  try {
    await client.post('statuses/update', {status: message})
    console.log('Successfully posted the tweet!')
  } catch (e) {
    console.log('Failed to post the tweet!')
    console.log(e.message)
  }
}

main(client, message)
