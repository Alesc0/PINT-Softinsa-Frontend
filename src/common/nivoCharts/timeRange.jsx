import { ResponsiveTimeRange } from "@nivo/calendar";

const data = [
  {
    value: 149,
    day: "2018-06-13",
  },
  {
    value: 214,
    day: "2018-07-17",
  },
  {
    value: 66,
    day: "2018-05-13",
  },
  {
    value: 337,
    day: "2018-04-25",
  },
  {
    value: 18,
    day: "2018-05-14",
  },
  {
    value: 372,
    day: "2018-04-06",
  },
  {
    value: 50,
    day: "2018-08-10",
  },
  {
    value: 194,
    day: "2018-04-18",
  },
  {
    value: 375,
    day: "2018-04-08",
  },
  {
    value: 55,
    day: "2018-04-10",
  },
  {
    value: 260,
    day: "2018-07-02",
  },
  {
    value: 78,
    day: "2018-07-15",
  },
  {
    value: 266,
    day: "2018-04-30",
  },
  {
    value: 229,
    day: "2018-05-12",
  },
  {
    value: 204,
    day: "2018-05-02",
  },
  {
    value: 56,
    day: "2018-08-02",
  },
  {
    value: 95,
    day: "2018-05-21",
  },
  {
    value: 380,
    day: "2018-05-25",
  },
  {
    value: 152,
    day: "2018-07-04",
  },
  {
    value: 161,
    day: "2018-06-04",
  },
  {
    value: 2,
    day: "2018-06-23",
  },
  {
    value: 176,
    day: "2018-04-19",
  },
  {
    value: 295,
    day: "2018-06-24",
  },
  {
    value: 245,
    day: "2018-07-11",
  },
  {
    value: 187,
    day: "2018-04-07",
  },
  {
    value: 80,
    day: "2018-04-09",
  },
  {
    value: 135,
    day: "2018-05-17",
  },
  {
    value: 189,
    day: "2018-04-20",
  },
  {
    value: 248,
    day: "2018-04-27",
  },
  {
    value: 250,
    day: "2018-08-05",
  },
  {
    value: 51,
    day: "2018-05-26",
  },
  {
    value: 161,
    day: "2018-05-28",
  },
  {
    value: 249,
    day: "2018-08-07",
  },
  {
    value: 103,
    day: "2018-04-02",
  },
  {
    value: 14,
    day: "2018-06-19",
  },
  {
    value: 147,
    day: "2018-08-09",
  },
  {
    value: 264,
    day: "2018-07-03",
  },
  {
    value: 242,
    day: "2018-07-26",
  },
  {
    value: 378,
    day: "2018-07-18",
  },
  {
    value: 359,
    day: "2018-05-04",
  },
  {
    value: 39,
    day: "2018-07-24",
  },
  {
    value: 174,
    day: "2018-05-01",
  },
  {
    value: 363,
    day: "2018-08-01",
  },
  {
    value: 366,
    day: "2018-08-11",
  },
  {
    value: 323,
    day: "2018-05-11",
  },
  {
    value: 220,
    day: "2018-04-21",
  },
  {
    value: 106,
    day: "2018-05-20",
  },
  {
    value: 211,
    day: "2018-08-06",
  },
  {
    value: 148,
    day: "2018-04-16",
  },
  {
    value: 62,
    day: "2018-07-23",
  },
  {
    value: 124,
    day: "2018-08-04",
  },
  {
    value: 121,
    day: "2018-04-17",
  },
  {
    value: 69,
    day: "2018-05-08",
  },
  {
    value: 292,
    day: "2018-07-10",
  },
  {
    value: 387,
    day: "2018-06-30",
  },
  {
    value: 271,
    day: "2018-06-02",
  },
  {
    value: 159,
    day: "2018-06-29",
  },
  {
    value: 141,
    day: "2018-06-21",
  },
  {
    value: 128,
    day: "2018-06-03",
  },
  {
    value: 125,
    day: "2018-07-20",
  },
  {
    value: 106,
    day: "2018-07-31",
  },
  {
    value: 249,
    day: "2018-06-11",
  },
  {
    value: 284,
    day: "2018-06-09",
  },
  {
    value: 293,
    day: "2018-06-07",
  },
  {
    value: 18,
    day: "2018-07-28",
  },
  {
    value: 108,
    day: "2018-07-30",
  },
  {
    value: 344,
    day: "2018-07-08",
  },
  {
    value: 335,
    day: "2018-06-10",
  },
  {
    value: 175,
    day: "2018-05-22",
  },
  {
    value: 194,
    day: "2018-05-30",
  },
  {
    value: 52,
    day: "2018-05-07",
  },
  {
    value: 143,
    day: "2018-05-16",
  },
  {
    value: 103,
    day: "2018-07-25",
  },
  {
    value: 305,
    day: "2018-05-23",
  },
  {
    value: 69,
    day: "2018-06-05",
  },
  {
    value: 363,
    day: "2018-07-07",
  },
  {
    value: 323,
    day: "2018-04-14",
  },
  {
    value: 192,
    day: "2018-07-09",
  },
  {
    value: 352,
    day: "2018-04-05",
  },
  {
    value: 343,
    day: "2018-05-05",
  },
  {
    value: 85,
    day: "2018-07-13",
  },
  {
    value: 206,
    day: "2018-04-23",
  },
  {
    value: 185,
    day: "2018-07-22",
  },
  {
    value: 73,
    day: "2018-07-16",
  },
  {
    value: 7,
    day: "2018-05-29",
  },
  {
    value: 165,
    day: "2018-04-13",
  },
  {
    value: 219,
    day: "2018-07-06",
  },
  {
    value: 202,
    day: "2018-06-27",
  },
  {
    value: 179,
    day: "2018-06-20",
  },
  {
    value: 91,
    day: "2018-04-22",
  },
  {
    value: 230,
    day: "2018-04-11",
  },
  {
    value: 352,
    day: "2018-05-31",
  },
  {
    value: 52,
    day: "2018-06-08",
  },
  {
    value: 95,
    day: "2018-08-08",
  },
  {
    value: 51,
    day: "2018-06-06",
  },
  {
    value: 292,
    day: "2018-05-06",
  },
  {
    value: 259,
    day: "2018-07-12",
  },
  {
    value: 386,
    day: "2018-07-29",
  },
  {
    value: 292,
    day: "2018-04-12",
  },
  {
    value: 17,
    day: "2018-07-14",
  },
  {
    value: 236,
    day: "2018-05-15",
  },
  {
    value: 375,
    day: "2018-06-17",
  },
  {
    value: 343,
    day: "2018-04-04",
  },
  {
    value: 306,
    day: "2018-06-28",
  },
  {
    value: 6,
    day: "2018-07-05",
  },
  {
    value: 235,
    day: "2018-06-16",
  },
];

const MyResponsiveTimeRange = () => (
  <ResponsiveTimeRange
    data={data}
    from="2018-04-01"
    to="2018-08-12"
    emptyColor="#eeeeee"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    margin={{ top: 40 }}
    dayBorderColor="text.primary"
    daySpacing={2}
  />
);
export default MyResponsiveTimeRange;
