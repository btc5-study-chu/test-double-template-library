import {GetUser, InputObject} from "../type/TypeUserRepository.ts";


class UserRepository {
    // http: Http
    // constructor(http = new DefaultHttp()) {
    //     this.http = http
    // }
    submit(inputObject: InputObject) {
        console.log(inputObject)
        // this.http.submitHttp(inputObject)
    }

    async getUsers(): Promise<GetUser[]> {
        // return Promise.resolve(this.http.getUsersHttp())
        return Promise.resolve([])
    }
}

export const userRepository = new UserRepository()

