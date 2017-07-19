const getArguments = require('../cli/get-arguments')

getArguments({ foo: 'bar' }, ['repos', 'patch', 'message']).then((res) => console.log(res))
