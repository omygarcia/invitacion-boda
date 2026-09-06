```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dias = ref('00');
const horas = ref('00');
const minutos = ref('00');
const segundos = ref('00');

let fechaFinal;
let intervalo;

const actualizarContador = () => {

    const ahora = new Date().getTime();
    const diferencia = fechaFinal - ahora;

    if (diferencia <= 0) {

        dias.value = '00';
        horas.value = '00';
        minutos.value = '00';
        segundos.value = '00';

        // Detener el contador
        clearInterval(intervalo);

        return;
    }

    const diasr = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horasr = Math.floor(
        (diferencia % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutosr = Math.floor(
        (diferencia % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundosr = Math.floor(
        (diferencia % (1000 * 60)) /
        1000
    );

    dias.value = String(diasr).padStart(2, '0');
    horas.value = String(horasr).padStart(2, '0');
    minutos.value = String(minutosr).padStart(2, '0');
    segundos.value = String(segundosr).padStart(2, '0');
};

onMounted(() => {

    // 10 de octubre de 2026 a las 19:00:00
    fechaFinal = new Date(2026, 9, 10, 19, 0, 0).getTime();

    // Ejecutar inmediatamente
    actualizarContador();

    // Actualizar cada segundo
    intervalo = setInterval(actualizarContador, 1000);
});

onUnmounted(() => {
    clearInterval(intervalo);
});
</script>

<template>

    <div class="contador">

        <div id="countdown" class="uktext-center fs-25" uk-grid>

            <div class="unidad">
                <div class="numero">{{ dias }}</div>
                <div class="texto">DÍAS</div>
            </div>

            <div class="unidad">
                <div class="numero">{{ horas }}</div>
                <div class="texto">HORAS</div>
            </div>

            <div class="unidad">
                <div class="numero">{{ minutos }}</div>
                <div class="texto">MINUTOS</div>
            </div>

            <div class="unidad">
                <div class="numero">{{ segundos }}</div>
                <div class="texto">SEGUNDOS</div>
            </div>

        </div>

    </div>

</template>
```
