<template>
    <div class="container"><br>
        <div class="d-flex justify-content-center">
            <div class="card" style="width: 30rem;">
                <div class="card-body">
                    <div class="alert alert-danger" role="alert" v-if="errores">
                        {{errores}}
                    </div>
                     <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" v-model="password" class="form-control"  id="exampleInputPassword1" placeholder="Password">
                    </div>
                    <button @click="login()" class="btn btn-primary">Iniciar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'Login',
    created () {
        if (localStorage.getItem('signedIn')) {
            this.$router.replace('/')
        }
    },
    data(){
        return{
            errores:null,
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            const baseURI = 'http://localhost:3000';
            this.$http.post(baseURI+'/auth/login',{
                email:this.email,
                password:this.password
            })
            .then((result) => {
                console.log(result.data.user);
                let user = result.data.user[0];
                this.errores = null;
                localStorage.setItem('csrf',result.data.access_token);
                localStorage.setItem('user',user.name);
                localStorage.setItem('signedIn',true);
                localStorage.setItem('id',user.id);
                localStorage.setItem('role',user.role);
                this.$router.replace('/')
                this.$root.$emit('actualiza');
            }).catch(error => {
                console.log(error.response)
                this.errores = error.response.data.error
            })
        }
    }
}
</script>

