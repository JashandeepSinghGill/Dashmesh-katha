//googleapis
const { google } = require("googleapis");

//client id
const CLIENT_ID =
  "795582226653-snrr6af42538blhsljc70a3a4vk5g20m.apps.googleusercontent.com";

//client secret
const CLIENT_SECRET = "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";

//redirect URL
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

//refresh token
const REFRESH_TOKEN = accessToken;
//"04Nz1HvjurEcFCgYIARAAGAQSNwF-L9IrDwQIciHtyMTqedq7Xgo4-DrRGe8cT7TSoOWFKyfgQVFbW7Mu-SCNM3SKOxyPJIduPek";

//intialize auth client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

//setting our auth credentials
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

//create a public url
async function generatePublicUrl() {
  try {
    const fileId = "10YP59glavFzvkaP6hrXUI_IIGYfmXZnt";
    //change file permisions to public.
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    //obtain the webview and webcontent links
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}
