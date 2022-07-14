const express = require("express");
const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config();
const app = express();
app.use(express.json());

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const SCOPE = [
  "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file",
];

// app.get("/api/google-drive", async (req, res) => {
//   const REFRESH_TOKEN =
//     "04Nz1HvjurEcFCgYIARAAGAQSNwF-L9IrDwQIciHtyMTqedq7Xgo4-DrRGe8cT7TSoOWFKyfgQVFbW7Mu-SCNM3SKOxyPJIduPek";

//   //setting our auth credentials
//   oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//   const drive = google.drive({
//     version: "v3",
//     auth: oauth2Client,
//   });
//   if (drive) {
//     const fileId = "0BzJfymOaCY7HRFJ6emJQbHlsbVhMT1ZTNGxDMEloM1Voa0pR";

//     // await drive.permissions.create({
//     //   fileId: fileId,
//     //   requestBody: {
//     //     role: "reader",
//     //     type: "anyone",
//     //   },
//     // });

//     // //obtain the webview and webcontent links
//     // const result = await drive.files.get({
//     //   fileId: fileId,
//     //   fields: "webViewLink, webContentLink",
//     // });
//     // console.log(links);
//     // const links = result.data;
//     // ---------------------
//     //     const file = await drive.files.get({
//     //       fileId: fileId,
//     //       alt: "media",
//     //     });
//     //     console.log(file.status);

//     //     res.body(file);
//     //     if (links) {
//     //     } else {
//     //       console.log("drive error");
//     //     }
//     //   } else {
//     //     console.log("auth error");
//     const authUrl = oauth2Client.generateAuthUrl({
//       access_type: "offline",
//       scope: "https://www.googleapis.com/auth/drive",
//     });
//     console.log(authUrl);
//     return res.send(authUrl);
//   }
// });

app.get("/getAuthURL", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPE,
  });
  console.log(authUrl);
  return res.send(authUrl);
});

app.post("/getToken", (req, res) => {
  if (req.body.code == null) return res.status(400).send("Invalid Request");
  oauth2Client.getToken(req.body.code, (err, token) => {
    if (err) {
      console.error("Error retrieving access token", err);
      return res.status(400).send("Error retrieving access token");
    }
    res.send(token);
  });
});

app.post("/getUserInfo", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oauth2Client.setCredentials(req.body.token);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });

  oauth2.userinfo.get((err, response) => {
    if (err) res.status(400).send(err);
    console.log(response.data);
    res.send(response.data);
  });
});

app.post("/readDrive/", (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oauth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  var fileId = req.params.id;
  drive.files.list(
    {
      fields: "files/webViewLink",
      pageSize: 100,
    },
    (err, response) => {
      if (err) {
        console.log("The API returned an error: " + err);
        return res.status(400).send(err);
      }
      const files = response.data.files;
      if (files.length) {
        console.log("Files:");
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log("No files found.");
      }
      res.send(files);
    }
  );
});

app.post("/readDriveFolder/:id", (req, res) => {
  const folderId = req.params.id;
  const folderName = "Katha";
  if (req.body.token == null) return res.status(400).send("Token not found");
  oauth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  var query = "'" + folderId + "' in parents";
  drive.files.list(
    {
      q: query,
      //fields: "files(id, name)",
    },
    function (error, response) {
      if (error) {
        return console.log("ERROR", error);
      }

      // response.data.files.forEach(function (item) {
      //   var file = fs.createWriteStream("./" + folderName + "/" + item.name);
      //   file.on("finish", function () {
      //     console.log("downloaded", item.name);
      //   });
      // });
    }
  );
});

app.post("/download/:id", async (req, res) => {
  if (req.body.token == null) return res.status(400).send("Token not found");
  oauth2Client.setCredentials(req.body.token);
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  var fileId = req.params.id;
  `$ gcloud auth application-default login`;
  const file = await drive.files.get({
    fileId: fileId,
    alt: "media",
  });
  console.log(file.status);
  return file.status;
  //drive.files.get({ fileId: fileId, alt: "media" }, { responseType: "stream" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});
