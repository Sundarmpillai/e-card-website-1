import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Bar, Line, Pie } from "react-chartjs-2";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

function Graphs({ dataList }) {
  const [chartAData, setchartAData] = useState({});
  const [chartBData, setchartBData] = useState({});
  const [noUsers, setNoUsers] = useState([]);
  const [noConn, setNoConn] = useState([]);
  let list = [];
  let users = [];
  let prevData = [];
  let connLength = [];
  let now = new Date();
  let day = now.getDay() === 0 ? 7 : now.getDay();

  const chart = () => {
    dataList &&
      dataList.map((data) => {
        return list.push(data);
      });
    if (list !== undefined) {
      console.log(day, list);
      for (let i = 0; i < day; i++) {
        if (list.length !== 0) {
          connLength.push((list[i].noConn / list[i].noUser).toFixed(2));
          users.push(list[i].noUser);
        }
      }
      if (list[6] !== undefined) {
        for (let j = 0; j < list[6].prevC.length; j++) {
          prevData.push((list[6].prevD[j] / list[6].prevC[j]).toFixed(2));
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
          data: connLength,
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
    };
  } else {
    return { dataList: undefined };
  }
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "Graph" }])
)(Graphs);

// "rgba(255,99,132,0.6",
// "rgba(54,162,235,0.6",
// "rgba(255,206,86,0.6",
// "rgba(75,192,192,0.6",
// "rgba(153,102,255,0.6",
// "rgba(255,159,64,0.6",
// "rgba(255,99,132,0.6",
