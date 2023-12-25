const fs = require("node:fs");
const crypto = require("node:crypto");

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
  console.log(ContactList);
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

  console.log(contact[0]);
};
