"use strict"

const amqp = require("amqplib/callback_api");

const CONN_URL = 'amqp://guest:guest@localhost';
const queueName = "newEoloPlantsQueue";

amqp.connect(CONN_URL, async function (err, connection) {
    const chanel = await connection.createChannel();

    chanel.assertQueue(queueName); // crea la cola si no existe y si existe no hace nada

    chanel.consume(queueName, (buffer) => {
        const content = JSON.parse(buffer.content.toString());
        console.log(content);
        io.sockets.emit("consumerMessage");
        chanel.ack(buffer);
        return content;
    }); // , {noAck: true}); // noAck borra de la cola los mensajes una vez recibidos hay que evitarlo
});