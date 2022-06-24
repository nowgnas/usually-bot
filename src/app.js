import Discord, { MessageEmbed } from "discord.js";
// import { UserModel } from "./db";
import axios from "axios";
import "dotenv/config";

// -----------------------timer class----------------------------
class sendMessage {
    // todo timer 일단 보류
    static timer(ms) {
        return new Promise((resolve) => {
            const timers = setInterval(() => {
                console.log(`${ms / 1000} sec passed`);
                let { day, hour, minute } = getDay();
                if (day === "Tue" && hour === 12 && minute === 30) {
                    nowesWork();
                }
                if (hour === 9 && minute === 0) {
                    daily();
                }
                if (day !== "Mon" && hour === 18 && minute === 0) {
                    baseBall();
                }
            }, ms);
        });
    }
}

sendMessage.timer(58000);
// -----------------------timer class----------------------------
// ---------------get day-------------------
const getDay = () => {
    const date = new Date();
    let day = date.toString().slice(0, 3);
    let hour = date.getHours();
    let minute = date.getMinutes();
    return { day, hour, minute };
};
// ---------------get day-------------------

const msgEmbed = (txtJson) => {
    return new MessageEmbed(txtJson);
};

const daily = async () => {
    const url = process.env.USUALLY_WEBHOOK;
    await axios.post(url, {
        content: "오늘도 행복한 하루 🤍",
    });
    console.log("send message");

    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
};

const nowesWork = async () => {
    const url = process.env.USUALLY_WEBHOOK;
    await axios.post(url, {
        content: "오늘 알바도 화이팅🤍",
    });
    console.log("send message");

    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
};
const baseBall = async () => {
    const url = process.env.USUALLY_WEBHOOK;
    await axios.post(url, {
        content: "오늘경기도 잘 봐줘!🤍",
    });
    console.log("send message");

    const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Lambda!"),
    };
    return response;
};

const client = new Discord.Client();

client.on("ready", () => {
    client.user.setActivity("👀 요청 대기", { type: "PLAYING" });
    console.log(`logged in as ${client.user.tag}`);
});

client.on("message", async (msg) => {
    if (msg.content === "test") {
        nowesWork();
    }
});

client.login(process.env.TOKEN);
