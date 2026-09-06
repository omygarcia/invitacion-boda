```vue
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()

// =================================================
// CONFIGURACIÓN
// =================================================

const URL_SCRIPT = import.meta.env.VITE_URL_SCRIPT;
  


// =================================================
// VARIABLES
// =================================================

const registros = ref([]);

const idEditar = ref(null);

const cargando = ref(false);
const guardando = ref(false);

const buscador = ref("");

const mensaje = ref("");
const tipoMensaje = ref("");


// =================================================
// FORMULARIO
// =================================================

const formulario = ref({
  nombre: "",
  telefono: "",
  asistencia: "",
  personas: 1,
  deseo: ""
});


// =================================================
// CARGAR REGISTROS
// =================================================

async function cargarRegistros() {

  cargando.value = true;

  try {

    const respuesta = await fetch(URL_SCRIPT);

    console.log("Status:", respuesta.status);
    console.log("URL:", respuesta.url);

    const texto = await respuesta.text();

    console.log(
      "Respuesta de Apps Script:",
      texto
    );

    const datos = JSON.parse(texto);

    registros.value = datos.registros;

  } catch (error) {

    console.error(error);

    mostrarMensaje(
      "No se pudieron cargar los registros",
      "error"
    );

  } finally {

    cargando.value = false;

  }

}


// =================================================
// REGISTROS FILTRADOS
// =================================================

const registrosFiltrados = computed(() => {

  const texto =
    buscador.value
      .toLowerCase()
      .trim();

  if (!texto) {

    return registros.value;

  }

  return registros.value.filter(registro => {

    return (

      String(registro.id ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.fecha ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.nombre ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.telefono ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.asistencia ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.personas ?? "")
        .toLowerCase()
        .includes(texto)

      ||

      String(registro.deseo ?? "")
        .toLowerCase()
        .includes(texto)

    );

  });

});


// =================================================
// CREAR / ACTUALIZAR
// =================================================

async function guardarRegistro() {

  if (
    !formulario.value.nombre.trim() ||
    !formulario.value.telefono ||
    !formulario.value.asistencia ||
    !formulario.value.personas ||
    !formulario.value.deseo.trim()
  ) {

    mostrarMensaje(
      "Completa todos los campos",
      "error"
    );

    return;

  }


  guardando.value = true;


  const datos = {

    accion:
      idEditar.value === null
        ? "crear"
        : "editar",

    id:
      idEditar.value,

    nombre:
      formulario.value.nombre.trim(),

    telefono:
      formulario.value.telefono,

    asistencia:
      formulario.value.asistencia,

    personas:
      formulario.value.personas,

    deseo:
      formulario.value.deseo.trim()

  };


  try {

    await fetch(URL_SCRIPT, {

      method: "POST",

      body: JSON.stringify(datos)

    });


    if (idEditar.value === null) {

      mostrarMensaje(
        "Registro creado correctamente",
        "exito"
      );

    } else {

      mostrarMensaje(
        "Registro actualizado correctamente",
        "exito"
      );

    }


    limpiarFormulario();


    // Esperamos a que Google Sheets procese
    setTimeout(() => {

      cargarRegistros();

    }, 1000);


  } catch (error) {

    console.error(error);

    mostrarMensaje(
      "Ocurrió un error al guardar",
      "error"
    );

  } finally {

    guardando.value = false;

  }

}


// =================================================
// EDITAR
// =================================================

function editarRegistro(registro) {

  idEditar.value =
    registro.id;


  formulario.value = {

    nombre:
      registro.nombre ?? "",

    telefono:
      registro.telefono ?? "",

    asistencia:
      registro.asistencia ?? "",

    personas:
      registro.personas ?? 1,

    deseo:
      registro.deseo ?? ""

  };


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


// =================================================
// CANCELAR / LIMPIAR
// =================================================

function limpiarFormulario() {

  idEditar.value = null;

  formulario.value = {

    nombre: "",

    telefono: "",

    asistencia: "",

    personas: 1,

    deseo: ""

  };

}


// =================================================
// ELIMINAR
// =================================================

async function eliminarRegistro(registro) {

  const confirmar = confirm(

    `¿Deseas eliminar el registro de ${registro.nombre}?`

  );


  if (!confirmar) {

    return;

  }


  try {

    const datos = {

      accion: "eliminar",

      id: registro.id

    };


    await fetch(URL_SCRIPT, {

      method: "POST",

      mode: "no-cors",

      body: JSON.stringify(datos)

    });


    mostrarMensaje(

      "Registro eliminado correctamente",

      "exito"

    );


    setTimeout(() => {

      cargarRegistros();

    }, 1000);


  } catch (error) {

    console.error(error);

    mostrarMensaje(

      "No se pudo eliminar el registro",

      "error"

    );

  }

}


// =================================================
// MENSAJES
// =================================================

function mostrarMensaje(texto, tipo) {

  mensaje.value = texto;

  tipoMensaje.value = tipo;


  setTimeout(() => {

    mensaje.value = "";

    tipoMensaje.value = "";

  }, 4000);

}


// =================================================
// FORMATO FECHA
// =================================================

function formatearFecha(fecha) {

  if (!fecha) {

    return "";

  }


  const fechaObj =
    new Date(fecha);


  if (isNaN(fechaObj)) {

    return fecha;

  }


  return fechaObj.toLocaleDateString(

    "es-MX",

    {

      day: "2-digit",

      month: "2-digit",

      year: "numeric"

    }

  );

}

const salir = ()=>{
  localStorage.removeItem('usuario');
  router.push('/login');
}

// =================================================
// INICIAR
// =================================================

onMounted(() => {
  const user = localStorage.getItem('usuario');
  if(user == null){
    router.push('/login');
  }
  cargarRegistros();

});

</script>


<template>

  <div class="contenedor">

    <!-- ========================================= -->
    <!-- ENCABEZADO -->
    <!-- ========================================= -->

    <header>

      <h1>
        Gestión de invitados
      </h1>

      <p>
        CRUD con Vue 3 + Google Sheets
      </p>
      <a href="#" @click.prevent="salir">Salir</a>
    </header>


    <!-- ========================================= -->
    <!-- MENSAJE -->
    <!-- ========================================= -->

    <div
      v-if="mensaje"
      class="mensaje mostrar"
      :class="tipoMensaje"
    >

      {{ mensaje }}

    </div>


    <!-- ========================================= -->
    <!-- FORMULARIO -->
    <!-- ========================================= -->

    <section class="card">

      <h2>

        {{
          idEditar === null
            ? "Nuevo registro"
            : "Editar registro"

        }}

      </h2>


      <form
        @submit.prevent="guardarRegistro"
      >


        <!-- NOMBRE -->

        <div class="campo">

          <label>
            Nombre
          </label>

          <input
            v-model="formulario.nombre"
            type="text"
            placeholder="Nombre del invitado"
            required
          >

        </div>


        <!-- TELEFONO -->

        <div class="campo">

          <label>
            Teléfono
          </label>

          <input
            v-model="formulario.telefono"
            type="text"
            placeholder="Teléfono"
            required
          >

        </div>


        <!-- ASISTENCIA -->

        <div class="campo">

          <label>
            Asistencia
          </label>

          <select
            v-model="formulario.asistencia"
            required
          >

            <option value="">
              Selecciona una opción
            </option>

            <option value="si">
              Sí, asistiré
            </option>

            <option value="no">
              No podré asistir
            </option>

          </select>

        </div>


        <!-- PERSONAS -->

        <div class="campo">

          <label>
            Personas
          </label>

          <input
            v-model.number="formulario.personas"
            type="number"
            min="1"
            max="20"
            required
          >

        </div>


        <!-- DESEO -->

        <div class="campo">

          <label>
            Deseo
          </label>

          <textarea
            v-model="formulario.deseo"
            placeholder="Escribe un deseo para los novios..."
            rows="4"
            required
          ></textarea>

        </div>


        <!-- BOTONES -->

        <div class="botones">

          <button
            type="submit"
            class="btn-guardar"
            :disabled="guardando"
          >

            {{
              guardando
                ? "Guardando..."
                : (
                    idEditar === null
                      ? "Guardar"
                      : "Actualizar"
                  )
            }}

          </button>


          <button
            v-if="idEditar !== null"
            type="button"
            class="btn-cancelar"
            @click="limpiarFormulario"
          >

            Cancelar

          </button>

        </div>

      </form>

    </section>


    <!-- ========================================= -->
    <!-- LISTADO -->
    <!-- ========================================= -->

    <section class="card">

      <div class="encabezado-tabla">

        <h2>
          Invitados
        </h2>


        <input
          v-model="buscador"
          type="search"
          placeholder="🔎 Buscar..."
        >

      </div>


      <div class="tabla-contenedor">

        <table>

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Fecha
              </th>

              <th>
                Nombre
              </th>

              <th>
                Teléfono
              </th>

              <th>
                Asistencia
              </th>

              <th>
                Personas
              </th>

              <th>
                Deseo
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>


          <tbody>

            <!-- CARGANDO -->

            <tr v-if="cargando">

              <td
                colspan="8"
                class="centrado"
              >

                Cargando registros...

              </td>

            </tr>


            <!-- SIN REGISTROS -->

            <tr
              v-else-if="
                registrosFiltrados.length === 0
              "
            >

              <td
                colspan="8"
                class="centrado"
              >

                No hay registros

              </td>

            </tr>


            <!-- REGISTROS -->

            <tr
              v-for="registro in registrosFiltrados"
              :key="registro.id"
            >

              <td>
                {{ registro.id }}
              </td>


              <td>
                {{ formatearFecha(registro.fecha) }}
              </td>


              <td>
                {{ registro.nombre }}
              </td>


              <td>
                {{ registro.telefono }}
              </td>


              <td>

                <span
                  :class="
                    registro.asistencia === 'si'
                      ? 'asistencia-si'
                      : 'asistencia-no'
                  "
                >

                  {{ registro.asistencia }}

                </span>

              </td>


              <td>
                {{ registro.personas }}
              </td>


              <td class="deseo">

                {{ registro.deseo }}

              </td>


              <td class="acciones">

                <button
                  class="btn-editar"
                  @click="editarRegistro(registro)"
                  title="Editar"
                >

                  ✏️

                </button>


                <button
                  class="btn-eliminar"
                  @click="eliminarRegistro(registro)"
                  title="Eliminar"
                >

                  🗑️

                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </section>

  </div>

</template>


<style scoped>

* {
  box-sizing: border-box;
}


.contenedor {

  max-width: 1400px;

  margin: 0 auto;

  padding: 30px;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}


header {

  text-align: center;

  margin-bottom: 30px;

}


header h1 {

  margin-bottom: 5px;

}


header p {

  color: #666;

}


.card {

  background: white;

  padding: 25px;

  margin-bottom: 25px;

  border-radius: 12px;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.08);

}


.campo {

  display: flex;

  flex-direction: column;

  margin-bottom: 18px;

}


.campo label {

  font-weight: bold;

  margin-bottom: 7px;

}


.campo input,
.campo select,
.campo textarea {

  width: 100%;

  padding: 11px;

  border: 1px solid #ccc;

  border-radius: 6px;

  font-size: 15px;

}


.campo textarea {

  resize: vertical;

}


.botones {

  display: flex;

  gap: 10px;

  margin-top: 20px;

}


button {

  border: none;

  border-radius: 6px;

  padding: 10px 18px;

  cursor: pointer;

}


button:disabled {

  opacity: .6;

  cursor: not-allowed;

}


.btn-guardar {

  background: #198754;

  color: white;

}


.btn-cancelar {

  background: #6c757d;

  color: white;

}


.btn-editar {

  background: #ffc107;

  margin-right: 5px;

}


.btn-eliminar {

  background: #dc3545;

  color: white;

}


.encabezado-tabla {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;

  margin-bottom: 20px;

}


.encabezado-tabla input {

  padding: 10px;

  border: 1px solid #ccc;

  border-radius: 6px;

  min-width: 250px;

}


.tabla-contenedor {

  overflow-x: auto;

}


table {

  width: 100%;

  border-collapse: collapse;

  min-width: 1000px;

}


th,
td {

  padding: 12px;

  border-bottom: 1px solid #ddd;

  text-align: left;

  vertical-align: middle;

}


th {

  background: #f5f5f5;

}


.centrado {

  text-align: center;

  padding: 30px;

}


.deseo {

  max-width: 300px;

}


.asistencia-si {

  background: #d1e7dd;

  color: #0f5132;

  padding: 5px 10px;

  border-radius: 20px;

}


.asistencia-no {

  background: #f8d7da;

  color: #842029;

  padding: 5px 10px;

  border-radius: 20px;

}


.mensaje {

  padding: 12px;

  margin-bottom: 20px;

  border-radius: 6px;

}


.mensaje.exito {

  background: #d1e7dd;

  color: #0f5132;

}


.mensaje.error {

  background: #f8d7da;

  color: #842029;

}


.acciones {

  white-space: nowrap;

}


@media (max-width: 700px) {

  .contenedor {

    padding: 15px;

  }


  .card {

    padding: 15px;

  }


  .encabezado-tabla {

    flex-direction: column;

    align-items: stretch;

  }


  .encabezado-tabla input {

    width: 100%;

    min-width: 0;

  }

}

</style>
```
