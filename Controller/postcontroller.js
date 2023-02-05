const data = [
  {
    id: 1,
    name: "Ayush",
  },
  {
    id: 2,
    name: "Ayush",
  },
  {
    id: 3,
    name: "Ayush",
  },
];

module.exports.getData = (req, res) => {
  return res.status(200).json(data);
};
