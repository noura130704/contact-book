const { Command } = require("commander");

const ContactController = require("../controllers/ContactController");

const removeCommand = new Command("remove");

removeCommand
  .description("Remove a contact")
  .argument("<username>", "A contact username to be removed")
  .action((username) => {
    ContactController.RemoveContact(username);
  });

module.exports = removeCommand;
