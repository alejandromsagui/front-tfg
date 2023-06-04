<template>
      <v-card elevation="10" class="mx-auto" max-width="700" min-width="auto" mt->
  <div v-if="videogameStore.loading" class="d-flex justify-center align-center" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
    <half-circle-spinner :animation-duration="1000" :size="60" color="#D50000"></half-circle-spinner>
  </div>
  <v-row align="center">
  <v-col cols="12" md="12" sm="12" class="d-flex align-center">
    <v-sheet class="bg-red-darken-3 d-flex justify-center" width="70" height="70" style="align-items: center;" rounded elevation="10">
      <i class="fa-solid fa-gamepad fa-xl"></i>
    </v-sheet>
    <v-card-title class="font-italic text-start ml-3">Videojuegos subidos</v-card-title>
  </v-col>
</v-row>
<v-row>
  <v-col cols="12" md="12" sm="12" xs="12">
    <v-table>
      <thead>
        <tr>
          <th class="text-left text-white">Título</th>
          <th class="text-left text-white">Estado</th>
          <th class="text-left text-white">Modificar estado</th>
          <th class="text-left text-white">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup name="list">
          <tr v-for="(videogame, index) in datosPaginados" :key="index">
            <td :class="{ 'disabled': videogame.status === 'Vendido' }">{{ videogame.name }}</td>
            <td :class="{ 'disabled': videogame.status === 'Vendido' }">{{ videogame.status === '' ? 'En venta' :
              videogame.status }}</td>
            <td>
              <v-select variant="underlined" :items="getSelectItems(videogame.status)" flat
                :disabled="videogame.status === 'Vendido'" v-model="selectedStates[videogame._id]"></v-select>
            </td>
            <td>
              <v-tooltip text="Editar">
                <template v-slot:activator="{ props }">
                  <span v-if="videogame.status !== 'Vendido'" v-bind="props" @click="verJuego(videogame)">
                    <i class="fa-solid fa-pen-to-square text-blue-accent-4 icons fa-lg"></i>
                  </span>
                </template>
              </v-tooltip>

              <v-tooltip text="Guardar">
                <template v-slot:activator="{ props }">
                  <span v-if="videogame.status !== 'Vendido'" v-bind="props"
                    @click="updateState(videogame._id, selectedStates[videogame._id])">
                    <i class="fas fa-check-circle fa-lg ml-3 text-green icons"></i>
                  </span>
                </template>
              </v-tooltip>

              <i v-if="videogame.status !== 'Vendido'" class="fa-solid fa-trash fa-lg ml-4 text-red icons"
                @click="deleteGame = true; deleteJuego(videogame)"></i>
            </td>
          </tr>
        </TransitionGroup>
      </tbody>
    </v-table>
  </v-col>
</v-row>

  <v-dialog v-model="deleteGame" max-width="500" v-if="borrarJuego">
    <v-card>
      <div class="bg-white text-black d-flex align-center pa-2">
        <v-card-title class="text-left flex-grow-1 font-weight-bold text-h6">Confirmar</v-card-title>
        <div class="d-flex mr-3">
          <v-icon icon="fa-solid fa-rectangle-xmark text-red-darken-3" @click="deleteGame = false"></v-icon>
        </div>
      </div>
      <v-card-text class="text-h5 text-center">
        ¿Estás seguro de que quieres eliminar el videojuego? Una vez realizada esta acción,
        no lo podrás
        <span class="text-red-darken-3 font-weight-bold">recuperar</span>
      </v-card-text>
      <v-card-actions class="justify-center mt-5">
        <v-btn class="text-white bg-red-darken-3 font-weight-bold" variant="outlined"
          @click="deleteVideogame(borrarJuego._id); animationDelete(borrarJuego)">Eliminar de todas
          formas</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- Editar -->
  <div v-if="verJuego">
    <v-dialog v-model="edit" max-width="500">
      <v-card min-width="800">
        <v-card>
          <div v-if="videogameStore.loading" class="d-flex justify-center align-center"
            style="position: absolute; top: 0; right: 0; bottom: 0; left: 0;">
            <half-circle-spinner :animation-duration="1000" :size="60" color="#D50000">
            </half-circle-spinner>
          </div>
          <v-form ref="form">
            <v-card-title class="title d-none d-md-block">
              <v-row>
                <v-col cols="12" sm="6" md="6"></v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field label="Título" required variant="underlined" :rules="[requiredField]"
                      v-model="editarJuego.name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select multiple chips variant="underlined" :items="['Acción', 'Carrera', 'Deportes', 'Exploración', 'Guerra', 'Lucha', 'Online', 'Rompecabezas', 'Simulador',
                      'Violento', 'Anime', 'Casual', 'Fantasía', 'Indie', 'Multijugador', 'Plataforma', 'Sandbox', 'Supervivencia', 'Zombies',
                      'Aventura', 'Cooperativo', 'Estrategia', 'FPS', 'JRPG', 'Mundo Abierto', 'Rol', 'Shooter', 'Terror'
                    ]" label="Género" required :rules="[requiredField]" v-model="genresArray"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="Precio" required variant="underlined" type="number"
                      :rules="[requiredField]" v-model="editarJuego.price"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6" md="6">
                    <v-file-input label="Portada" variant="underlined" required
                      prepend-icon="fa-solid fa-camera-retro" name="image" @input="onChange" clearable
                      :rules="[requiredField]" @click:clear="clear"></v-file-input>
                  </v-col>
                  <v-col cols="6" sm="6" md="6">
                    <v-select chips variant="underlined" :items="['PC', 'PS5', 'PS4', 'PS3', 'PS2', 'PS1', 'XBOX', 'Nintendo Switch'
                    ]" label="Plataforma" required :rules="[requiredField]"
                      v-model="editarJuego.platform"></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea label="Descripción" variant="underlined" clearable :rules="[requiredField]"
                      v-model="editarJuego.description"></v-textarea>
                  </v-col>
                </v-row>
            </v-card-text>
            <div class="d-flex mx-auto justify-center">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined" @click="edit = false"
                  class="bg-red-darken-3 text-white font-weight-bold button1">
                  Cerrar
                </v-btn>
                <v-btn variant="outlined" class="bg-blue-darken-4 text-white font-weight-bold button2" type="submit"
                  @click.prevent="editVideogame(editarJuego._id)">
                  Editar videojuego
                </v-btn>
              </v-card-actions>
            </div>
          </v-form>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</v-card>
    <div class="d-flex justify-center mt-4">
      <v-pagination v-model="page" :length="pageCount" prev-icon="fa-solid fa-arrow-left"
        next-icon="fa-solid fa-arrow-right" active-color="red-darken-3" @update:modelValue="getDataPage"></v-pagination>
    </div>
</template>

  
<script setup>
import { ref, onBeforeMount, reactive, computed, watch } from "vue"
import { useVideogameStore } from "../stores/videogames"
import { HalfCircleSpinner } from 'epic-spinners'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const file = ref()
const editarJuego = ref()
const videogameStore = useVideogameStore()
const videogames = ref([])
const selectedStates = reactive({})
const container = ref(null)
const page = ref(1)
const itemsPerPage = ref(3)
const dialog = ref(false)
const edit = ref(false)
const deleteGame = ref(false)
const form = ref(null)
const borrarJuego = ref()
const items = reactive({
  state: '',
  changeState: ''
})

const genresArray = ref([])
const verJuego = (videogame) => {
  editarJuego.value = videogame
  edit.value = true
  const genresString = editarJuego.value.genre[0];
   genresArray.value = genresString.split(",");

console.log(genresArray);
}

const deleteJuego = (videogame) => {
  deleteGame.value = true;
  borrarJuego.value = videogame
  console.log('id', borrarJuego.value._id);
}
const requiredField = (value) => !!value || "Este campo es obligatorio";

const onChange = (e) => {
  file.value = e.target.files[0];

  console.log(file.value);
};


const clear = () => {
  file.value = ''
}

const item = reactive({
  title: '',
  genre: [],
  price: null,
  image: '',
  platform: null,
  description: '',
  status: ''
})

onBeforeMount(async () => {
  await videogameStore.getVideogames();
  getDataPage();
});


const totalRecords = () => {
  return videogameStore.userVideogames.length;
};

const pageCount = computed(() => {
  return Math.ceil(totalRecords() / itemsPerPage.value);
});

const datosPaginados = ref([]);

const getDataPage = () => {
  const totalPages = pageCount.value;
  const newPage = Math.max(page.value, 1);

  if (newPage > totalPages) {
    page.value = totalPages;
  } else {
    page.value = newPage;
  }

  const startIndex = (page.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  console.log('Valor de userVideogames: ', videogameStore.userVideogames);
  datosPaginados.value = videogameStore.userVideogames.slice(startIndex, endIndex);
};

watch(() => videogameStore.userVideogames, (newValue, oldValue) => {
  getDataPage()
});

// watch(() =>  videogameStore.userVideogames, (newX) => {
//   console.log(videogameStore.userVideogames)
// })



const getSelectItems = (state) => {
  if (state === '' || state === 'En venta') {
    return ['Reservado', 'Vendido'];
  } else if (state === 'Reservado') {
    return ['En venta', 'Vendido'];
  }
}

const editVideogame = (id) => {

  const data = new FormData();
  data.append("name", editarJuego.value.name)
  data.append("description", editarJuego.value.description)
  data.append("price", editarJuego.value.price)
  data.append("genre", genresArray.value)
  data.append("platform", editarJuego.value.platform)
  data.append("image", file.value);
  

  videogameStore.editVideogame(id, data)
    .then((response) => {
      if (response.status === 200) {
        toast.success(response.data.message, {
          theme: "colored",
          autoClose: 3000
        });

        edit.value = false;
      }
    })

    .catch((error) => {
      console.log(error);
      toast.error(error.message, {
        theme: 'colored',
        autoClose: 3000,
      });
    });
};
const deleteVideogame = (id) => {
  videogameStore.deleteVideogame(id)
    .then((response) => {
      videogameStore.getVideogamesByUser().then(() => {
        getDataPage();
      });
      deleteGame.value = false;
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message, {
        theme: 'colored',
        autoClose: 3000,
      });
    });
}

const animationDelete = (toRemove) => {
  datosPaginados.value = datosPaginados.value.filter((game) => game !== toRemove)
}

const updateState = (id, state) => {
  videogameStore.updateState(id, state)
    .then((response) => {
      if (response.status === 200) {

        for (let i = 0; i < datosPaginados.value.length; i++) {
          const videogame = datosPaginados.value[i];
          if (videogame._id === id) {
            videogame.status = selectedStates[id];
            break;
          }
        }

        toast.success(response.data.message, {
          theme: "colored",
          autoClose: 3000
        });
      }

      dialog.value = false;
      selectedStates[id] = '';
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.message, {
        theme: 'colored',
        autoClose: 3000,
      });

    });
}
</script>
  
<style scoped>
.text-left {
  text-align: left;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.disabled {
  opacity: 0.8;
  /* Ajusta la opacidad según tus necesidades */
  pointer-events: none;
}

.list-enter {
  opacity: 0;
}

.icons {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.icons:hover {
  transform: scale(1.2);
}

.title {
  background-image: url('../assets/images/mario4.jpg');
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
  /* clip-path: polygon(0 0, 100% 0, 100% 60%, 0 100%); */
  zoom: 2.5;
  height: 50px;
}

.icon-wrapper {
  opacity: 0.5;
  pointer-events: none;
}

.disabled {
  color: #C62828;
  font-weight: bold;
}
</style>
  