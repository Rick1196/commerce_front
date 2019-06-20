<template>
    <div class="container"><br>
        <div class="mx-auto" style="width: 300px;">
            <h2>Productos
                <button class="btn btn-primary" data-toggle="modal" data-target="#crear"><i class="far fa-plus-square"></i></button>
            </h2>
        </div>
        <div class="card-columns">
            <div class="card" v-for="(producto,index) in prods" :value="index" :key="producto.id">
                <img :src="producto.image_url" class="card-img-top" alt="image">
                <div class="card-body">
                <h5 class="card-title">{{producto.nombre}}</h5>
                <p class="card-text">{{producto.desc}}</p>
                <a href="#" class="btn btn-warning" data-toggle="modal" data-target="#editar" @click="editando(producto)">Editar</a>
                <a href="#" class="btn btn-danger" @click="eliminar(producto.id,index)">Eliminar</a>
                </div>
            </div>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">PRODUCTO</h5>
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
                        <input type="text" v-model="user.desc" class="form-control"  id="exampleInputPassword1" placeholder="Descripcion">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Link de la imagen</label>
                        <input type="text" v-model="user.image_url" class="form-control"  id="exampleInputPassword1" placeholder="Link">
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
                        <input type="text" v-model="user.nombre" class="form-control" id="exampleInputEmail1" aria-describedby="Nombre" placeholder="Nombre">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Descripcion</label>
                        <input type="text" v-model="user.desc" class="form-control"  id="exampleInputPassword1" placeholder="Descripcion">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Link de la imagen</label>
                        <input type="text" v-model="user.image_url" class="form-control"  id="exampleInputPassword1" placeholder="Link">
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
            prods:[],
            user:{
                nombre:'',
                desc:'',
                image_url:''
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
            this.$http.post(baseURI+`/prods/update`,{
                id:this.user.id,
                nombre:this.user.nombre,
                desc:this.user.desc,
                image_url:this.user.image_url
            }
            ,{ headers: {'Authorization': `Bearer ${token}`}}
            )
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getProds();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        getProds(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/prods/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.prods = result.data.productos
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        eliminar(id,index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(baseURI+`/prods/${id}`);
            this.$http.delete(baseURI+`/prods/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.prods.splice(index,1);
                console.log(result);
                alert('Eliminacion exitosa');
            }).catch(error => {
                console.log(error)
            })
        },
        nuevo(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+'/prods/register',
            {
                nombre:this.user.nombre,
                desc:this.user.desc,
                image_url:this.user.image_url,
            }
            ,{ headers: {Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.errores = result.data.message;
                console.log(result)
                this.getProds();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        cerrar(){
            this.user ={
                nombre:'',
                desc:'',
                image_url:''
            };
            this.errores = null;
        }
    },
    mounted(){
        this.getProds()
    }

}
</script>
