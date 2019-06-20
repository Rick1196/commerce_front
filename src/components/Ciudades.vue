<template>
    <div class="container">
        <div class="mx-auto" style="width: 300px;">
            <h2>Ciudades
                <button class="btn btn-primary" data-toggle="modal" data-target="#crear"><i class="far fa-plus-square"></i></button>
            </h2>
        </div>
        <div class="table-responsive-xl">
            <table class="table">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">CP</th>
                    <th scope="col">Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(ciudad,index) in ciudades" :key="ciudad.id">
                        <th>{{index+1}}</th>
                        <td>{{ciudad.nombre}}</td>
                        <td>{{ciudad.cp}}</td>
                        <td>
                            <button class="btn btn-warning" data-toggle="modal" data-target="#editar" @click="editando(ciudad)">Editar</button>
                            <button class="btn btn-danger" @click="deleteC(ciudad.id,index)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                        <input type="text" v-model="user.nombre" class="form-control" id="exampleInputEmail1" aria-describedby="nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Codigo postal</label>
                        <input type="text" v-model="user.cp" class="form-control"  id="exampleInputPassword1" placeholder="codigo postal">
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
                        <input type="text" v-model="user.cp" class="form-control"  id="exampleInputPassword1" placeholder="RFC">
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
    name:'Ciudades',
    created () {
        if (!localStorage.getItem('signedIn')) {
            this.$router.replace('/login')
        }
    },
    data(){
        return{
            ciudades:[],
            user:{
                nombre:'',
                cp:''
            }
        }

    },
    methods:{
        editando(ciudad){
            this.user = Object.assign({}, ciudad);
        },
        act(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+`/ciudades/update`,{
                id:this.user.id,
                nombre:this.user.nombre,
                cp:this.user.cp,
            }
            ,{ headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getCiudades();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        getCiudades(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/ciudades/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.ciudades = result.data.ciudades
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        deleteC(id,index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(baseURI+`/ciudades/${id}`);
            this.$http.delete(baseURI+`/ciudades/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.ciudades.splice(index,1);
                console.log(result);
                alert('Eliminacion exitosa');
            }).catch(error => {
                console.log(error)
            })
        },
        nuevo(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+'/ciudades/register',
            {
                nombre:this.user.nombre,
                cp:this.user.cp,
            }
            ,{ headers: {Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getCiudades();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        cerrar(){
            this.user ={
                nombre:'',
                cp:''
            };
            this.errores = null;
        }
    },
    mounted(){
        this.getCiudades()
    }

}
</script>

