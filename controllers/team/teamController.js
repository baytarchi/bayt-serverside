const teamService = require("../../services/team/teamService");
const PhotoService = require("../../helper/image/single-image-service");

const addTeamMember = async (req, res) => {
  const { member_name } = req.body;

  console.log(member_name, "asdasdsad");

  if (!member_name) {
    return res.status(400).json({
      message: "Please provide the member name",
    });
  }

  const photoService = new PhotoService(req.file);
  let member_photo;

  await photoService
    .upload()
    .then((link) => {
      member_photo = link;
    })
    .catch((error) => {
      console.error("Error uploading photo:", error);
    });

  console.log(member_photo);

  const member_data = {
    member_name,
    member_image: member_photo,
  };

  const { message, statusCode } = await teamService.addTeamMember(member_data);

  res.status(statusCode).json({
    message,
  });
};

// const updateTeamMember = async (req, res) => {
//   const { category_name } = req.body;
//   const { category_id } = req.params;

//   if (!category_id) {
//     return res.status(400).json({
//       message: "Please provide a category",
//     });
//   }

//   if (!category_name) {
//     return res.status(400).json({
//       message: "Please provide the updated category name",
//     });
//   }

//   const { message, statusCode } = await categoryService.updateCategory(
//     category_id,
//     category_name
//   );

//   res.status(statusCode).json({
//     message,
//   });
// };

// const getTeamMembers = async (req, res) => {
//   const { message, categories, statusCode } =
//     await categoryService.getCategories();

//   res.status(statusCode).json({
//     message,
//     categories,
//   });
// };

// const deleteTeamMember = async (req, res) => {
//   const { category_id } = req.params;

//   if (!category_id) {
//     return res.status(400).json({
//       message: "Please provide a category",
//     });
//   }

//   const { message, statusCode } = await categoryService.deleteCategory(
//     category_id
//   );

//   res.status(statusCode).json({
//     message,
//   });
// };

module.exports = {
  addTeamMember,
};
