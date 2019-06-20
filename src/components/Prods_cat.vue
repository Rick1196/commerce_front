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
                <button v-on:click="asigna(prod.id)" v-for=" prod in filterProds" :key="prod.id" class="list-group-item list-group-item-action">
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
                <a href="#" class="btn btn-danger" @click="eliminar(index)">Remover</a>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:['categoria'],
    name:'Prods_cat',
    data(){
        return{
            productos:[],
            todos:[],
            filter:'``',
        }
    },
    methods:{
        getProds(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+`/prod_cat/all/${this.categoria}`,{ headers: { Authorization: `Bearer ${token}` }})
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
            this.$http.post(baseURI+'/prod_cat/register',
            {
                categoria:this.categoria,
                producto:id,
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
            this.$http.delete(baseURI+`/prod_cat/${id}`,{ headers: {  'Content-Type': 'application/json',Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.productos.splice(index,1);
                console.log(result);
            }).catch(error => {
                console.log(error)
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