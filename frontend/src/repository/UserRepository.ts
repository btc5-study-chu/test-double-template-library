import {GetUser, InputObject} from "../type/TypeUserRepository.ts";
import {http} from "../http/Http.ts";


class UserRepository {
    // http: Http
    // constructor(http = new DefaultHttp()) {
    //     this.http = http
    // }
    submit(inputObject: InputObject) {
        http.submitHttp(inputObject)
    }

    async getUsers(): Promise<GetUser[]> {
        return Promise.resolve(http.getUsersHttp())
    }
}

export const userRepository = new UserRepository()

