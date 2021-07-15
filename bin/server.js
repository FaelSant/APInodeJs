"use strict"
import app from "../src/app"
import http from "http"
import Debug from "debug"
import express from "express"
const port = normalizePort(process.env.PORT || 3000)
app.set("port", port)
const server = http.createServer(app)
const router = express.Router()
const Debugger = Debug("nodestr:server")
function onListening() {
  const addr = server.address()
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + addr.port
  Debugger("Listening on " + bind)
}

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 10) {
    return port
  }
  return false
}

server.listen(port)
server.on("Listening", onListening)
console.log("API rodando na porta: ", port)
