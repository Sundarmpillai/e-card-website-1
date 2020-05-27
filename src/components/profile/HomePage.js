import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  Typography,
  Card,
  CardContent,
  Paper,
  Container,
} from "@material-ui/core";

function HomePage() {
  return (
    <div style={{ width: "75%", margin: "auto", marginTop: "10px" }}>
      <Paper>
        <Card
          align="center"
          style={{ backgroundColor: "#3949ab", color: "white" }}
        >
          <Typography variant="h3">E-Card Website</Typography>
          <hr />
          <Container
            style={{
              width: "90%",
              padding: "15px",
            }}
          >
            <Typography variant="h6" align="justify">
              This website provides information about the E-Card mobile
              application. The E-Card Mobile application is a digital version of
              a Rolodex, which means the application will contain the user
              information relevent to their respective work. A short instruction
              about the mobile app is provided below.
            </Typography>
          </Container>
        </Card>

        <Card>
          <div>
            <CardContent>
              <Card
                variant="outlined"
                style={{
                  width: "750px",
                  float: "left",
                  marginTop: "50px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="justify">
                    You can login or register in the mobile application using a
                    valid email address and a password. Alternatively you can do
                    the same process through this website too.
                  </Typography>
                </CardContent>
              </Card>
              <img
                alt="login view"
                src="https://firebasestorage.googleapis.com/v0/b/visiting-card-5b274.appspot.com/o/screenshots%2FScreenshot_2020-05-09-10-08-52.png?alt=media&token=2e28ac1a-97e0-4342-8a3e-a9b6b40abe74"
                style={{
                  float: "right",
                  width: "151px",
                  margin: "10px",
                  border: "3px solid transparent",
                  borderColor: "#3949ab",
                  padding: "15px",
                }}
              />
            </CardContent>
          </div>
        </Card>
        <Card
          style={{
            marginTop: "10px",
            backgroundColor: "#3949ab",
            color: "white",
          }}
        >
          <div>
            <CardContent>
              <Card
                variant="outlined"
                style={{
                  width: "750px",
                  float: "right",
                  marginTop: "50px",
                }}
              >
                <CardContent
                  style={{
                    backgroundColor: "#3949ab",
                    color: "white",
                  }}
                >
                  <Typography variant="h6" align="justify">
                    You can Selecet the Card of the contact that you connected
                    by selecting from the list of connection. You can get the
                    Card of a user by scanning their QR code only through the
                    mobile application.
                  </Typography>
                </CardContent>
              </Card>
              <img
                alt="login view"
                src="https://firebasestorage.googleapis.com/v0/b/visiting-card-5b274.appspot.com/o/screenshots%2FScreenshot_2020-05-09-10-08-20.png?alt=media&token=0bbe177e-77e8-44ad-a3a7-41c084e70d12"
                style={{
                  float: "left",
                  width: "151px",
                  margin: "10px",
                  border: "3px solid transparent",
                  borderColor: "white",
                  padding: "15px",
                }}
              />
            </CardContent>
          </div>
        </Card>
        <Card style={{ marginTop: "10px" }}>
          <div>
            <CardContent>
              <Card
                variant="outlined"
                style={{
                  width: "750px",
                  float: "left",
                  marginTop: "50px",
                }}
              >
                <CardContent>
                  <Typography variant="h6" align="justify">
                    After selecting a user from the list you can view their
                    profile. You also will be able to call the user by clicking
                    on of the mobile numbers or you can e-mail them by clicking
                    on the email address
                  </Typography>
                </CardContent>
              </Card>
              <img
                alt="login view"
                src="https://firebasestorage.googleapis.com/v0/b/visiting-card-5b274.appspot.com/o/screenshots%2FScreenshot_2020-05-09-10-08-33.png?alt=media&token=4eb0a49e-e4ae-4add-b34e-1c91b8e46443"
                style={{
                  float: "right",
                  width: "151px",
                  margin: "10px",
                  border: "3px solid transparent",
                  borderColor: "#3949ab",
                  padding: "15px",
                }}
              />
            </CardContent>
          </div>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4">Contact Us</Typography>
          </CardContent>
        </Card>
      </Paper>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     authError: state.auth.authError,
//     auth: state.firebase.auth,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (creds) => dispatch(login(creds)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default HomePage;
