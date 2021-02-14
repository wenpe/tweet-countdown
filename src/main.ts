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

    client.post(
      'statuses/update',
      {status: core.getInput('tweet_body')},
      error => {
        if (!error) {
          console.log('Succeeded!')
        } else {
          console.log('Couldnt tweet.')
          console.log(error)
        }
      }
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
