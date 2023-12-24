const fs = require("node:fs");

const ContactList = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/contact-list.json`)
);

const UsernameList = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/username-list.json`)
);

exports.AddContact = (username, opts) => {
  const { name, phone } = opts;

  if (UsernameList.includes(username)) {
    console.error("Error: Duplicate username. Must be unique!");
    return;
  }

  UsernameList.push(username);

  fs.writeFileSync(
    `${__dirname}/../dev-data/username-list.json`,
    JSON.stringify(UsernameList)
  );

  ContactList.push({
    username,
    name,
    phone,
  });

  fs.writeFileSync(
    `${__dirname}/../dev-data/contact-list.json`,
    JSON.stringify(ContactList)
  );

  console.log("The new contact has been added...");
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

  fs.writeFileSync(
    `${__dirname}/../dev-data/username-list.json`,
    JSON.stringify(newUsernameList)
  );

  const newContactList = ContactList.filter((contact) => {
    return contact.username !== username;
  });

  fs.writeFileSync(
    `${__dirname}/../dev-data/contact-list.json`,
    JSON.stringify(newContactList)
  );

  console.log(`The contact with username: ${username} has been removed`);
};
