// controllers/customerController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const customersFilePath = path.join(__dirname, '../customers.json');

const readCustomersFromFile = () => {
  return JSON.parse(fs.readFileSync(customersFilePath, 'utf8'));
};

const writeCustomersToFile = (customers) => {
  fs.writeFileSync(customersFilePath, JSON.stringify(customers, null, 2));
};

exports.getCustomers = (req, res) => {
  const customers = readCustomersFromFile();
  res.json(customers);
};

exports.createCustomer = (req, res) => {
  const newCustomer = { ...req.body, customerId: uuidv4() };
  const customers = readCustomersFromFile();
  customers.push(newCustomer);
  writeCustomersToFile(customers);
  res.status(201).json(newCustomer);
};

exports.updateCustomer = (req, res) => {
  const { customerId } = req.params;
  const customers = readCustomersFromFile();
  const index = customers.findIndex((customer) => customer.customerId === customerId);
  if (index !== -1) {
    customers[index] = { ...customers[index], ...req.body };
    writeCustomersToFile(customers);
    res.json(customers[index]);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
};

exports.deleteCustomer = (req, res) => {
  const { customerId } = req.params;
  const customers = readCustomersFromFile();
  const index = customers.findIndex((customer) => customer.customerId === customerId);
  if (index !== -1) {
    customers.splice(index, 1);
    writeCustomersToFile(customers);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
};
