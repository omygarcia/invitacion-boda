```vue
<script setup>
//import UIkit from 'uikit';
</script>

<template>

    <div class="uk-padding uk-padding-remove-top fondo_boda1">

        <h3 class="dorado sombra uk-text-center fs-35">
            ¿Dónde y Cuándo?
        </h3>


        <div class="uk-child-width-1-2@s" uk-grid>

            <!-- =========================
                 CEREMONIA
            ========================== -->

            <div>

                <h3 class="uk-text-center">
                    Ceremonia Religiosa
                </h3>

                <img
                    src="/img/san_mateo.jpg"
                    class="uk-width-1-1"
                />

                <h4>
                    Templo San Mateo Apóstol
                </h4>

                <p>
                    <b>Cuándo:</b>
                    10 de Octubre de 2026 18:00 hrs.
                </p>

                <p>
                    <b>Dirección:</b>
                    C. 3 Ote. 20, San Mateo Mendizábal 2da Secc,
                    72992 Amozoc de Mota, Pue.
                </p>


                <button
                    uk-toggle="target: #modal-ceremonia"
                    type="button"
                    class="button button-gold"
                >
                    Ver mapa
                </button>


                <!-- MODAL CEREMONIA -->

                <div
                    id="modal-ceremonia"
                    uk-modal
                >

                    <div
                        class="uk-modal-dialog uk-modal-body"
                    >

                        <button
                            class="uk-modal-close-default"
                            type="button"
                            uk-close
                        ></button>

                        <h2 class="uk-modal-title">
                            Ceremonia Religiosa
                        </h2>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.491959374585!2d-98.0733194!3d19.042095800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfeb13e20dedef%3A0x29c5a4868c28c8f2!2sTemplo%20San%20Mateo%20Ap%C3%B3stol!5e0!3m2!1ses-419!2smx!4v1788570596136!5m2!1ses-419!2smx" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>

                    </div>

                </div>

            </div>


            <!-- =========================
                 RECEPCIÓN
            ========================== -->

            <div>

                <h3 class="uk-text-center">
                    Recepción
                </h3>

                <img
                    src="/img/salon-miranda.jpg"
                    class="uk-width-1-1"
                />

                <h4>
                    Salón Miranda
                </h4>

                <p>
                    <b>Cuándo:</b>
                    10 de Octubre de 2026 18:00 hrs.
                </p>

                <p>
                    <b>Dirección:</b>
                    Nogales 40, Bosques de San Ángel,
                    72990 Amozoc de Mota, Pue.
                </p>


                <button
                    uk-toggle="target: #modal-recepcion"
                    type="button"
                    class="button button-gold"
                >
                    Ver mapa
                </button>


                <!-- MODAL RECEPCIÓN -->

                <div
                    id="modal-recepcion"
                    uk-modal
                >

                    <div
                        class="uk-modal-dialog uk-modal-body"
                    >
                        <button
                            class="uk-modal-close-default"
                            type="button"
                            uk-close
                        ></button>

                        <h2 class="uk-modal-title">
                            Salón Miranda
                        </h2>


                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5034257390344!2d-98.0799006!3d19.041591099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfeb3d7a739553%3A0x925e77a63d02276a!2sSal%C3%B3n%20Miranda!5e0!3m2!1ses-419!2smx!4v1788297926616!5m2!1ses-419!2smx"
                            width="100%"
                            height="450"
                            style="border:0;"
                            allowfullscreen
                            loading="lazy"
                            referrerpolicy="strict-origin-when-cross-origin"
                        ></iframe>


                        <button
                            class="uk-button uk-button-default uk-modal-close"
                            type="button"
                        >
                            CERRAR
                        </button>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>
<style scoped>
.button-gold{
    display:block;
    border-radius:0.5rem;
    padding:15px;
    background-color:#b8860b;
    color:white;
    font-size:16px;
    border:1px solid transparent;
    width:100%;
}
</style>
