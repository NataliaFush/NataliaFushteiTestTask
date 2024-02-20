import axiosService from "./axios.service";
import {urls} from "../configs/urls";

export const userService = {
    create: (user) => axiosService.post(urls.home,user)
}