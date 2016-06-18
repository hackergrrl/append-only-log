var Log = require('./index')

var log = new Log()

log.append('hello', function (err, seq1) {
  if (err) throw err
  log.append('world!', function (err, seq2) {
    if (err) throw err
    log.get(seq1, function (err, value) {
      console.log('value @', seq1, '=', value)
      print(log)
    })
  })
})

function print (aol) {
  var read = aol.createReadStream(/*{ reverse: true }*/)
  read.on('data', function (entry) {
    console.log('entry', entry)
  })
  read.resume()
}
