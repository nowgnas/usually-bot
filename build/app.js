"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _discord = _interopRequireWildcard(require("discord.js"));

var _axios = _interopRequireDefault(require("axios"));

require("dotenv/config");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { UserModel } from "./db";
// -----------------------timer class----------------------------
class sendMessage {
  // todo timer 일단 보류
  static timer(ms) {
    return new Promise(resolve => {
      const timers = setInterval(() => {
        console.log(`${ms / 1000} sec passed`);
        let {
          day,
          hour,
          minute
        } = getDay();

        if (day === "Tue" && hour === 12 && minute === 30) {
          nowesWork();
        }

        if (hour === 9 && minute === 0) {
          daily();
        }
      }, ms);
    });
  }

}

sendMessage.timer(58000); // -----------------------timer class----------------------------
// ---------------get day-------------------

const getDay = () => {
  const date = new Date();
  let day = date.toString().slice(0, 3);
  let hour = date.getHours();
  let minute = date.getMinutes();
  return {
    day,
    hour,
    minute
  };
}; // ---------------get day-------------------


const msgEmbed = txtJson => {
  return new _discord.MessageEmbed(txtJson);
};

const daily = async () => {
  const url = process.env.USUALLY_WEBHOOK;
  await _axios.default.post(url, {
    content: "오늘도 행복한 하루 🤍"
  });
  console.log("send message");
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!")
  };
  return response;
};

const nowesWork = async () => {
  const url = process.env.USUALLY_WEBHOOK;
  await _axios.default.post(url, {
    content: "오늘 알바도 화이팅🤍"
  });
  console.log("send message");
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!")
  };
  return response;
};

const client = new _discord.default.Client();
client.on("ready", () => {
  client.user.setActivity("👀 요청 대기", {
    type: "PLAYING"
  });
  console.log(`logged in as ${client.user.tag}`);
});
client.on("message", async msg => {
  if (msg.content === "test") {
    nowesWork();
    daily();
  }
});
client.login(process.env.TOKEN);