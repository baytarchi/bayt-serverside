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

module.exports = {
  addTeamMember,
};
