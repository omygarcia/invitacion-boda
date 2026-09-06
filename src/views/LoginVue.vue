<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const usuario = ref('')
const password = ref('')

const cargando = ref(false)
const error = ref('')

const API_URL = import.meta.env.VITE_URL_SCRIPT_USER;


const iniciarSesion = async () => {

  error.value = ''

  if (!usuario.value || !password.value) {
    error.value = 'Ingresa usuario y contraseña'
    return
  }

  cargando.value = true

  try {

    const response = await fetch(API_URL, {

      method: 'POST',

      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },

      body: JSON.stringify({
        usuario: usuario.value,
        password: password.value
      })

    })

    const data = await response.json()

    if (data.success) {

      // Guardamos información del usuario
      localStorage.setItem(
        'usuario',
        JSON.stringify(data.usuario)
      )

      router.push('/panel-invitados')

    } else {

      error.value = data.mensaje

    }

  } catch (e) {

    console.error(e)

    error.value = 'No se pudo conectar con el servidor'

  } finally {

    cargando.value = false

  }

}

</script>


<template>

  <div class="login-container">

    <div class="login-card">

      <div class="logo">

        <div class="logo-icon">
          🔐
        </div>

        <h1>Bienvenido</h1>

        <p>Inicia sesión para continuar</p>

      </div>


      <form @submit.prevent="iniciarSesion">

        <div class="form-group">

          <label>
            Usuario
          </label>

          <input
            v-model="usuario"
            type="text"
            placeholder="Ingresa tu usuario"
            autocomplete="username"
          />

        </div>


        <div class="form-group">

          <label>
            Contraseña
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            autocomplete="current-password"
          />

        </div>


        <div
          v-if="error"
          class="error"
        >
          {{ error }}
        </div>


        <button
          type="submit"
          :disabled="cargando"
        >

          <span v-if="cargando">
            Iniciando sesión...
          </span>

          <span v-else>
            Iniciar sesión
          </span>

        </button>

      </form>


      <div class="footer">

        Sistema desarrollado con Vue 3

      </div>

    </div>

  </div>

</template>


<style scoped>

* {
  box-sizing: border-box;
}

.login-container {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

  /*background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%
    );*/
    background:
    linear-gradient(
      135deg,
      #382d15 0%,
      #2e3e7a 100%
    );
}

.login-card {

  width: 100%;

  max-width: 420px;

  padding: 40px;

  background: white;

  border-radius: 20px;

  box-shadow:
    0 20px 50px
    rgba(0,0,0,.20);

}

.logo {

  text-align: center;

  margin-bottom: 30px;

}

.logo-icon {

  width: 70px;

  height: 70px;

  margin: auto;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 35px;

  border-radius: 50%;

  background: #667eea;

}

.logo h1 {

  margin: 15px 0 5px;

  font-size: 28px;

}

.logo p {

  margin: 0;

  color: #777;

}


.form-group {

  margin-bottom: 20px;

}

.form-group label {

  display: block;

  margin-bottom: 8px;

  font-weight: 600;

  color: #333;

}

.form-group input {

  width: 100%;

  padding: 13px 15px;

  border: 1px solid #ddd;

  border-radius: 10px;

  outline: none;

  font-size: 15px;

  transition: .2s;

}

.form-group input:focus {

  border-color: #667eea;

  box-shadow:
    0 0 0 3px
    rgba(102,126,234,.15);

}


button {

  width: 100%;

  padding: 14px;

  border: none;

  border-radius: 10px;

  background: #667eea;

  color: white;

  font-size: 16px;

  font-weight: 600;

  cursor: pointer;

  transition: .2s;

}

button:hover {

  background: #5568d9;

}

button:disabled {

  opacity: .6;

  cursor: not-allowed;

}


.error {

  margin-bottom: 15px;

  padding: 10px;

  border-radius: 8px;

  background: #fee2e2;

  color: #b91c1c;

  text-align: center;

  font-size: 14px;

}


.footer {

  margin-top: 25px;

  text-align: center;

  color: #999;

  font-size: 12px;

}

</style>