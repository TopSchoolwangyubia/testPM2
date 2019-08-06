// 给Date对象添加getYMD方法，获取字符串形式的年月日
Date.prototype.getYMD = function () {
  var retDate = this.getFullYear() + '-' // 获取年份。
  retDate += this.getMonth() + 1 + '-' // 获取月份。
  retDate += this.getDate() // 获取日。
  return retDate // 返回日期。
}

// 给String对象添加getDate方法，使字符串形式的日期返回为Date型的日期
String.prototype.getDate = function () {
  var strArr = this.split('-')
  var date = new Date(strArr[0], strArr[1] - 1, strArr[2])
  return date
}

// 获取间隔天数
export function getDays (day1, day2) {
  // 获取入参字符串形式日期的Date型日期
  var d1 = day1.getDate()
  var d2 = day2.getDate()

  // 定义一天的毫秒数
  var dayMilliSeconds = 1000 * 60 * 60 * 24

  // 获取输入日期的毫秒数
  var d1Ms = d1.getTime()
  var d2Ms = d2.getTime()

  // 定义返回值
  // var ret
  let ret = []

  // 对日期毫秒数进行循环比较，直到d1Ms 大于等于 d2Ms 时退出循环
  // 每次循环结束，给d1Ms 增加一天
  for (d1Ms; d1Ms <= d2Ms; d1Ms += dayMilliSeconds) {
    // 如果ret为空，则无需添加","作为分隔符
    if (!ret) {
      // 将给的毫秒数转换为Date日期
      var day = new Date(d1Ms)

      // 获取其年月日形式的字符串
      // ret = day.getYMD()
      ret.push(day.getYMD())
    } else {
      // 否则，给ret的每个字符日期间添加","作为分隔符
      var day = new Date(d1Ms)
      // ret = ret + ',' + day.getYMD() // 字符串
      ret.push(day.getYMD()) // 数组
    }
  }

  // alert(ret) // 或可换为return ret;
  return ret.reverse()
}

// 获取开始时间
export function getquerydate (type) {
  var myDate = new Date()
  var fullYear = myDate.getFullYear()
  var month = myDate.getMonth()
  var date = myDate.getDate()
  var months = parseInt(month, 10)
  var lastdate = new Date(fullYear, months, 0).getDate()
  const startMonth = month < 9 ? `0${month}` : `${month}`
  const endMonth = month < 9 ? `${month + 1}` : `${month + 1}`
  const endDay = date < 10 ? `0${date}` : `${date}`
  // var query_time_start = (month === 0 ? `${fullYear - 1}-${12}-${lastdate}` : `${fullYear}-${startMonth}-${lastdate}`)
  var query_time_start = `${fullYear}-${startMonth}-${lastdate}`
  var query_time_end = `${fullYear}-${endMonth}-${endDay}`
  if (type === 0) {
    return query_time_start
  } else {
    return query_time_end
  }
}

// 获取结束时间
