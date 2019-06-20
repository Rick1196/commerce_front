<template>
    <div class="container"><br>
        <div class="mx-auto" style="width: 300px;">
            <h2>Categorias
                <button class="btn btn-primary" data-toggle="modal" data-target="#crear"><i class="far fa-plus-square"></i></button>
            </h2>
        </div>
        <div class="table-responsive-xl">
            <table class="table">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(cat,index) in cats" :key="cat.id">
                        <th>{{index+1}}</th>
                        <td>{{cat.nombre}}</td>
                        <td>{{cat.desc}}</td>
                        <td>
                            <router-link :to="{ name: 'Prods_cat', params: { categoria: cat.id } }" class="btn btn-primary">Ver productos</router-link>
                            <button class="btn btn-warning" data-toggle="modal" data-target="#editar" @click="editando(cat)">Editar</button>
                            <button class="btn btn-danger" @click="eliminar(cat.id,index)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">CATEGORIA</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="cerrar()"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                    {{errores}}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Nombre</label>
                        <input type="text" v-model="user.nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Descripcion</label>
                        <input type="text" v-model="user.desc" class="form-control"  id="exampleInputPassword1" placeholder="RFC">
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
                        <label for="exampleInputEmail1">Nombre</label>
                        <input type="text" v-model="user.nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Descripcion</label>
                        <input type="text" v-model="user.desc" class="form-control"  id="exampleInputPassword1" placeholder="RFC">
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
            cats:[],
            user:{
                nombre:'',
                desc:''
            },
            errores:null,
        }

    },
    methods:{
        editando(cat){
            this.user = Object.assign({}, cat);
        },
        act(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+`/cats/update`,{
                id:this.user.id,
                nombre:this.user.nombre,
                desc:this.user.desc,
            }
            ,{ headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getProvs();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        getProvs(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/cats/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.cats = result.data.categorias
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        eliminar(id,index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(baseURI+`/cats/${id}`);
            this.$http.delete(baseURI+`/cats/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.cats.splice(index,1);
                console.log(result);
                alert('Eliminacion exitosa');
            }).catch(error => {
                console.log(error)
            })
        },
        nuevo(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+'/cats/register',
            {
                nombre:this.user.nombre,
                desc:this.user.desc,
            }
            ,{ headers: {Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getProvs();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        cerrar(){
            this.user ={
                nombre:'',
                desc:''
            };
            this.errores = null;
        }
    },
    mounted(){
        this.getProvs()
    }

}
</script>
