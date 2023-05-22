<template>
  <div class="mt-7">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import { socket } from '../services/socket';
import Chart from 'chart.js/auto';
import { onMounted } from "vue"

socket.on('documentCount', (count) => {
  console.log('Número de documentos:', count);
  // Actualiza la información en tu interfaz de usuario con el nuevo recuento de documentos
});
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June'
]

const data = {
  labels: labels,
  datasets: [{
    label: '', // Eliminado el valor del label
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: '#C62828',
    tension: 0.1
  }]
}

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      legend: {
        display: false // Ocultar la leyenda
      }
    }
  }
}

//Lo del legend para poner lo de display a false:

// var myChart = new Chart(ctx, {
//    type: 'line',
//    data: {
//       labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4'],
//       datasets: [{
//          labels: "This will be hide",
//          data: [20, 50, 40, 30],
//          backgroundColor: ["red", "blue", "orange", "green"]
//       }]
//    },
//    options: {
//       legend: {
//          display: false //This will do the task
//       }
//    }
// });
onMounted(() => {
  const myChart = new Chart(
  document.getElementById('myChart'),
  config
)
})


</script>

<style lang="css" scoped>

</style>