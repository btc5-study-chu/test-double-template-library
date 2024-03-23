import {expect, vi} from "vitest";
import {InputObjectBuilder} from "../__test-helper__/InputObjectBuilder.ts";
import {http} from "../../http/Http.ts";
import {userRepository} from "../../repository/UserRepository.ts";


vi.mock('axios')
vi.mock("../../http/Http.ts")
describe('UserRepositoryのテスト',() => {
    afterEach(()=>{
        vi.restoreAllMocks()
    })

    test('UserRepositoryのsubmitメソッドは、正しい引数でHttpのsubmitHttpsを呼ぶ',() => {
        const spyHttpSubmit = vi.spyOn(http, "submitHttp")
        const testArg = new InputObjectBuilder()
            .setName('tanaka')
            .setNickname('tanachu')
            .setTerm('12')
            .setRemark('nezumi')
            .build()

        userRepository.submit(testArg)

        expect(spyHttpSubmit).toHaveBeenCalledWith(testArg)
    })

    test('UserRepositoryのgetUsersメソッドは、HttpのgetUsersHttpを呼ぶ',async () => {
        const spyHttpGetUser = vi.spyOn(http, "getUsersHttp")

        await userRepository.getUsers()

        expect(spyHttpGetUser).toHaveBeenCalled()
    })

    test('UserRepositoryのgetUsersメソッドは、HttpのgetUsersHttpから受け取った値を返す',async () => {

        const stubAxiosRes = [{
            id: '123456789',
            name: 'tanaka',
            nickName: 'tanachu',
            term: '12',
            remark: 'nezumi'
        }, {
            id: 'ABCDEF',
            name: 'matsui',
            nickName: 'nao',
            term: '12',
            remark: 'akarui'
        }]
        vi.spyOn(http,"getUsersHttp").mockResolvedValue(stubAxiosRes)


        const res = await userRepository.getUsers()

        expect(res[0]).toEqual({
            id: '123456789',
            name: 'tanaka',
            nickName: 'tanachu',
            term: '12',
            remark: 'nezumi'
        })
        expect(res[1]).toEqual({
            id: 'ABCDEF',
            name: 'matsui',
            nickName: 'nao',
            term: '12',
            remark: 'akarui'
        })
    })
})