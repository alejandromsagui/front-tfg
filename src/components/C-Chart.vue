<template>
  <div class="mt-7">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import { userData } from "../stores/userData"
import { onBeforeMount, onMounted, ref, watch } from "vue"

const count = ref(0)
const useUserData = userData()

const labels = [
  'Marzo',
  'Abril',
  'Mayo',
  'Junio'
]

const data = {
  labels: labels,
  datasets: [{
    label: '', // Eliminado el valor del label
    data: [1, 5, 6, count.value],
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

const countRef = ref(useUserData.numRegister)

const getData = () => {
  data.datasets[0].data = [1, 5, 6, count.value]
}

onBeforeMount(async () => {
  await useUserData.getRegisters()
  count.value = useUserData.numRegister
  getData()

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  )
})

watch(countRef, () => {
  count.value = countRef.value
  getData()
})
</script>
