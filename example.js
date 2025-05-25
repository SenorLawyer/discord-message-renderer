const { render } = require("discord-message-renderer");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!render") {
    try {
      const messages = await message.channel.messages.fetch({ limit: 2 });
      const targetMessage = messages.last();

      if (!targetMessage) {
        return message.reply("No message to render!");
      }

      const imageBuffer = await render(targetMessage);

      const attachment = new AttachmentBuilder(imageBuffer, {
        name: "rendered-message.png",
      });

      await message.reply({
        content: "Here's your rendered message!",
        files: [attachment],
      });
    } catch (error) {
      console.error("Failed to render message:", error);
      await message.reply("Failed to render message: " + error.message);
    }
  }
});

client.login("YOUR_BOT_TOKEN");
