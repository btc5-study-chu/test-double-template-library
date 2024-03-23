import {GetUser, InputObject} from "../type/TypeUserRepository.ts";
import axios from "axios";



class Http  {
    async submitHttp(inputObject: InputObject) {
        await axios.post("/api/v1/users",inputObject)
    }
    async getUsersHttp(): Promise<GetUser[]> {
        const res = await axios.get("/api/v1/users")
        return res.data
    }
}

export const http = new Http()