import { render } from "../dist/index.js";
import { Client, AttachmentBuilder, GatewayIntentBits, Partials } from "discord.js";

const client = new Client({
  intents: Object.values(GatewayIntentBits).filter((intent) => typeof intent === "number"),
  partials: [
    Partials.User,
    Partials.Message,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.Channel,
    Partials.GuildScheduledEvent,
    Partials.Reaction,
  ],
  failIfNotExists: false,
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
  rest: { timeout: 15000 },
});

client.on("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (msg) => {
  if (msg.content.startsWith("sexy test")) {
    if (msg.author.bot) return;

    await msg.react("🔥");

    render(msg).then((buffer) => {
      // fs.writeFile("./output.png", buffer, () => {});

      const attachment = new AttachmentBuilder(buffer, { name: "message.png" });
      msg.reply({ files: [attachment] });
    });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
