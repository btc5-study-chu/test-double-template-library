package com.example.testdoubletemplate.controller

import com.example.testdoubletemplate.model.Users
import com.example.testdoubletemplate.service.UsersService
import io.mockk.called
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.mockito.Mock
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import java.util.*

@SpringBootTest
//@AutoConfigureMockMvc
class UsersControllerTest{

//    @InjectMocks
    private lateinit var controller: UsersController

//    @Autowired
    private lateinit var mockMvc: MockMvc

    @Mock
    private lateinit var service : UsersService

    @BeforeEach
    fun setUp () {
        service = mockk()
        controller = UsersController(service)
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build()
    }


    @Nested
    inner class `getメソッドのテスト` {
        @Test
        fun `api_v1_usersにGetメソッドでアクセスするとstatus200OKが返ってくる` () {
            //given
            every { service.getUsersService() } returns emptyList()

            //when
            mockMvc.perform(
                get("/api/v1/users")
            )
            //then
                .andExpect(status().isOk)
        }

        @Test
        fun サービス層のgetUsersメソッドを呼んでいること(){
            every { service.getUsersService() } returns emptyList()

            mockMvc.perform(
                get("/api/v1/users")
            )

            verify { service.getUsersService() to called }
        }

        @Test
        fun Getメソッドの返り値が正しい型のListであること(){
            //given
            val dummyId = UUID.fromString("00000000-0000-0000-0000-000000000001")
            every { service.getUsersService() } returns listOf(
                Users(
                    id = dummyId,
                    name = "tanaka",
                    nickName = "tanachu",
                    term = 12,
                    remark = "nezumi"
                )
            )

            //when
            mockMvc.perform(
                get("/api/v1/users")
            )
                //then
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").value(dummyId.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("tanaka"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].nickName").value("tanachu"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].term").value(12))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].remark").value("nezumi"))
        }
    }
//
    @Nested
    inner class `Postメソッド` {
        @Test
        fun `should return statusOK(statusCode 200) when POST to api_v1_users `() {
            every { service.postUserService(any()) } returns Unit

            mockMvc.perform(
                post("/api/v1/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                            {
                        "name": "tanaka",
                        "nickName": "tanachu",
                        "term" : 12,
                        "remark" : "nezumi"
                            }
                            """
                    )
            )

                .andExpect(status().isOk)
        }

        @Test
        fun `should call postUserService with correct argument when POST to api_v1_users `() {
            //given
            every { service.postUserService(any()) } returns Unit

            //when
            mockMvc.perform(
                post("/api/v1/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        """
                            {
                        "name": "tanaka",
                        "nickName": "tanachu",
                        "term" : 12,
                        "remark" : "nezumi"
                            }
                            """
                    )
            )

            verify { service.postUserService(
                Users(
                    id = null,
                    name = "tanaka",
                    nickName = "tanachu",
                    term = 12,
                    remark = "nezumi"
                ))}
        }
    }
}
