const contactUs = async (name, email, description) => {
  console.log(name, email, description);

  return {
    message: "Your message has been sent successfully",
    statusCode: 200,
  };
};

module.exports = { contactUs };
