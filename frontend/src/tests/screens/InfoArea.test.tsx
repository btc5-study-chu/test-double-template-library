import {render, screen} from "@testing-library/react";
import {InfoArea} from "../../screens/InfoArea.tsx";
import {describe, vi} from "vitest";
import {userRepository} from "../../repository/UserRepository.ts";
import {act} from "react-dom/test-utils";


describe('InfoArea.tsxのテスト',()=>{
    describe('InfoAreaがレンダリングされた時,', () => {
        test('データ数というテキストがあること',async ()=>{
            await act(async () => {
                render(<InfoArea />)
            })

            expect(screen.getByText('データ数 :')).toBeInTheDocument()
        })

        test('テーブルヘッダーがいること',async () => {
            await act(async () => {
                render(<InfoArea />)
            })

            expect(screen.getByRole('table')).toBeInTheDocument()
            expect(screen.getByRole('columnheader',{name:"ID"})).toBeInTheDocument()
            expect(screen.getByRole('columnheader',{name:"名前"})).toBeInTheDocument()
            expect(screen.getByRole('columnheader',{name:"ニックネーム"})).toBeInTheDocument()
            expect(screen.getByRole('columnheader',{name:"FND"})).toBeInTheDocument()
            expect(screen.getByRole('columnheader',{name:"一言"})).toBeInTheDocument()
        })

        test('UserRepositoryのgetUsersを呼んでいること',async () => {
            const spyGetUsers = vi.spyOn(userRepository,"getUsers")

            await act(async () => {
                render(<InfoArea />)
            })

            expect(spyGetUsers).toHaveBeenCalled()
        })

        test('UserRepositoryのgetUsersから受け取った返り値をテーブルに表示して且つ、受け取った要素の数が表示できる',async () => {
            vi.spyOn(userRepository, "getUsers").mockResolvedValue([
                {id: "0000-001", name:"tanaka", nickName:"tanachu", term:"12",remark:"nezumi"},
                {id: "0000-002", name:"tanaka2", nickName:"tanachu2", term:"122",remark:"nezumi2"},
            ])

            await act(async () => {
                render(<InfoArea />)
            })

            expect(screen.getByText("0000-001")).toBeInTheDocument()
            expect(screen.getByText("tanaka")).toBeInTheDocument()
            expect(screen.getByText("tanachu")).toBeInTheDocument()
            expect(screen.getByText("12")).toBeInTheDocument()
            expect(screen.getByText("nezumi")).toBeInTheDocument()

            expect(screen.getByText("0000-002")).toBeInTheDocument()
            expect(screen.getByText("tanaka2")).toBeInTheDocument()
            expect(screen.getByText("tanachu2")).toBeInTheDocument()
            expect(screen.getByText("122")).toBeInTheDocument()
            expect(screen.getByText("nezumi2")).toBeInTheDocument()
            expect(screen.getByText('2')).toBeInTheDocument()
        })
    })
})