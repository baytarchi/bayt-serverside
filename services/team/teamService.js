const Team = require("../../models/team");
const { statusCodes } = require("../../config");

const addTeamMember = async (member_data) => {
  const team = new Team({
    ...member_data,
  });

  team.save();

  return {
    message: "Team Member Added Successfully",
    statusCode: statusCodes.SUCCESSFUL.CREATED,
  };
};

const getTeamMembers = async () => {
  const team_members = await Team.find({});

  return {
    message: "Team Member Featched Successfully",
    team_members,
    statusCode: statusCodes.SUCCESSFUL.SUCCESS,
  };
};

module.exports = {
  addTeamMember,
  getTeamMembers,
};
