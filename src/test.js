const getJstDate = (dateString = undefined) => {
  const jstOffset = 9 * 60

  if (dateString) {
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
console.log(now)

const targetDate = getJstDate('2021/02/28')
console.log(targetDate)

const diffTime = targetDate.getTime() - now.getTime()

var diffDay = Math.floor(diffTime / (1000 * 60 * 60 * 24) + 1)

console.log(diffDay)

const str1 = 'aaaa'

const test = `
残りほげ
${str1}
`

console.log(test)
