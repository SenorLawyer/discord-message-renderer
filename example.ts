import { render, RenderOptions } from "discord-message-renderer";
import { Client, GatewayIntentBits, AttachmentBuilder, Message } from "discord.js";
import fs from "fs";

// Create Discord client with proper typing
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
  // Skip bot messages
  if (message.author.bot) return;

  // Render message when someone types "!render"
  if (message.content === "!render") {
    try {
      // Get the previous message to render
      const messages = await message.channel.messages.fetch({ limit: 2 });
      const targetMessage = messages.last();

      if (!targetMessage) {
        return message.reply("No message to render!");
      }

      // Render options with type safety
      const options: RenderOptions = {
        width: 800,
        client: client,
      };

      // Render the message with type-safe call
      const imageBuffer = await render(targetMessage, options);

      // Type-safe buffer handling
      if (Buffer.isBuffer(imageBuffer)) {
        // Save to file
        fs.writeFileSync("rendered-message.png", imageBuffer);

        // Send as attachment
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

// Login with your bot token
client.login(process.env.DISCORD_TOKEN);
