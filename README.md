# Discord Message Renderer

A TypeScript library for rendering Discord messages to images with full markdown, emoji, attachment, and sticker support.

## Features

- 🎨 **Full Discord Styling** - Pixel-perfect Discord message appearance
- 📝 **Complete Markdown Support** - Headers, bold, italic, code blocks, etc.
- 😀 **Emoji Rendering** - Unicode emojis and custom Discord emojis
- 🖼️ **Media Support** - Images, GIFs, videos, and attachments
- 🎭 **Sticker Support** - Discord stickers with fallback handling
- 🔗 **Smart URL Detection** - Tenor, Giphy, Imgur, and direct media links
- 💬 **Reply System** - Discord-style reply spines and previews
- 🎯 **Mention Resolution** - Real user, channel, and role names
- 📱 **Attachment Grids** - Discord's exact attachment layouts (1-10+ images)
- 🎨 **Role Colors** - Proper role color display for usernames

## Installation

```bash
bun install discord-message-renderer
```

## Usage

```typescript
import { render } from "discord-message-renderer";
import { Client } from "discord.js";

const client = new Client({ intents: ["GuildMessages", "MessageContent"] });

client.on("messageCreate", async (message) => {
  try {
    const imageBuffer = await render(message);

    // Save to file
    fs.writeFileSync("message.png", imageBuffer);

    // Or send as Discord attachment
    const attachment = new AttachmentBuilder(imageBuffer, { name: "message.png" });
    await message.reply({ files: [attachment] });
  } catch (error) {
    console.error("Failed to render message:", error);
  }
});
```

## API Reference

### `render(message, options?)`

Renders a Discord message to a PNG image buffer.

**Parameters:**

- `message: Message` - Discord.js Message object
- `options?: RenderOptions` - Optional rendering configuration

**Returns:** `Promise<Buffer>` - PNG image buffer

### `RenderOptions`

```typescript
interface RenderOptions {
  width?: number; // Custom width (optional)
  height?: number; // Custom height (optional)
  client?: Client; // Discord client for enhanced features (optional)
}
```

### `ReplyMessageData`

```typescript
interface ReplyMessageData {
  author?: User;
  content?: string;
  avatarURL?: string;
  name?: string;
  userColor?: string;
}
```

## Supported Markdown

- **Headers**: `#`, `##`, `###`
- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Strikethrough**: `~~text~~`
- **Code**: `` `inline` `` and `code blocks`
- **Subtext**: `-# smaller gray text`
- **Links**: Automatic URL detection
- **Mentions**: `@user`, `#channel`, `@role`
- **Emojis**: Unicode and custom Discord emojis

## Supported Media

- **Direct Images**: PNG, JPG, GIF, WebP, SVG
- **Tenor GIFs**: `tenor.com/view/...`
- **Giphy GIFs**: `giphy.com/gifs/...`
- **Imgur Images**: `imgur.com/...`
- **Discord Attachments**: All Discord attachment types
- **Discord Stickers**: Static and animated stickers

## Attachment Layouts

Supports Discord's exact attachment grid layouts:

- 1 image: Single large display
- 2 images: Side by side
- 3 images: 1 large + 2 small stacked
- 4 images: 2x2 grid
- 5 images: 2 top + 3 bottom
- 6 images: 3 top + 3 bottom
- 7 images: 1 wide top + 3+3 rows
- 8 images: 2 top + 3+3 rows
- 9 images: 3x3 grid
- 10+ images: Grid with "+X more" overlay

## Requirements

- Node.js 16+
- Discord.js 14+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
