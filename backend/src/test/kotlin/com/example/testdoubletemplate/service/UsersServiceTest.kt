package com.example.testdoubletemplate.service

import com.example.testdoubletemplate.model.Users
import com.example.testdoubletemplate.model.UsersRecord
import com.example.testdoubletemplate.repository.UsersRepository
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import java.util.*

class UsersServiceTest{

    private lateinit var repository: UsersRepository

    private lateinit var service: UsersService

    @BeforeEach
    fun setUp(){
        repository = mockk()
        service = UsersServiceImpl(repository)
    }


    @Nested
    inner class Getメソッドのテスト{
      @Test
          fun サービスのgetUserServiceがRepositoryのfindAllを呼んでいること(){
              //given
              every { repository.findAll() } returns emptyList()
              //when
              service.getUsersService()

              //then
              verify { repository.findAll()  }
          }

          @Test
          fun サービスのgetUserServiceは正しい返り値を返す(){
              //given
              val dummyId1 = UUID.fromString("00000000-0000-0000-0000-000000000001")
              val dummyId2 = UUID.fromString("00000000-0000-0000-0000-000000000002")
              val dummyUser1 = Users(id=dummyId1,name="tanaka", nickName = "tanachu", term = 12, remark = "nezumi")
              val dummyUser2 = Users(id=dummyId2,name="tanaka2", nickName = "tanachu2", term = 122, remark = "nezumi2")
              every { repository.findAll() } returns mutableListOf(
                  UsersRecord(
                      id = dummyUser1.id,
                      name = dummyUser1.name,
                      nickName = dummyUser1.nickName,
                      term = dummyUser1.term,
                      remark = dummyUser1.remark
                  ),
                  UsersRecord(
                      id = dummyUser2.id,
                      name = dummyUser2.name,
                      nickName = dummyUser2.nickName,
                      term = dummyUser2.term,
                      remark = dummyUser2.remark
                  )
              )

              //when
              val res = service.getUsersService()

              //then
              assertEquals(dummyUser1,res[0])
              assertEquals(dummyUser2,res[1])
          }
    }

    @Nested
    inner class Postメソッドのテスト{
        @Test
        fun RepositoryのSaveメソッドを正しい引数で呼んでいるか(){
            //given
            every { repository.save(any()) } returns UsersRecord()
            val tempArg = Users(
                name = "tanaka",
                nickName = "tanachu",
                term = 12,
                remark = "nezumi"
            )
            //when
            service.postUserService(tempArg)

            //then
            verify { repository.save(match {
                it.name == "tanaka" &&
                it.nickName == "tanachu" &&
                it.term == 12 &&
                it.remark == "nezumi"
            })}
        }
    }
}