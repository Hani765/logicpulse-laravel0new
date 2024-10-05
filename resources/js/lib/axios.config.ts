import axios from "axios";

const myAxios = axios.create({
    headers: {
        Accept: "application/json",
    },
});

export default myAxios;
