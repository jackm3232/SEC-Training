const log_events = require("./log_events");

const event_emitter = require("events");

class My_Emitter extends event_emitter {};

const my_emitter = new My_Emitter();

my_emitter.on("log", (mesg) => {
  (log_events(mesg))
});

my_emitter.emit("log", "Event emitted!");
