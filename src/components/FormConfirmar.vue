```vue
<script setup>

import { ref, onMounted } from 'vue'
import { useBoletoStore } from '@/stores/boleto'
import QrcodeVue from 'qrcode.vue'


// =================================================
// URL DE GOOGLE APPS SCRIPT
// =================================================

const URL_SCRIPT = import.meta.env.VITE_URL_SCRIPT;


// =================================================
// DATOS DEL FORMULARIO
// =================================================

const nombre = ref('')
const telefono = ref('')
const asistencia = ref('1')
const personas = ref('')
const deseo = ref('')

const mostrarForm = ref(true);
const asistenciaResp = ref(false)


// Estado del formulario
const enviando = ref(false)
const mensaje = ref('')
const tipoMensaje = ref('')

const useBoleto = useBoletoStore();


onMounted(()=>{
    console.log(typeof useBoleto.$state.boleto);
    mostrarForm.value = useBoleto.$state.boleto === null?true:false;
});

// =================================================
// ENVIAR FORMULARIO
// =================================================

async function confirmarAsistencia() {

    // Validaciones

    if (!nombre.value.trim()) {

        mostrarMensaje(
            'Por favor escribe tu nombre',
            'error'
        )

        return
    }


    if (!telefono.value.trim()) {

        mostrarMensaje(
            'Por favor escribe tu teléfono',
            'error'
        )

        return
    }


    if (!asistencia.value) {

        mostrarMensaje(
            'Por favor indica si asistirás',
            'error'
        )

        return
    }


    /*if (!personas.value) {

        mostrarMensaje(
            'Por favor selecciona el número de personas',
            'error'
        )

        return
    }*/


    enviando.value = true


    const datos = {

        accion: 'crear',

        nombre: nombre.value.trim(),

        telefono: telefono.value.trim(),

        servicio: 'Confirmación de asistencia',

        asistencia: asistencia.value,

        personas: /*personas.value*/"1",

        deseo: deseo.value.trim()

    }


    try {

        const msg = await fetch(URL_SCRIPT, {
            method: 'POST',
            //mode: 'no-cors',
            body: JSON.stringify(datos)
        })
        let resp = await msg.json();
        console.log('regis',resp);
        useBoleto.$state.boleto = resp.datos;
        asistenciaResp.value = useBoleto.$state.boleto.asistencia;

        mostrarMensaje(
            '¡Gracias por confirmar tu asistencia! ❤️',
            'exito'
        )

        mostrarForm.value = false;

        // Limpiar formulario

        nombre.value = ''

        telefono.value = ''

        asistencia.value = ''

        personas.value = ''

        deseo.value = ''


    } catch (error) {

        console.error(error)


        mostrarMensaje(
            'Ocurrió un error. Intenta nuevamente.',
            'error'
        )

    } finally {

        enviando.value = false

    }

}


// =================================================
// MENSAJES
// =================================================

function mostrarMensaje(texto, tipo) {

    mensaje.value = texto

    tipoMensaje.value = tipo


    setTimeout(() => {

        mensaje.value = ''

        tipoMensaje.value = ''

    }, 5000)

}

</script>


<template>

    <!-- Confirmar asistencia -->

    <div 
        class="uk-padding uk-padding-remove-top beige fondo_boda1"
    >

        <h3
            class="dorado sombra uk-text-center fs-35"
        >
            Confirmar Asistencia
        </h3>


        <p v-show="mostrarForm"
            class="uk-text-center fs-25"
        >
            Te agradeceremos confirmar tu asistencia
            lo antes posible
        </p>


        <form
            v-if="mostrarForm"
            class="formulario-boda"
            @submit.prevent="confirmarAsistencia"
        >


            <!-- ================================= -->
            <!-- NOMBRE -->
            <!-- ================================= -->

            <div>

                <h3>
                    Nombre y Apellidos*
                </h3>

                <input
                    type="text"
                    v-model="nombre"
                    placeholder="Escribe tu nombre"
                    autocomplete="name"
                />

            </div>


            <!-- ================================= -->
            <!-- TELEFONO -->
            <!-- ================================= -->

            <div>

                <h3>
                    Teléfono Móvil*
                </h3>

                <input
                    type="tel"
                    v-model="telefono"
                    placeholder="Escribe tu teléfono"
                    autocomplete="tel"
                />

            </div>


            <!-- ================================= -->
            <!-- ASISTENCIA -->
            <!-- ================================= -->

            <div>

                <h3>
                    ¿Asistirás?
                </h3>


                <input
                    type="radio"
                    id="opcionok"
                    name="asistencia"
                    value="si"
                    v-model="asistencia"
                >

                <label
                    for="opcionok"
                    class="radio-btn"
                >
                    ¡Claro, ahí nos vemos!
                </label>


                <input
                    type="radio"
                    id="opcionokno"
                    name="asistencia"
                    value="no"
                    v-model="asistencia"
                >

                <label
                    for="opcionokno"
                    class="radio-btn"
                >
                    Lo siento, no podré asistir
                </label>

            </div>


            <!-- ================================= -->
            <!-- NUMERO DE PERSONAS -->
            <!-- ================================= -->

            <div style="display: none;">

                <h3>
                    Número de personas que asistirán:
                </h3>


                <input
                    type="radio"
                    id="opcion1"
                    name="personas"
                    value="1"
                    v-model="personas"
                >

                <label
                    for="opcion1"
                    class="radio-btn"
                >
                    1
                </label>


                <input
                    type="radio"
                    id="opcion2"
                    name="personas"
                    value="2"
                    v-model="personas"
                >

                <label
                    for="opcion2"
                    class="radio-btn"
                >
                    2
                </label>


                <input
                    type="radio"
                    id="opcion3"
                    name="personas"
                    value="3"
                    v-model="personas"
                >

                <label
                    for="opcion3"
                    class="radio-btn"
                >
                    3
                </label>


                <input
                    type="radio"
                    id="opcion4"
                    name="personas"
                    value="4"
                    v-model="personas"
                >

                <label
                    for="opcion4"
                    class="radio-btn"
                >
                    4
                </label>


                <input
                    type="radio"
                    id="opcion5"
                    name="personas"
                    value="5"
                    v-model="personas"
                >

                <label
                    for="opcion5"
                    class="radio-btn"
                >
                    5
                </label>



            </div>


            <!-- ================================= -->
            <!-- DESEO -->
            <!-- ================================= -->

            <div>

                <h3>
                    Escríbenos un deseo
                </h3>

                <textarea
                    v-model="deseo"
                    placeholder="Déjanos unas palabras..."
                    rows="4"
                ></textarea>

            </div>


            <!-- ================================= -->
            <!-- MENSAJE -->
            <!-- ================================= -->

            <div
                v-if="mensaje"
                :class="[
                    'mensaje-boda',
                    tipoMensaje
                ]"
            >

                {{ mensaje }}

            </div>


            <!-- ================================= -->
            <!-- BOTON -->
            <!-- ================================= -->

            <button
                type="submit"
                :disabled="enviando"
            >

                {{ enviando
                    ? 'Enviando...'
                    : 'Confirmar'
                }}

            </button>


        </form>
        <div class="uk-text-center" v-else>
            <div v-if="asistenciaResp == 'si'">
                <p class="fs-25">
                    <b>Gracias por confirmar</b>
                    Los esperamos!
                </p>
                <p class="fs-25">
                    <b>Nombre:</b> {{ useBoleto.$state.boleto.nombre }}<br />
                </p>
                <qrcode-vue :value="useBoleto.$state.boleto.nombre" :size="200" level="H" />
            </div>
            <div v-else>
                <p class="fs-25">¡No te preocupes! Muchas gracias por avisar.</p>
            </div>
        </div>

    </div>

</template>
```
