const teamService = require("../../services/team/teamService");
const PhotoService = require("../../helper/image/single-image-service");

const addTeamMember = async (req, res) => {
  const { member_name, position, isWorker } = req.body;

  if (!member_name || !position || !isWorker) {
    return res.status(400).json({
      message: "Please provide the required information",
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

  const member_data = {
    member_name,
    position,
    isWorker: isWorker == "true" ? true : false,
    member_image: member_photo,
  };

  const { message, statusCode } = await teamService.addTeamMember(member_data);

  res.status(statusCode).json({
    message,
  });
};

const getTeamMembers = async (req, res) => {
  const { message, team_members, statusCode } =
    await teamService.getTeamMembers();

  res.status(statusCode).json({
    message,
    team_members,
  });
};

const updateTeamMember = async (req, res) => {
  const { team_member_id } = req.params;
  const { member_name, position, isWorker, member_image_link } = req.body;

  console.log(req.file, "member_image_link");

  if (!member_name || !position || !isWorker) {
    return res.status(400).json({
      message: "Please provide the required information",
    });
  }

  let member_photo;

  if (member_image_link) {
    member_photo = member_image_link;
  } else {
    const photoService = new PhotoService(req.file);
    await photoService
      .upload()
      .then((link) => {
        member_photo = link;
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
      });
  }

  const member_data = {
    member_name,
    position,
    isWorker: isWorker == "true" ? true : false,
    member_image: member_photo,
  };

  const { message, statusCode } = await teamService.updateTeamMember(
    team_member_id,
    member_data
  );

  res.status(statusCode).json({
    message,
  });
};

const deleteTeamMember = async (req, res) => {
  const { team_member_id } = req.params;

  if (!team_member_id) {
    return res.status(400).json({
      message: "Please provide a team member id",
    });
  }

  const { message, statusCode } = await teamService.deleteTeamMember(
    team_member_id
  );

  res.status(statusCode).json({
    message,
  });
};

module.exports = {
  addTeamMember,
  getTeamMembers,
  deleteTeamMember,
  updateTeamMember,
};
