const commander = require("commander");
const { Command } = commander;

const addCommand = require("./src/commands/AddCommand");
const removeCommand = require("./src/commands/RemoveCommand");
const listCommand = require("./src/commands/ListCommand");

const program = new Command();

program
  .name("contact")
  .description("A Contact Book application for managing contacts")
  .version("0.1.0");

program.addCommand(addCommand);
program.addCommand(removeCommand);
program.addCommand(listCommand);

program.parse();