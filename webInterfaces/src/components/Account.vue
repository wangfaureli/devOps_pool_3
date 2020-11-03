<template>
    <div id="conteneur">
        <div class="center content-inputs">
            <h5> Mes Informations :</h5>
            <vs-input
            state="dark"
            primary
            placeholder="Name"
            v-model="value1"
            />
            <vs-input
            state="dark"
            primary
            placeholder="Last  Name"
            v-model="value2"
            />
            <vs-input
            state="dark"
            primary
            placeholder="Email"
            v-model="value3"
            />
            <vs-input
            state="dark"
            primary
            placeholder="Company"
            v-model="value4"
            />
            <vs-input
            state="dark"
            primary
            placeholder="Department"
            v-model="value5"
            />
            <vs-input
            state="dark"
            primary 
            type="password" 
            v-model="value6" 
            placeholder="New Password"
            />
            <vs-input
            state="dark" 
            primary
            type="password" 
            v-model="value7" 
            placeholder="Confirm Password"
            />
            <div id="bouton">
                <vs-button
                    circle
                    :active="active == 0"
                    @click="active = 0"
                >
                    <b>Confirm</b>
                </vs-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/api";
    export default {
         data:() => ({
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: ''
      }),
        async mounted() {
            await this.userId;
            this.user = await api.getUser(this.userId);
            this.users = await api.getUsers();
            this.userSelected = this.user;
        },
        methods: {
            getUserPage(user) {
            let currentRoute = this.$route.matched[0].path;
            let currentRegex = /:userId/gi;
            let gotoRoute = currentRoute.replace(currentRegex, user);
            this.$router.push(gotoRoute);
            this.$router.go();
            }
        }
    }
</script>
<style>
.vs-input{
    margin-bottom: 3%;
}
#bouton {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
#conteneur {
    border-radius: 2%;
    width: 30%;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-wrap: wrap;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>