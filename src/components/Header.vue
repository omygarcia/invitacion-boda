<script setup>
    import Contador from './Contador.vue'
    import MusicButton from './MusicButton.vue'
</script>
<template>
    <div class="fondo1 text-white">
            <div class="semi-circulo" style="align-items: flex-end;">
                <!--<h4 class="uk-text-center uk-text-uppercase text-white">Nos casamos</h4>
                <h2 class="uk-text-center f_Alex text-white fs-65">
                    Brenda <br />
                    <span class="dorado">&</span> <br />
                    Simón
                </h2>
                <div class="uk-text-center" style="display: flex;flex-direction: column; justify-content: center;">
                    <div style="display: flex;flex-direction: row; justify-content: center; align-items: center;">
                        <div><div class="lineas">SÁBADO</div> </div>
                        <div><span class="fs-35">10</span> </div>
                        <div><div class="lineas">OCTUBRE</div></div>
                    </div>
                    <div>2026</div> 
                </div>-->
                <Contador />
                <MusicButton />
            </div>
        </div>
</template>