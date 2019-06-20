<template>
    <div class="container"><br>
        <div class="container mx-auto" style="width: 700px;">
            <div class="input-group">
                <input type="text" class="form-control" v-model="filter" data-toggle="tooltip" data-placement="bottom" title="Opcional" placeholder="Nombre">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" disabled type="button btn-primary">Buscar <i class="fas fa-search"></i></button>
                </div>
            </div>
        </div><br>
        <div class="card-columns">
            <div class="card" v-for="producto in filterProds" :key="producto.id">
                <img :src="producto.image_url" class="card-img-top" alt="image">
                <div class="card-body">
                <h5 class="card-title">{{producto.nombre}}</h5>
                <p class="card-text">{{producto.desc}}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'Home',
    data(){
        return{
            productos:[],
            filter:''
        }
    },
    methods:{
        getProds(){
            const baseURI = 'http://localhost:3000';
            this.$http.get(baseURI+'/prods/all')
            .then((result) => {
                this.productos = result.data.productos
                console.log(result);
            })
        }
    },
    mounted(){
        this.getProds();
    },
    computed: {
        filterProds() {
            return this.productos.filter((prod) => {
                return prod.nombre.toLowerCase().includes(this.filter.toLowerCase());
            })
        }
    },
}
</script>

