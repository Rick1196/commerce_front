<template>
    <div class="container"><br>
        <div class="mx-auto" style="width: 300px;">
            <h2>
                Proveedores
                <button class="btn btn-primary" data-toggle="modal" data-target="#crear"><i class="far fa-plus-square"></i></button>
            </h2>
        </div>
        <div class="table-responsive-xl">
            <table class="table">
                <thead>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">RFC</th>
                    <th scope="col">Opciones</th>
                </thead>
                <tbody>
                    <tr v-for="(prov,index) in provs" :key="prov.id">
                        <th>{{index+1}}</th>
                        <td>{{prov.nombre}}</td>
                        <td>{{prov.rfc}}</td>
                        <td>
                            <router-link :to="{ name: 'Prods_prov', params: { categoria: prov.id } }" class="btn btn-primary">Ver productos</router-link>
                            <button class="btn btn-warning"  data-toggle="modal" data-target="#editar" @click="editando(prov)">Editar</button>
                            <button class="btn btn-danger" @click="eliminar(prov.id,index)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Proveedor</h5>
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
                        <label for="exampleInputPassword1">RFC</label>
                        <input type="text" v-model="user.rfc" class="form-control"  id="exampleInputPassword1" placeholder="RFC">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Ciudad</label>
                        <select v-model="user.ciudad" class="custom-select"  id="exampleInputPassword1">
                            <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">{{ciudad.nombre}}</option>
                        </select>
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
                        <label for="exampleInputPassword1">RFC</label>
                        <input type="text" v-model="user.rfc" class="form-control"  id="exampleInputPassword1" placeholder="RFC">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Ciudad</label>
                        <select v-model="user.ciudad" class="custom-select"  id="exampleInputPassword1">
                            <option v-for="ciudad in ciudades" :key="ciudad.id" :value="ciudad.id">{{ciudad.nombre}}</option>
                        </select>
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
            provs:[],
            ciudades:[],
            user:{
                nombre:'',
                RFC:'',
                ciudad:''
            },
            errores:null,
        }

    },
    methods:{
        editando(prod){
            this.user = Object.assign({}, prod);
        },
        act(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+`/provs/update`,{
                id:this.user.id,
                nombre:this.user.nombre,
                rfc:this.user.rfc,
                ciudad:this.user.ciudad
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
            this.$http.get(baseURI+'/provs/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.provs = result.data.provs
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        getCiudades(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/ciudades/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.ciudades = result.data.ciudades;
                this.user.ciudad = this.ciudades[0].id;
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        eliminar(id,index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(baseURI+`/provs/${id}`);
            this.$http.delete(baseURI+`/provs/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.provs.splice(index,1);
                console.log(result);
                alert('Eliminacion exitosa');
            }).catch(error => {
                console.log(error)
            })
        },
        nuevo(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+'/provs/register',
            {
                nombre:this.user.nombre,
                rfc:this.user.rfc,
                ciudad:this.user.ciudad,
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
                RFC:'',
                ciudad:''
            };
            this.errores = null;
        }
    },
    mounted(){
        this.getProvs();
        this.getCiudades();
    }

}
</script>
