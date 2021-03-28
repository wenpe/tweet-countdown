import * as core from '@actions/core'
import Twitter from 'twitter'

const client = new Twitter({
  consumer_key: core.getInput('consumer_key'),
  consumer_secret: core.getInput('consumer_secret'),
  access_token_key: core.getInput('access_token_key'),
  access_token_secret: core.getInput('access_token_secret')
})

const getJstDate = (target_date?: string): Date => {
  const jstOffset = 9 * 60

  if (target_date) {
    const date = new Date(target_date)
    date.setTime(date.getTime() + jstOffset * 60 * 1000)

    return date
  } else {
    const date = new Date()
    date.setTime(date.getTime() + jstOffset * 60 * 1000)

    return date
  }
}

const first_message = core.getInput('first_message')
const target_date = core.getInput('target_date')
const last_message = core.getInput('last_message')

const now = getJstDate()
const targetDate = new Date(target_date)
const diffTime = targetDate.getTime() - now.getTime()
const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

let count = ''
if (Math.sign(diffDay) === 0) {
  count = '当'
} else if (Math.sign(diffDay) === 1) {
  count = diffDay.toString()
}

const message = `${first_message}

のこり ${count} 日!!

${last_message}`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const main = async (twitter_client: Twitter, tweet_message: string) => {
  try {
    await twitter_client.post('statuses/update', {status: tweet_message})

    // eslint-disable-next-line no-console
    console.log('Successfully posted the tweet!')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Failed to post the tweet!')
    // eslint-disable-next-line no-console
    console.log(e.message)
  }
}

// eslint-disable-next-line no-console
Math.sign(diffDay) === -1 ? console.log('done') : main(client, message)
