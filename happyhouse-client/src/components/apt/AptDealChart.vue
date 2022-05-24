<template>
  <LineChartGenerator
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { mapState } from "vuex";
const mapStore = "mapStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  computed: {
    ...mapState(mapStore, ["selectHouse"]),
  },
  components: {
    LineChartGenerator,
  },
  props: {
    area: {
      type: Number,
    },
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    makeChart() {
      var info = this.selectHouse.houseDeals.filter(
        (v) => Math.round(v.area / 3.3) === this.area
      );
      info = info.map((obj) => ({
        ...obj,
        date: new Date(obj.dealYear + "-" + obj.dealMonth + "-" + obj.dealDay),
      }));
      this.chartData.datasets[0].data = info.map(({ dealAmount }) =>
        parseInt(dealAmount.replaceAll(",", ""))
      );
      this.chartData.datasets[0].label = this.area + "평";
      this.chartData.labels = info.map(({ date }) =>
        date.toISOString().slice(0, 10)
      );
    },
  },
  created() {
    this.makeChart();
  },
  watch: {
    area() {
      this.makeChart();
    },
  },
  data() {
    return {
      labels: [],
      data: [],
      housedeals: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              // "rgba(54, 162, 235, 0.2)",
              // "rgba(255, 206, 86, 0.2)",
              // "rgba(75, 192, 192, 0.2)",
              // "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              // "rgba(54, 162, 235, 1)",
              // "rgba(255, 206, 86, 1)",
              // "rgba(75, 192, 192, 1)",
              // "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
            lineTension: 0.4,
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
