const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  // eslint-disable-next-line no-undef
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.rnvlwng.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// eslint-disable-next-line no-undef
if (process.argv[3] !== undefined && process.argv[4] !== undefined){
  mongoose
    .connect(url)
    .then(() => {


      const person = new Person({
        // eslint-disable-next-line no-undef
        name: process.argv[3],
        // eslint-disable-next-line no-undef
        number: process.argv[4]
      })

      return person.save()
    })
    .then(() => {
      // eslint-disable-next-line no-undef
      console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => {
      console.log(err)
      mongoose.connection.close()
    })
}
else {
  mongoose
    .connect(url)
    .then(() => {

      Person
        .find({})
        .then(result => {
          console.log('phonebook:')
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          mongoose.connection.close()
        })
    })
    .catch((err) => {
      console.log(err)
      mongoose.connection.close()
    })
}