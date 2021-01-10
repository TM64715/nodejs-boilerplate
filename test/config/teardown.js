module.exports = async function() {
  console.log("Teardown Mongo Connection")
  delete global.ebClient
  delete global.ebDB
}
