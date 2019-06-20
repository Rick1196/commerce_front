<template>
    <div class="container"><br>
        <div class="mx-auto" style="width: 300px;">
            <h2>
                Usuarios
                <button class="btn btn-primary" data-toggle="modal" data-target="#crear">Crear</button>
            </h2>
        </div>
        <div class="table-responsive-xl">
            <table class="table">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Emial</th>
                    <th scope="col">Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(user,index) in users" :key="user.id">
                        <th>{{index+1}}</th>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>
                            <button class="btn btn-warning" data-toggle="modal" data-target="#editar" @click="editando(user)">Editar</button>
                            <button class="btn btn-danger" @click="eliminar(user.id,index)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="cerrar()"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                    {{errores}}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="user.password" class="form-control"  id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="">Nombre de usuario</label>
                        <input type="text" class="form-control" v-model="user.name" placeholder="Nombre">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="nuevo()">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cerrar()">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">CIUDAD</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="cerrar()"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                    {{errores}}
                    </div>
                   <div class="form-group">
                        <label for="">Nombre de usuario</label>
                        <input type="text" class="form-control" v-model="user.name" placeholder="Nombre">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="act()">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cerrar()">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Users',
    created () {
        if (!localStorage.getItem('signedIn')) {
            this.$router.replace('/login')
        }
    },
    data(){
        return{
            users:[],
            user:{
                name:'',
                email:'',
                password:'',
            },
            errores:null
        }

    },
    methods:{
        editando(prod){
            this.user = Object.assign({}, prod);
        },
        act(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+`/users/update`,{
                id:this.user.id,
                name:this.user.name,
            }
            ,{ headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getUsers();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        getUsers(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/users/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.users = result.data.users
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        eliminar(id,index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(baseURI+`/users/${id}`);
            this.$http.delete(baseURI+`/users/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.users.splice(index,1);
                console.log(result);
                alert('Eliminacion exitosa');
            }).catch(error => {
                console.log(error)
            })
        },
        nuevo(){
            const baseURI = 'http://localhost:3000';
            this.$http.post(baseURI+'/auth/register',{
                email:this.user.email,
                password:this.user.password,
                name:this.user.name,
            })
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getUsers();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        cerrar(){
            this.user = {
                name:'',
                email:'',
                password:'',
            };
            this.errores = null;
        }
    },
    mounted(){
        this.getUsers()
    }

}
</script>

