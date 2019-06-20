<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="#">Commerce</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"  >
                <li class="nav-item active"  v-if="login && role == 1">
                    <router-link to="/" class="nav-link">Inicio</router-link>
                    
                </li>
                <li class="nav-item active"  v-if="login && role == 1">
                    <router-link to="/cats" class="nav-link">Categorias</router-link>
                </li>
                <li class="nav-item active" >
                    <router-link to="/prods" class="nav-link">Productos</router-link>
                </li>
                <li class="nav-item dropdown"  v-if="login">
                    <a class="nav-link dropdown-toggle" v-if="role == 1" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Administrar
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link to="/sistema" class="dropdown-item">Sistema</router-link>
                        <router-link to="/ciudades" class="dropdown-item">Ciudades</router-link>
                        <router-link to="/provs" class="dropdown-item">Proveedores</router-link>
                        <router-link to="/users" class="dropdown-item">Usuarios</router-link>
                    </div>
                </li>
                <ul class="navbar-nav mr-auto"  v-if="!login">
                    <li class="nav-item active">
                        <router-link to="/login" class="nav-link">Iniciar sesion</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">Registro</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mr-auto" v-else>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {{user}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" v-if="role == 2" >Carrito</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" role="button" @click="logOut()">Salir</a>
                        </div>
                    </li>
                </ul>
            
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name:'Navigation',
    data(){
        return{
            user:localStorage.getItem('user'),
            login:localStorage.getItem('signedIn'),
            role:localStorage.getItem('role'),
        }
    },
    methods:{
        logOut(){
            localStorage.clear();
            this.login = localStorage.getItem('signedIn');
            this.$router.replace('/login')
        }
    },
    mounted(){
        this.$root.$on('actualiza',()=>{
            this.login = localStorage.getItem('signedIn');
            this.role = localStorage.getItem('role');
        })
    }
}
</script>

