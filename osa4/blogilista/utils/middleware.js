
const tokenExtractor = (request, response, next) => {
  console.log('middleware')
  const authorization = request.get('authorization')
  const authorizationValid = authorization.toLowerCase().startsWith('bearer ')

  console.log(authorization, authorizationValid)
  if (authorization && authorizationValid) {
    request.token = authorization.substring(7)
  }
  next()
}


module.exports = {
  tokenExtractor
}