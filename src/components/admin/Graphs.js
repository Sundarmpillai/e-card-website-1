import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Bar, Line } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import MinimizeIcon from "@material-ui/icons/Minimize";

function Graphs(props) {
  const [chartAData, setchartAData] = useState({});
  const [chartBData, setchartBData] = useState({});
  const [noUsers, setNoUsers] = useState([]);
  const [prevUser, setPrevUser] = useState([]);
  const [prevConn, setPrevConn] = useState([]);
  const [noConn, setNoConn] = useState([]);
  let list = [];
  let users = [];
  let prevData = [];
  let conn = [];
  let usageRate = [];
  let prevUsersList = [];
  let prevConnList = [];
  let userPrev = [];
  let now = new Date();
  let day = now.getDay() === 0 ? 7 : now.getDay();

  const { dataList, auth } = props;
  const chart = () => {
    dataList &&
      dataList.map((data) => {
        return list.push(data);
      });
    if (list !== undefined) {
      console.log(day, list);
      for (let i = 0; i < day; i++) {
        if (list.length !== 0) {
          usageRate.push((list[i].noConn / list[i].noUser).toFixed(2));
          users.push(list[i].noUser);
          conn.push(list[i].noConn);
        }
      }
      setNoUsers(users[day - 1]);
      setNoConn(conn[day - 1]);
      if (list[6] !== undefined) {
        for (let j = 0; j < list[6].prevC.length; j++) {
          prevData.push((list[6].prevD[j] / list[6].prevC[j]).toFixed(2));
          userPrev.push(list[6].prevD[j]);
        }
        if (day === 1) {
          setPrevUser(list[6].prevD[6]);
          setPrevConn(list[6].prevC[6]);
        } else {
          setPrevUser(users[day - 2]);
          setPrevConn(conn[day - 2]);
        }
      }
    }
    setchartAData({
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Current Week Density",
          data: usageRate,
          borderColor: ["rgba(54,162,235,0.6"],
          borderWidth: 4,
          fill: false,
          pointBackgroundColor: "rgba(54,162,235,0.6)",
          pointBorderWidth: "20px",
          pointRadius: 5,
          hoverBackgroundColor: "grey",
        },
        {
          label: "Previous Week Density",
          data: prevData,
          borderColor: ["rgba(255,99,132,0.6)"],
          borderWidth: 4,
          fill: false,
          pointBackgroundColor: "rgba(255,99,132,0.6)",
          pointBorderWidth: "20px",
          pointRadius: 5,
          hoverBackgroundColor: "grey",
        },
      ],
    });

    setchartBData({
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "Current Week Users",
          data: users,
          backgroundColor: [
            "rgba(255,99,132,0.6",
            "rgba(54,162,235,0.6",
            "rgba(255,206,86,0.6",
            "rgba(75,192,192,0.6",
            "rgba(153,102,255,0.6",
            "rgba(255,159,64,0.6",
            "rgba(255,99,132,0.6",
          ],
          borderColor: [
            "rgba(255,99,132,0.6",
            "rgba(54,162,235,0.6",
            "rgba(255,206,86,0.6",
            "rgba(75,192,192,0.6",
            "rgba(153,102,255,0.6",
            "rgba(255,159,64,0.6",
            "rgba(255,99,132,0.6",
          ],
          borderWidth: 2,
          pointBackgroundColor: "rgba(54,162,235,0.6)",
          pointBorderWidth: "20px",
          hoverBackgroundColor: "grey",
        },
      ],
    });
  };
  useEffect(() => {
    chart();
  }, [dataList]);

  function checkStatusOfUsers() {
    if (noConn !== undefined) {
      if (noUsers < prevUser) {
        return (
          <Typography>
            Number of Users :{noUsers}
            <ArrowDownwardIcon style={{ color: "#b71c1c" }} />
          </Typography>
        );
      } else if (noUsers > prevUser) {
        return (
          <Typography>
            Number of Users :{noUsers}
            <ArrowUpwardIcon style={{ color: "#00c853" }} />
          </Typography>
        );
      } else {
        return (
          <Typography variant="h6">
            Number of Users :{noUsers}
            <MinimizeIcon style={{ color: "#212121" }} />
          </Typography>
        );
      }
    }
  }

  function checkStatusOfConnection() {
    console.log(noConn, prevConn);
    if (noConn !== undefined) {
      if (noConn < prevConn) {
        return (
          <Typography variant="h6">
            Number of Connections :{noConn}
            <ArrowDownwardIcon style={{ color: "#b71c1c" }} />
          </Typography>
        );
      } else if (noConn > prevConn) {
        return (
          <Typography variant="h6">
            Number of Connections :{noConn}
            <ArrowUpwardIcon style={{ color: "#00c853" }} />
          </Typography>
        );
      } else {
        return (
          <Typography variant="h6">
            Number of Connections :{noConn}
            <MinimizeIcon style={{ color: "#212121" }} />
          </Typography>
        );
      }
    }
  }
  if (auth.isEmpty) return <Redirect to="/login" />;

  return (
    <div
      style={{
        position: "relative",
        width: "800px",
        height: "600px",
        margin: "auto",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Line
            type={"line"}
            data={chartAData}
            options={{
              responsive: true,
              title: { text: "Mobile Usage", display: true, fontSize: 25 },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
              },
              tooltips: {
                enabled: true,
              },
            }}
          />
          <Card>
            <CardContent>
              <div style={{ margin: "auto" }}>
                <Typography align="center" variant="h4">
                  Status
                </Typography>
              </div>
              <div>
                {checkStatusOfUsers()}
                {checkStatusOfConnection()}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Bar
            type={"bar"}
            data={chartBData}
            options={{
              responsive: true,
              title: { text: "Number of Users", display: true, fontSize: 25 },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
              },
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  let list = state.firestore.ordered.Graph;
  if (list !== undefined) {
    return {
      dataList: list,
      auth: state.firebase.auth,
    };
  } else {
    return { dataList: undefined, auth: state.firebase.auth };
  }
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Graph" }])
)(Graphs);
