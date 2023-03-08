import { Server, Socket } from 'socket.io'
import { Application } from 'express'
import SocketConstant from '@/constants/socket.constant'
import * as http from 'http'
import Variable from '@/env/variable.env'
import * as _ from 'lodash'


import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'

class SocketServer {

  private readonly app: Application | http.Server;
  private readonly io: Server;
  public static readonly SOCKET_PORT: number = Variable.SOCKET_PORT

  users: {[key: string]: any} = {}

  constructor(app: Application) {
    /**
     * Socket init optional with wsEngine, that can be extended for max connections concurrently
     * Refer to: https://socket.io/docs/v4/performance-tuning/
     */

    this.app = http.createServer(app)
    this.io = new Server(this.app, {
      wsEngine: require("eiows").Server,
      // cors: {
      //   origin: ['https://admin.socket.io'],
      //   credentials: true
      // }
    })
  }

  async initSocketServer() {
    this.io.listen(SocketServer.SOCKET_PORT)
    await this.socketAdapter(this.io)
    // instrument(this.io, {
    //   auth: false,
    //   mode: "development",
    //   store: new RedisStore(pubClient)
    // });
    await this.io.on(SocketConstant.CONNECTION, this.onClientConnection.bind(this))

  }

  private async socketAdapter(server: Server){
    /**
     * This function create the pub and sub Client for caching connection with redis
     */
    const pubClient = await createClient({
      url: 'redis://localhost:6379',
      legacyMode: true
    })

    const subClient = await pubClient.duplicate()
    // pubClient.on('error', (err) => {
    //   console.log(err)
    // })
    // subClient.on('error', (err) => {
    //   console.log(err)
    // })
    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
      // pubClient.on('error', (...args) => {
      //   console.log(args)
      // })
      server.adapter(createAdapter(pubClient, subClient));
      console.log('Socket With Redis cache connected')
    }).catch(() => {
      console.error('Socket With Redis cache connected')
    })

  }

  private socketMiddleware(io: Server) {
    io.use((socket: Socket, next: any) => {
      next()
    })
  }

  private sendOnlineListWhileFirstConnection(socket: Socket) {
    socket.emit('online_list', this.users)
  }


  private async onClientConnection(socket: Socket) {
    this.sendOnlineListWhileFirstConnection(socket)
    const user_id = socket.handshake.query.user_id?.toString() || null

    if (user_id) {
      if (!this.users[user_id])  this.users[user_id] = []
      this.users[user_id].push(user_id)

      this.io.emit('online', user_id)
      socket.on(SocketConstant.DISCONNECT, () => {
            _.remove(this.users[user_id], (u) => u === user_id)
            this.io.emit('offline', user_id)
            delete this.users[user_id];
            socket.disconnect();
      })

      // Custom socket event bellow

    }
  }



  private handleSocketEvents(
    func: (server: Server, ...params: any[]) => any,
    server: Server) {
    return (...args: any[]) => func.bind(this)(server, ...args);
  }


}

export default SocketServer