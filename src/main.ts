import * as core from '@actions/core'
import Twitter from 'twitter'

async function run(message: string): Promise<void> {
  try {
    const client = new Twitter({
      consumer_key: core.getInput('consumer_key'),
      consumer_secret: core.getInput('consumer_secret'),
      access_token_key: core.getInput('access_token_key'),
      access_token_secret: core.getInput('access_token_secret')
    })

    client.post('statuses/update', {status: message}, error => {
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

const now = getJstDate()
const targetDate = getJstDate('2021/02/28')
const diffTime = targetDate.getTime() - now.getTime()
var diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

run(diffDay.toString())
