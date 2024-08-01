// controllers/roomController.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const roomsFilePath = path.join(__dirname, './rooms.json');

const readRoomsFromFile = () => {
  return JSON.parse(fs.readFileSync(roomsFilePath, 'utf8'));
};

const writeRoomsToFile = (rooms) => {
  fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
};

exports.getRooms = (req, res) => {
  const rooms = readRoomsFromFile();
  res.json(rooms);
};

exports.createRoom = (req, res) => {
  const newRoom = { ...req.body, roomId: uuidv4() };
  const rooms = readRoomsFromFile();
  rooms.push(newRoom);
  writeRoomsToFile(rooms);
  res.status(201).json(newRoom);
};

exports.updateRoom = (req, res) => {
  const { roomId } = req.params;
  const rooms = readRoomsFromFile();
  const index = rooms.findIndex((room) => room.roomId === roomId);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...req.body };
    writeRoomsToFile(rooms);
    res.json(rooms[index]);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
};

exports.deleteRoom = (req, res) => {
  const { roomId } = req.params;
  const rooms = readRoomsFromFile();
  const index = rooms.findIndex((room) => room.roomId === roomId);
  if (index !== -1) {
    rooms.splice(index, 1);
    writeRoomsToFile(rooms);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Room not found' });
  }
};
