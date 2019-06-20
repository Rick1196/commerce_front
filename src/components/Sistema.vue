<template>
    <div class="container">
        <div class="mx-auto" style="width: 300px;">
            <h2>
                Sistema
            </h2>
        </div>
        <div class="table-responsive-xl">
            <table class="table">
                <tbody>
                    <tr>
                        <td>Usuarios registrados hoy:</td>
                        <td>{{u_cr}}</td>
                    </tr>
                    <tr>
                        <td>Proveedores registrados hoy:</td>
                        <td>{{u_up}}</td>
                    </tr>
                    <tr>
                        <td>Articulos registrados hoy:</td>
                        <td>{{prd_cr}}</td>
                    </tr>
                    <tr>
                        <td>Articulos modificados hoy:</td>
                        <td>{{prd_up}}</td>
                    </tr>
                    <tr>
                        <td>Sedes registradas hoy:</td>
                        <td>{{cd_cr}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:'Sistema',
    data(){
        return{
            u_cr:0,
            u_up:0,
            p_up:0,
            p_cr:0,
            prd_cr:0,
            prd_up:0,
            cd_cr:0,
        }
    },
    methods:{
        getUserCr(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/users_created',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.u_cr = result.data.users
                console.log(result);
            })
        },
        getUserUp(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/users_updated',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.u_up = result.data.users
                console.log(result);
            })
        },
        getProvCr(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/provs_created',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.p_cr = result.data.users
                console.log(result);
            })
        },
        getProvUp(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/provs_updated',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.p_up = result.data.users
                console.log(result);
            })
        },
        getArtCr(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/prods_created',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.prd_cr = result.data.users
                console.log(result);
            })
        },
        getArtUp(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/prods_updated',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.prd_up = result.data.users
                console.log(result);
            })
        },
        getCdCr(){
            const baseURI = 'http://localhost:3000';
            let token = localStorage.getItem('csrf')
            this.$http.get(baseURI+'/sistema/ciudades_created',{ headers: { Authorization: `Bearer ${token}` }})
            .then((result) => {
                this.cd_cr = result.data.users
                console.log(result);
            })
        }
    },
    mounted(){
        this.getUserCr();
        this.getUserUp();
        this.getProvCr();
        this.getProvUp();
        this.getArtCr();
        this.getArtUp();
        this.getCdCr();
    }
}
</script>

