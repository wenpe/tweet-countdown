const getJstDate = target_date => {
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

const now = getJstDate()
const targetDate = getJstDate('2021/02/28')
const diffTime = targetDate.getTime() - now.getTime()
const diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

const message = diffDay.toString()
console.log(message)
