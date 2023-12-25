const { Command } = require("commander");

const ContactController = require("../controllers/ContactController");

const searchCommand = new Command("search");

searchCommand
  .description("Search for a contact")
  .argument("<username>")
  .action((username) => {
    ContactController.SearchContact(username);
  });

module.exports = searchCommand;
