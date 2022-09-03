const { EmbedBuilder } = require("discord.js");
const { r } = require("../../index");

module.exports = {
  name: "meme",
  description: "Sends a funny meme.",
  callback: interaction => {
    r.getSubreddit("cleanmemes").getRandomSubmission({ time: "all" }).then((submission) => {
      const thumbnail = submission.url;
      const upvotes = submission.ups;
      
      let embed = new EmbedBuilder()
        .setTitle(`${submission.title}`)
        .setFooter({ text: `Powered by snoowrap. | Upvotes: ${upvotes}` })
        .setColor("Blue");
      
      if (upvotes === null) embed.setFooter({ text: "Powered by snoowrap. | Upvotes: 0" });

      if (thumbnail === "self") embed
        .setDescription("The post had no image, sorry.")
        .setColor("Red");
      
      if (thumbnail !== "self") embed.setImage(`${thumbnail}`);
  
      interaction.reply({ embeds: [embed] });
    })
  }
}
