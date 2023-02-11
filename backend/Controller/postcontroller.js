const post = [
  {
    id: 1,
    name: "Ayush",
    description:
      " I  am the person who love to cooking and doing all the things that are in the field of what important",
  },
];

module.exports.getAllPost = (req, res) => {
  console.log(req.userId);
  return res.status(200).json(post);
};
