const chatbot = require("../chatbot/chatbot");

const generateRandomDate = () => {
  const today = new Date();
  const randomDays = Math.floor(Math.random() * 30);
  today.setDate(today.getDate() + randomDays);
  return today;
};

module.exports = (app) => {
  app.post("/text_query", async (req, res) => {
    const { text, date } = req.body; // get date from request body
    const resultQuery = await chatbot.textQuery(text);
    console.log(resultQuery);

    if (resultQuery && Array.isArray(resultQuery) && resultQuery[0]) {
      const message = resultQuery[0].queryResult.fulfillmentText;

      const randomDate = generateRandomDate();
      const formattedDate = randomDate.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const formattedTime = randomDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messageWithDate = `${message}: ${formattedDate} : ${formattedTime}`;
      res.send({ message: messageWithDate });
    } else {
      res.status(500).send({ error: "Unexpected server error" });
    }
  });
};
