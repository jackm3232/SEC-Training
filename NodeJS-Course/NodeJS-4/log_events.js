const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fs_promises = require("fs").promises;
const path = require("path");

const log_events = async (message) => {
  const date_time = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const log_item = `${date_time}\t${uuid()}\t${message}\n`;
  console.log(log_item);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs_promises.mkdir(path.join(__dirname, "logs"));
    }
    await fs_promises.appendFile(path.join(__dirname, "logs", "event_log.txt"), 
                                log_item);
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = log_events;
