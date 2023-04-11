// import chalk from 'chalk'
// import cluster from 'cluster'
// import os from 'os'
//
//
// if (cluster.isMaster) {
//   const cpus = os.cpus().length
//   console.log(chalk.blue(`Forking for ${cpus} CPUs`))
//   for (let i = 0; i < cpus; i++) {
//     cluster.fork()
//   }
// }
