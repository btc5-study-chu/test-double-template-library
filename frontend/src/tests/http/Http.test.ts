import {vi} from "vitest";
import axios from "axios";
import {http} from "../../http/Http.ts";

vi.mock('axios')
describe('Http.tsのテスト',()=>{
    test('submitHttpメソッドは、axiosのポストメソッドを正しく呼ぶ',()=>{
        const testArg = {
            name : 'tanaka',
            nickName : 'tanachu',
            term : "12",
            remark : "nezumi"
        }
        const spyAxiosPost = vi.spyOn(axios,"post")

        http.submitHttp(testArg)

        expect(spyAxiosPost).toHaveBeenCalledWith("/api/v1/users",testArg)
    })

    test('getUsersHttpメソッドはaxiosのgetメソッドを正しく呼ぶ',()=> {
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
        const spyAxiosGet = vi.spyOn(axios,"get").mockResolvedValue({
            data : stubAxiosRes
        })

        http.getUsersHttp()

        expect(spyAxiosGet).toHaveBeenCalledWith("/api/v1/users")
    })

    test('getUsersHttpメソッドはaxiosのgetメソッドの返り値のdataプロパティを返却する',async ()=> {
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
        vi.spyOn(axios,"get").mockResolvedValue({
            data : stubAxiosRes
        })

        const res = await http.getUsersHttp()

        expect(res).toEqual(stubAxiosRes)
    })
})