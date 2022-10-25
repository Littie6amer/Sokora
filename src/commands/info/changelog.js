const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { getColor } = require("../../utils/getColors");

module.exports = {
  data: [(
    new SlashCommandBuilder()
      .setName("changelog")
      .setDescription("Shows the changelog for the latest update.")
  )],

  callback(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Changelog for v0.1")
      .addFields(
        { name: "Added:", value: "**Commands**: /changelog, /credits, /echo, /serverinfo" },
        { name: "Work in progress:", value: "**Commands**: /graph, /userinfo, /rps, /clear, /kick, /warn, /ban, /cat, /dog, /meme, /help" },
        {
          name: "Changed:",
          value: [
            "**Commands**: /about",
            "**Version number**: Rounded to 0.1",
            "**Embed color**: Fixed, slightly random."
          ].join("\n")
        },
        { name: "Removed:", value: "**Commands**: /embed, /idiot, /kill, /motivate" },
        { name: "Note:", value: "Normal commands are now removed." }
      )
      .setColor(getColor(200));

    interaction.reply({ embeds: [embed] });
  }
}
