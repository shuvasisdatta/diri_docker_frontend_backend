<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header"><h3 class="text-center">Login</h3></div>

                <div class="card-body">
                    <form @submit.prevent="login">
                        <!-- @csrf -->

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-mail</label>

                            <div class="col-md-6">
                                <input id="email" type="email" v-model="input.email" class="form-control" :class="{'is-invalid': errors && errors.hasOwnProperty('email')}" name="email" required autocomplete="email" autofocus>

                                <!-- @error('email') -->
                                    <span class="invalid-feedback" v-if="errors.email" role="alert">
                                        <strong>{{ errors.email[0] }}</strong>
                                    </span>
                                <!-- @enderror -->
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" v-model="input.password" class="form-control" :class="{'is-invalid': errors && errors.hasOwnProperty('password')}" name="password" required autocomplete="current-password">

                                <!-- @error('password') -->
                                    <span class="invalid-feedback" v-if="errors.password" role="alert">
                                        <strong>{{ errors.password[0] }}</strong>
                                    </span>
                                <!-- @enderror -->
                            </div>
                        </div>

                        <!-- <div class="form-group row">
                            <div class="col-md-6 offset-md-4 form-inline">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="input.remember_me" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                        </div> -->

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card mt-5">
                <h5 class="card-body font-weight-bold text-warning">Site is under construction</h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: "",
                    password: "",
                    remember_me: false
                },
                errors: []
            }
        },
        methods: {
            login() {
                if(this.input.email != "" && this.input.password != "") {
                  this.$http.post('/auth/login', this.input)
                    .then( (response) => {
                        this.$awn.success('Authentication Successful!')

                        // console.log(response)
                        localStorage.setItem('access-token', response.data.access_token);
                        // localStorage.setItem('loggedInUser', JSON.stringify(response.data.user));
                        localStorage.setItem('isAdmin', response.data.isAdmin);
                        console.log(response.data);
                        this.$root.access_token = response.data.access_token;
                        // this.$root.loggedInUser = response.data.user;
                        this.$root.isAdmin = response.data.isAdmin
                        this.$router.push(this.$route.query.redirect || '/');
                    })
                    .catch(error => {
                        console.log(error)
                        this.errors = {}
                        if(error.response.status === 422) {
                            this.errors = error.response.data.errors
                        } else if(error.response.status === 401) {
                            console.log(error);
                            this.$awn.alert('Authentication Failed!. Wrong Username or Password.')
                            // toast.fire({
                        console.log(error.response)('')
                            //     title: 'Wrong Email or Password',
                            //     type: 'error'
                            // });
                        }
                        // this.$Progress.fail()
                    })
                } else {
                    console.log("A email and password must be present");
                }
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
