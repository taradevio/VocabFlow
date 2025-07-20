import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export const PieChart = () => {
  const LABELS = [
    "Noun",
    "Verb",
    "Adjective",
    "Adverb",
    "Pronoun",
    "Preposition",
    "Conjunction",
    "Interjection",
  ];

  // create an array of lowercase labels {label: index} => {noun: 0, verb: 1, ...}
  const labelIndex = Object.fromEntries(
    LABELS.map((label, index) => [label.toLowerCase(), index])
  );

  // create a dummy to prefill if user hasn't added any data
  const [partsOfSpeech, setPartsOfSpeech] = useState({
    labels: LABELS,
    data: new Array(LABELS.length).fill(0.01), // dummy init
  });

  const processLocalData = () => {
    const getData = JSON.parse(localStorage.getItem("user") || "[]");

    // add an array to store if user has added any data
    const rawData = new Array(LABELS.length).fill(0); // all categories start from 0
    let hasRealData = false;

    getData.forEach(({ partsOfSpeech = "" }) => {
      partsOfSpeech
      // lowercase the string
        .toLowerCase()
        // it splits and turns into an array
        .split(",")
        // map the array and trim
        .map((part) => part.trim())
        // filter any whitespace
        .filter(Boolean)
        // loop through the array
        .forEach((part) => {
          // get the index of the label => 0, 1, 2, 3, ...
          const index = labelIndex[part];
          // if the index exists, increment the count => [1, 0, 0, 0,...] (array insde rawData which is the partsofspeech)
          if (index !== undefined) {
            rawData[index]++;
            hasRealData = true;
          }
        });
    });

    if (hasRealData) {
      const filtered = rawData
      // map rawdata values and labels. show each count and label that corresponds to that count
        .map((count, i) => ({ count, label: LABELS[i] }))
        // filter only labels with values > 0, meaning show only values higher than 0
        .filter(({ count }) => count > 0);

      setPartsOfSpeech({
        labels: filtered.map((item) => item.label),
        data: filtered.map((item) => item.count),
      });
    } else {
      // fallback dummy mode
      setPartsOfSpeech({
        labels: LABELS,
        data: new Array(LABELS.length).fill(0.01),
      });
    }
  };

  useEffect(() => {
    processLocalData();

    // Poll every second to check if localStorage has changed
    const interval = setInterval(() => {
      processLocalData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // const [partsOfSpeech, setPartsOfSpeech] = useState([]);
  // const LABELS = [
  //   "Noun",
  //   "Verb",
  //   "Adjective",
  //   "Adverb",
  //   "Pronoun",
  //   "Preposition",
  //   "Conjunction",
  //   "Interjection",
  // ];
  // const labelIndex = Object.fromEntries(LABELS.map((label, index) => [label, index]))
  // const data = new Array(8).fill(0.01);

  // useEffect(() => {
  // const getData = JSON.parse(localStorage.getItem("user") || "[]");
  // add object to store label and value
  // const counts = {
  //   Noun: 0,
  //   Verb: 0,
  //   Adjective: 0,
  //   Adverb: 0,
  //   Pronoun: 0,
  //   Preposition: 0,
  //   Conjunction: 0,
  //   Interjection: 0,
  // };

  // get data from partsofspeech inside local
  // getData.forEach(({partsOfSpeech = ""}) => {
  //  partsOfSpeech
  //     .toLowerCase()
  //     .split(",")
  //     .map((part) => part.trim())
  //     .filter(Boolean)
  //     .forEach((part) => {
  //       const index = labelIndex[part]
  //       const key = part.charAt(0).toUpperCase() + part.slice(1);
  //       if (index[key] !== undefined) data[key]++;
  //     });
  // });

  // below will return array of partsofspeech
  // const data = LABELS.map((label) => counts[label] || 0.01);

  // setPartsOfSpeech({ labels: LABELS, data });
  // }, []);

  return (
    <Pie
      data={{
        labels: partsOfSpeech.labels,
        datasets: [
          {
            label: "Total",
            data: partsOfSpeech.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
      options={{
        responsive: true,
      }}
    />
  );
};
