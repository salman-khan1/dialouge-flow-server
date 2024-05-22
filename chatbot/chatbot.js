const dialogflow = require("dialogflow");
const config = require("../config/config");
const uuid = require("uuid");

const privateKey = config.googlePrivateKey;
const projectId = config.googleProjectID;
const sessionId = uuid.v4();
const credts = {
  client_email: config.googleClientEmail,
  private_key: privateKey,
};

const sessionClient = new dialogflow.SessionsClient({ projectId, credts });

const textQuery = async (text) => {
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };
  try {
    const response = await sessionClient.detectIntent(request);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  textQuery,
};
