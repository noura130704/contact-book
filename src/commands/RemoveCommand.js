const { Command } = require("commander");

const removeCommand = new Command("remove");

removeCommand.description("Remove a contact");

module.exports = removeCommand;
