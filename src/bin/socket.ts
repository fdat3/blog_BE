import { Server, Socket, Event } from "socket.io";
import App from '..'
import {Express, Application} from 'express'
import {ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData} from "@/interfaces/socket.interface"
import SocketConstant from '@/constants/socket.constant'
import * as http from 'http'
import Variable from '@/env/variable.env'
const { instrument, RedisStore } = require("@socket.io/admin-ui");


import { createAdapter, RedisAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

class SocketServer {

  private readonly app: Application | http.Server;
  private readonly io: Server;
  public static readonly SOCKET_PORT: number = Variable.SOCKET_PORT

  constructor(app: Application) {
    this.app = http.createServer(app)
    this.io = new Server(this.app, {
      wsEngine: require("eiows").Server,
      cors: {
        origin: ['https://admin.socket.io'],
        credentials: true
      }
    })


    // this.initSocketServer()
  }

  initSocketServer() {
    this.io.listen(SocketServer.SOCKET_PORT)
    this.socketAdapter(this.io)
    // instrument(this.io, {
    //   auth: false,
    //   mode: "development",
    //   store: new RedisStore(pubClient)
    // });
    this.io.on(SocketConstant.CONNECTION, this.onConnection.bind(this))

  }

  socketAdapter(server: Server){
    const pubClient = createClient({url: 'redis://localhost:6379'})
    const subClient = pubClient.duplicate()
    server.adapter(createAdapter(pubClient, subClient))

  }

  socketMiddleware(io: Server) {
    io.use((socket: Socket, next: any) => {
      next()
    })
  }



  onConnection(server: Server) {
    // server.on(SocketConstant.CONNECTION, (socket: Socket, data: any) => {
    //   console.log(socket.id, data)
    // })

  }


}

export default SocketServer