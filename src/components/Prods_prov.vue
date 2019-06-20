<template>
    <div class="container"><br>
        <div class="container mx-auto" style="width: 700px;">
            <div class="input-group">
                <input type="text" class="form-control" v-model="filter" data-toggle="tooltip" data-placement="bottom" title="Opcional" placeholder="Nombre">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" disabled type="button btn-primary">Buscar <i class="fas fa-search"></i></button>
                </div>
            </div>
            <div class="list-group">
                <button v-on:click="crear(prod)"  data-toggle="modal" data-target="#crear" v-for=" prod in filterProds" :key="prod.id" class="list-group-item list-group-item-action">
                    {{prod.nombre}}
                </button>
            </div>
        </div><br>
        <div class="card-columns">
            <div class="card" v-for="(producto,index) in productos" :key="producto.id">
                <img :src="producto.image_url" class="card-img-top" alt="image">
                <div class="card-body">
                    <h5 class="card-title">{{producto.nombre}}</h5>
                    <p class="card-text">{{producto.desc}}</p>
                    <p class="card-text">${{producto.precio}}</p>
                    <p class="card-text">Existencia: {{producto.cantidad}}</p>
                    <a href="#" class="btn btn-danger" @click="eliminar(index)">Remover</a>
                    <a href="#" class="btn btn-warning" @click="editar(producto)"  data-toggle="modal" data-target="#editar">Editar</a>
                </div>
            </div>
        </div>
        <div class="modal fade" id="crear" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="cerrar()"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                    {{errores}}
                    </div>
                    <div class="card">
                        <img :src="producto.image_url" class="card-img-top" alt="image">
                        <div class="card-body">
                        <h5 class="card-title">{{producto.nombre}}</h5>
                        <p class="card-text">{{producto.desc}}</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Precio</label>
                        <input type="text" v-model="precio" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Precio">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Cantidad</label>
                        <input type="text" v-model="cantidad" class="form-control"  id="exampleInputPassword1" placeholder="Cantidad">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="asigna()">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cerrar()">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Producto</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="cerrar()"  aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                    {{errores}}
                    </div>
                    <div class="card">
                        <img :src="producto.image_url" class="card-img-top" alt="image">
                        <div class="card-body">
                        <h5 class="card-title">{{producto.nombre}}</h5>
                        <p class="card-text">{{producto.desc}}</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Precio</label>
                        <input type="text" v-model="producto.precio" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Precio">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Cantidad</label>
                        <input type="text" v-model="producto.cantidad" class="form-control"  id="exampleInputPassword1" placeholder="Cantidad">
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
    props:['categoria'],
    name:'Prods_prov',
    data(){
        return{
            productos:[],
            todos:[],
            filter:'``',
            producto:[],
            precio:0,
            cantidad:0,
            errores:null
        }
    },
    methods:{
        crear(prod){
            this.producto = Object.assign({},prod);
        },
        editar(prod){
            this.producto = Object.assign({},prod);
        },
        getProds(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+`/prod_prov/all/${this.categoria}`,{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.productos = result.data.productos
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        getTodos(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/prods/all',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.todos = result.data.productos
                console.log(result);
            }).catch(error => {
                console.log(error.response)
            })
        },
        asigna(id){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            console.log(id)
            this.$http.post(baseURI+'/prod_prov/register',
            {
                prov:this.categoria,
                producto:this.producto.id,
                cantidad:this.cantidad,
                precio:this.precio
            }
            ,{ headers: {Authorization: `Bearer ${token}` }})
            .then((result) => {
                console.log(result)
                this.getProds();
            }).catch(error => {
                console.log(error)
                this.errores = error.response.data.error
            })
        },
        eliminar(index){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            let id = this.productos[index].id;
            console.log(this.productos[index]);
            this.$http.delete(baseURI+`/prod_prov/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.productos.splice(index,1);
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
        },
        cerrar(){
            this.producto ={
            };
            this.precio = 0;
            this.cantidad = 0;
            this.errores = null;
        },
        act(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.post(baseURI+`/prod_prov/update`,{
                id:this.producto.id,
                precio:this.producto.precio,
                cantidad:this.producto.cantidad,
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
    },
    mounted(){
        this.getProds();
        this.getTodos();
    },
    computed: {
        filterProds() {
            return this.todos.filter((prod) => {
                return prod.nombre.toLowerCase().includes(this.filter.toLowerCase());
            })
        }
    },
}
</script>