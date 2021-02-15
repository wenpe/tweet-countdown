import * as core from '@actions/core'
import Twitter from 'twitter'

const client = new Twitter({
  consumer_key: core.getInput('consumer_key'),
  consumer_secret: core.getInput('consumer_secret'),
  access_token_key: core.getInput('access_token_key'),
  access_token_secret: core.getInput('access_token_secret')
})

const daysToDeletion = 25 - new Date().getDate()

const message = `👋 Hey there folks!.
This is an automated message 🤖 to remind you that this account has been renamed to @_skippednote and will be deactivated in the next ${daysToDeletion} days.
I've moved to @skippednote, you can come follow me there ♥️`

;(async function main() {
  try {
    await client.post('statuses/update', {status: message})
    console.log('Successfully posted the tweet!')
  } catch (e) {
    console.log('Failed to post the tweet!')
    console.log(e.message)
  }
})()
