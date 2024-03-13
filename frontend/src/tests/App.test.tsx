import {render} from "@testing-library/react"
import App from "../App.tsx";
import {describe, test, vi} from "vitest";
import {PostArea} from "../screens/PostArea.tsx"
import {InfoArea} from "../screens/InfoArea.tsx";

vi.mock("../screens/InfoArea.tsx")
vi.mock("../screens/PostArea.tsx")
describe("App.tsxのテスト",() => {
    test("App.tsxをレンダリングするとPostAreaコンポーネントをレンダリングする",() => {

        //when
        render(<App />)

        //then
        expect(PostArea).toHaveBeenCalled()

        vi.restoreAllMocks()
    })

    test('App.tsxをレンダリングするとInfoAreaコンポーネントをレンダリングする', () => {
        render(<App />)


        expect(InfoArea).toHaveBeenCalled()
    })
})
