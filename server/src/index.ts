import fastify from "fastify";
import { IncomingMessage } from "http";
import { WebSocketServer, WebSocket } from "ws";
import * as Y from "yjs";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import { YArray } from "yjs/dist/src/internals";

import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';

import Redis from "ioredis";

import { setTimeout } from "timers/promises";

const docs = new Map<string, Uint8Array>();

const httpServer = fastify({ logger: true });
const wss = new WebSocketServer({
    noServer: true,
});

// httpServer.ready().then(async () => {
//     console.log("fastify serverが起動されました。");
//     wss.on("connection", async (ws, req) => {
//         await setupWebSocketConnection(ws, req);
//     });
//     httpServer.server.on("upgrade", (req, socket, head) => {
//         wss.handleUpgrade(req, socket, head, (ws) => {
//             wss.emit("connection", ws, req);
//         });
//     });
// });

// httpServer.listen({ host: "0.0.0.0", port: 3001 }, (error, address) => {
//     if (error) {
//         console.error(`エラーが発生しました。[${error}][address : ${address}]`);
//     }
// });

//wss.close();
//httpServer.close();

async function setupWebSocketConnection(ws: WebSocket, req: IncomingMessage): Promise<void> {
    const docName: string = req.url?.slice(1).split("?")[0] as string;
    ws.binaryType = "arraybuffer";
    
}

const s3Client = new S3Client({
    credentials: fromIni({ profile: "default"}),
})

export const s3Object = async () => {
    const object = await s3Client.send(new GetObjectCommand({
        Bucket: "np01-nagamatsu-test",
        Key: "workspace/taskId/taskNoteId/object.txt",
    }));
    console.log("s3Object is called.");
    const contents = await object.Body?.transformToString();
    console.log(contents);
}

s3Object();


// const redis = new Redis({
//     port: 6379,
//     host: "127.0.0.1",
// });

// async function redis_set() {
//     console.log("redis_set() is called.");
//     await redis.set("key1", "value1");
//     await setTimeout(3000);
// }

// async function redis_get() {
//     console.log("redis_get() is called.");
//     const value = await redis.get("key1");
//     if (value) {
//         console.error("value is null");
//     } else {
//         console.log(value);
//     }
//     await setTimeout(3000);
//     return value;
// }

// redis_set();
// console.log("after redis_set()");
// console.log(redis_get());
