// controllers/stayController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const staysFilePath = path.join(__dirname, '../data/stays.json');

const readStaysFromFile = () => {
  return JSON.parse(fs.readFileSync(staysFilePath, 'utf8'));
};

const writeStaysToFile = (stays) => {
  fs.writeFileSync(staysFilePath, JSON.stringify(stays, null, 2));
};

exports.getStays = (req, res) => {
  const stays = readStaysFromFile();
  res.json(stays);
};

exports.createStay = (req, res) => {
  const newStay = { ...req.body, roomId: uuidv4() };
  const stays = readStaysFromFile();
  stays.push(newStay);
  writeStaysToFile(stays);
  res.status(201).json(newStay);
};

exports.updateStay = (req, res) => {
  const { roomId } = req.params;
  const stays = readStaysFromFile();
  const index = stays.findIndex((stay) => stay.roomId === roomId);
  if (index !== -1) {
    stays[index] = { ...stays[index], ...req.body };
    writeStaysToFile(stays);
    res.json(stays[index]);
  } else {
    res.status(404).json({ message: 'Stay not found' });
  }
};

exports.deleteStay = (req, res) => {
  const { roomId } = req.params;
  const stays = readStaysFromFile();
  const index = stays.findIndex((stay) => stay.roomId === roomId);
  if (index !== -1) {
    stays.splice(index, 1);
    writeStaysToFile(stays);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Stay not found' });
  }
};
