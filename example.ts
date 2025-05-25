import { render, RenderOptions } from "discord-message-renderer";
import { Client, GatewayIntentBits, AttachmentBuilder, Message } from "discord.js";
import fs from "fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;

  if (message.content === "!render") {
    try {
      const messages = await message.channel.messages.fetch({ limit: 2 });
      const targetMessage = messages.last();

      if (!targetMessage) {
        return message.reply("No message to render!");
      }

      const options: RenderOptions = {
        width: 800,
        client: client,
      };

      const imageBuffer = await render(targetMessage, options);

      if (Buffer.isBuffer(imageBuffer)) {
        fs.writeFileSync("rendered-message.png", imageBuffer);

        const attachment = new AttachmentBuilder(imageBuffer, {
          name: "rendered-message.png",
        });

        await message.reply({
          content: "Here's your rendered message!",
          files: [attachment],
        });
      }
    } catch (error) {
      console.error("Failed to render message:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      await message.reply("Failed to render message: " + errorMessage);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
