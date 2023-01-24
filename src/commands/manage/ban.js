const { EmbedBuilder, SlashCommandSubcommandBuilder } = require("discord.js");
const { OWNER, ADMIN } = require("../../../config.json");
const { getColor } = require("../../utils/misc");

module.exports = class Ban {
  constructor() {
    this.data = new SlashCommandSubcommandBuilder()
      .setName("ban")
      .setDescription("Bans a user.")
      .addUserOption(user => user
        .setName("user")
        .setDescription("The user you want to ban.")
        .setRequired(true)
      )
      .addStringOption(string => string
        .setName("reason")
        .setDescription("The reason of banning.")
        .setRequired(false)
      );
  }

  async run(interaction) {
    let errorEmbed = new EmbedBuilder().setColor(getColor(0));
    if (interaction.user.id !== OWNER && !ADMIN.includes(interaction.user.id)) {
      errorEmbed.setTitle("You don't have the permission to execute this command");
      return interaction.editReply({ embeds: [errorEmbed] });
    }

    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    const channel = interaction.client.channels.cache.get("979337971159420928");
    const member = interaction.member;
    const everyone = member.guild.roles.everyone;
    const allMembers = await member.guild.members.fetch();
    const allRoles = await member.guild.roles.fetch();
    const selectedMember = allMembers.filter(m => m.user.id === user.id).get(user.id);
    const yes = allRoles.filter(r => r !== everyone && selectedMember._roles.includes(r.id)).sort((a, b) => Math.max([a[1].rawPosition, b[1].rawPosition]));

    const embed = new EmbedBuilder()
      .setTitle(`Banned ${selectedMember.nickname == null ? user.username : selectedMember.nickname}`)
      .addFields({ name: "🔨 • Moderator", value: `${member.nickname == null ? member.user.username : member.nickname}` })
      .setFooter({ text: `User ID: ${user.id}` })
      .setColor(getColor(100));

    if (reason) embed.addFields({ name: "🖊️ • Reason", value: `${reason}` });

    if (selectedMember === member) {
      errorEmbed.setTitle("You can't ban yourself")
      return interaction.editReply({ embeds: [errorEmbed] });
    }

    if (selectedMember.user.bot === true) {
      errorEmbed.setTitle("You can't ban a bot")
      return interaction.editReply({ embeds: [errorEmbed] });
    }

    if (null) {
      errorEmbed.setTitle("The bot doesn't have the needed permissions or its role is lower than the user's")
      return interaction.editReply({ embeds: [errorEmbed] });
    }

    // selectedMember.ban();
    interaction.editReply({ embeds: [embed] });
    channel.send({ embeds: [embed] });
  }
}