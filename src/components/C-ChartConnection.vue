<template>
    <div class="mt-7">
        <canvas id="chartConnection"></canvas>
    </div>
</template>
  
<script setup>
import { socket } from '../services/socket';
import Chart from 'chart.js/auto';
import { onMounted, watch } from "vue"

//   socket.on('documentCount', (count) => {
//     console.log('Número de documentos:', count);
//   });

let data = {
  labels: [], // Etiquetas vacías, puedes agregar etiquetas personalizadas si lo deseas
  datasets: [{
    label: 'Usuarios conectados', // Agrega un nombre al conjunto de datos
    data: [0], // Utilizando 0 como valor inicial
    fill: false,
    borderColor: '#C62828',
    tension: 0.1
  }]
};

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
};

let chartConnection; // Variable para almacenar la instancia de la gráfica

onMounted(() => {
  chartConnection = new Chart(
    document.getElementById('chartConnection'),
    config
  );

  socket.on('userCount', (count) => {
    console.log('Número de usuarios recibido:', count);
    
    // Actualizar los datos del gráfico con el nuevo número de usuarios
    data.labels.push(''); // Agregar una etiqueta vacía para cada actualización de usuario
    data.datasets[0].data.push(count);
    chartConnection.update();
  });
});

</script>
  
<style lang="css" scoped></style>