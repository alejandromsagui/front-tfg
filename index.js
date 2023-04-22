import express from 'express';
const app = express()

// Sirve los archivos de la carpeta `dist`
app.use(express.static('dist'))

// Redirige todas las rutas a `index.html`, para que Vue Router maneje la navegación
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})