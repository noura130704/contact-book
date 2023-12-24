const { Command } = require("commander");

const ContactController = require("../controllers/ContactController");

const listCommand = new Command("list");

listCommand.description("List all contacts").action(() => {
  ContactController.ListContacts();
});

module.exports = listCommand;
