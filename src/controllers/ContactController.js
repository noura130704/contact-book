const fs = require("node:fs");
const crypto = require("node:crypto");

const Table = require("cli-table3");

const contactPath = `${__dirname}/../dev-data/contact-list.json`;
const usernamePath = `${__dirname}/../dev-data/username-list.json`;

let ContactList = JSON.parse(fs.readFileSync(contactPath));
let UsernameList = JSON.parse(fs.readFileSync(usernamePath));

const saveContact = () => {
  const space = 2;

  fs.writeFileSync(usernamePath, JSON.stringify(UsernameList, null, space));
  fs.writeFileSync(contactPath, JSON.stringify(ContactList, null, space));
};

exports.AddContact = (username, opts) => {
  if (UsernameList.includes(username)) {
    console.error("Error: Duplicate username. Must be unique!");
    return;
  }

  const { name, phone } = opts;

  UsernameList.push(username);
  ContactList.push({
    id: crypto.randomUUID(),
    username,
    name,
    phone,
  });

  saveContact();
  console.log("The new contact has been added");
};

exports.ListContacts = () => {
  const contacts = ContactList.map((contact) => {
    return [contact.id, contact.username, contact.name, contact.phone];
  });

  const table = new Table({
    head: ["id", "username", "name", "phone"],
    colAligns: ["center", "center", "center", "center"],
  });

  table.push(...contacts);

  console.log(table.toString());
};

exports.RemoveContact = (username) => {
  if (!UsernameList.includes(username)) {
    console.error("Error: Contact doesn't exist");
    return;
  }

  const newUsernameList = UsernameList.filter((usrname) => {
    return usrname !== username;
  });

  const newContactList = ContactList.filter((contact) => {
    return contact.username !== username;
  });

  UsernameList = newUsernameList;
  ContactList = newContactList;

  saveContact();
  console.log(`The contact with username: ${username} has been removed`);
};

exports.SearchContact = (username) => {
  if (!UsernameList.includes(username)) {
    console.error("Error: Contact doesn't exist");
    return;
  }

  const contact = ContactList.filter((contact) => {
    return contact.username === username;
  });

  const table = new Table({
    head: ["id", "username", "name", "phone"],
    colAligns: ["center", "center", "center", "center"],
  });

  table.push(
    ...contact.map((contact) => {
      return [contact.id, contact.username, contact.name, contact.phone];
    })
  );

  console.log(table.toString());
};
