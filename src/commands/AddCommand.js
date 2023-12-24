const { Command } = require("commander");

const ContactController = require("../controllers/ContactController");

const addCommand = new Command("add");

addCommand
  .description("Add a new contact")
  .argument("<username>", "A unique name for the contact")
  .requiredOption("--name <name>", "A name for the contact")
  .requiredOption("--phone <phone>", "A phone number for the contact")
  .action((username, opts) => {
    ContactController.AddContact(username, opts);
  });

module.exports = addCommand;
