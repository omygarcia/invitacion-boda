<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const dias = ref('00');
const horas = ref('00');
const minutos = ref('00');
const segundos = ref('00');

const eventoComenzado = ref(false);

let fechaFinal;
let intervalo;

const actualizarContador = () => {

    const ahora = new Date().getTime();
    const diferencia = fechaFinal - ahora;

    // Cuando llega la fecha
    if (diferencia <= 0) {

        dias.value = '00';
        horas.value = '00';
        minutos.value = '00';
        segundos.value = '00';

        eventoComenzado.value = true;

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

    // 10 de octubre de 2026 a las 19:00
    fechaFinal = new Date(
        2026,
        9,
        10,
        16,
        0,
        0
    ).getTime();

    // Ejecutar inmediatamente
    actualizarContador();

    // Actualizar cada segundo
    intervalo = setInterval(
        actualizarContador,
        1000
    );
});

onUnmounted(() => {
    clearInterval(intervalo);
});
</script>


<template>

    <div class="contador">

        <!-- CONTADOR -->
        <div
            v-if="!eventoComenzado"
            id="countdown"
            class="uktext-center fs-25"
            uk-grid
        >

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


        <!-- MENSAJE CUANDO LLEGA LA FECHA -->
        <div
            v-else
            class="mensaje-boda"
        >

            <div class="corazon">❤️</div>

            <div class="gran-dia">
                ¡HOY ES EL GRAN DÍA!
            </div>

            <div class="anillos">
                💍
            </div>

            <div class="mensaje">
                ¡Que comience nuestra historia!
            </div>

        </div>

    </div>

</template>
<style scoped>
/* =========================================
   CONTADOR DE BODA
   Estilo romántico y elegante
   ========================================= */

.contador {
    width: 100%;
    max-width: 650px;
    margin: 0 auto;
    padding: 25px 15px;
    text-align: center;
}


/* =========================================
   CONTENEDOR DEL COUNTDOWN
   ========================================= */

#countdown {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin: 0;
}


/* =========================================
   CADA UNIDAD
   ========================================= */

.unidad {
    min-width: 105px;
    padding: 15px 10px;
    text-align: center;

    background: rgba(255, 255, 255, 0.15);

    border: 1px solid rgba(255, 255, 255, 0.45);

    border-radius: 12px;

    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    box-shadow:
        0 5px 20px rgba(0, 0, 0, 0.08);

    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}


/* Efecto al pasar el mouse */

.unidad:hover {
    transform: translateY(-4px);

    box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.12);
}


/* =========================================
   NÚMEROS
   ========================================= */

.numero {
    font-family: Georgia, "Times New Roman", serif;

    font-size: 42px;
    font-weight: 400;

    line-height: 1;

    letter-spacing: 2px;

    color: inherit;

    text-shadow:
        0 2px 8px rgba(0, 0, 0, 0.12);

    margin-bottom: 8px;
}


/* =========================================
   TEXTO DÍAS / HORAS / ETC.
   ========================================= */

.texto {
    font-family:
        Arial,
        Helvetica,
        sans-serif;

    font-size: 11px;

    letter-spacing: 2px;

    font-weight: 500;

    opacity: 0.85;
}


/* =========================================
   MENSAJE DEL GRAN DÍA
   ========================================= */

.mensaje-boda {
    padding: 35px 20px;

    text-align: center;

    animation:
        aparecer 1.5s ease forwards;
}


/* =========================================
   CORAZÓN
   ========================================= */

.corazon {
    font-size: 38px;

    margin-bottom: 10px;

    animation:
        latido 2s ease-in-out infinite;
}


/* =========================================
   ANILLOS
   ========================================= */

.anillos {
    font-size: 45px;

    margin: 10px 0 15px;

    animation:
        aparecerAnillos 1.5s ease forwards;
}


/* =========================================
   TEXTO PRINCIPAL
   ========================================= */

.gran-dia {
    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 36px;

    font-weight: 400;

    letter-spacing: 2px;

    line-height: 1.2;

    margin-bottom: 12px;

    text-shadow:
        0 2px 10px rgba(0, 0, 0, 0.12);
}


/* =========================================
   FRASE
   ========================================= */

.mensaje {
    font-family:
        Georgia,
        "Times New Roman",
        serif;

    font-size: 18px;

    font-style: italic;

    letter-spacing: 1px;

    opacity: 0.9;
}


/* =========================================
   ANIMACIÓN DE APARICIÓN
   ========================================= */

@keyframes aparecer {

    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }

}


/* =========================================
   ANIMACIÓN DE LOS ANILLOS
   ========================================= */

@keyframes aparecerAnillos {

    0% {
        opacity: 0;
        transform: scale(0.5) rotate(-15deg);
    }

    70% {
        transform: scale(1.1) rotate(5deg);
    }

    100% {
        opacity: 1;
        transform: scale(1) rotate(0);
    }

}


/* =========================================
   ANIMACIÓN DEL CORAZÓN
   ========================================= */

@keyframes latido {

    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(1.12);
    }

    40% {
        transform: scale(1);
    }

    60% {
        transform: scale(1.08);
    }

    100% {
        transform: scale(1);
    }

}


/* =========================================
   TABLET
   ========================================= */

@media (max-width: 650px) {

    #countdown {
        gap: 8px;
    }

    .unidad {
        min-width: 80px;
        padding: 12px 6px;
    }

    .numero {
        font-size: 32px;
    }

    .texto {
        font-size: 9px;
        letter-spacing: 1px;
    }

    .gran-dia {
        font-size: 30px;
    }

    .mensaje {
        font-size: 16px;
    }

}


/* =========================================
   CELULAR
   ========================================= */

@media (max-width: 450px) {

    .contador {
        padding: 20px 8px;
    }

    #countdown {
        gap: 5px;
    }

    .unidad {
        min-width: 0;
        flex: 1;

        padding: 12px 4px;

        border-radius: 10px;
    }

    .numero {
        font-size: 27px;

        letter-spacing: 1px;
    }

    .texto {
        font-size: 8px;

        letter-spacing: 0.5px;
    }

    .gran-dia {
        font-size: 25px;

        letter-spacing: 1px;
    }

    .corazon {
        font-size: 32px;
    }

    .anillos {
        font-size: 38px;
    }

    .mensaje {
        font-size: 15px;
    }

}


/* =========================================
   CELULARES MUY PEQUEÑOS
   ========================================= */

@media (max-width: 350px) {

    .numero {
        font-size: 23px;
    }

    .texto {
        font-size: 7px;
    }

    .gran-dia {
        font-size: 22px;
    }

}

</style>
