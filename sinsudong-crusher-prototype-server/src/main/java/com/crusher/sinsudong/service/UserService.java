package com.crusher.sinsudong.service;


import com.crusher.sinsudong.domain.User;
import com.crusher.sinsudong.domain.UserCharacter;
import com.crusher.sinsudong.model.DefaultRes;
import com.crusher.sinsudong.model.SignUpReq;
import com.crusher.sinsudong.model.UserRes;
import com.crusher.sinsudong.repository.UserCharacterRepository;
import com.crusher.sinsudong.repository.UserRepository;
import com.crusher.sinsudong.utils.AES256Util;
import com.crusher.sinsudong.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Created By yw on 2019-09-25.
 */

@Slf4j
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserCharacterRepository userCharacterRepository;

    public UserService(final UserRepository userRepository,
                       final UserCharacterRepository userCharacterRepository) {
        this.userRepository = userRepository;
        this.userCharacterRepository = userCharacterRepository;
    }

    /**
     * 마이 페이지 조회
     * 내가 스크랩 한 글 갯수
     * 내 피드들 조회
     * @param userIdx
     * @return
     */
    public DefaultRes<User> findByUserIdx(final int userIdx) {
        final Optional<User> user = userRepository.findById(userIdx);
        return user.map(value -> DefaultRes.res(StatusCode.OK, "사용자 정보 조회 완료", value))
                .orElseGet(() -> DefaultRes.res(StatusCode.NOT_FOUND, "사용자를 찾을 수 없습니다."));
    }


    public DefaultRes<List<UserRes>> findAllUsers() {
        final List<User> users = userRepository.findAll();
        final List<UserRes> userResList = new ArrayList<>();

        for (User user: users) {
            if(userCharacterRepository.findByUserIdx(user.getUserIdx()).isPresent()){
                UserRes userRes = new UserRes();
                userRes.setUser(user);
                userRes.setUserCharacter(userCharacterRepository.findByUserIdx(user.getUserIdx()).get());
                userResList.add(userRes);
            }
        }
        return DefaultRes.res(StatusCode.OK, "사용자 정보 조회 완료", userResList);
    }

    /**
     * 회원 정보 저장
     * @param SignUpReq signUpReq
     * @return
     */
    public DefaultRes saveUser(final SignUpReq signUpReq){
        try {
            User user = signUpReq.getUser();
            UserCharacter userCharacter = signUpReq.getUserCharacter();

            AES256Util aes256Util = new AES256Util("SINSUDONG-SERVER-ENCRYPT");
            user.setPassword(aes256Util.encrypt(user.getPassword()));
            userRepository.save(user);

            userCharacter.setUserIdx(user.getUserIdx());
            userCharacterRepository.save(userCharacter);
            return DefaultRes.res(StatusCode.CREATED, "회원 가입 완료");
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, "데이터베이스 에러");
        }
    }

    /**
     * 이메일 중복 확인
     * @param email
     * @return
     */
    public DefaultRes validateEmail(final String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.map(value -> DefaultRes.res(StatusCode.BAD_REQUEST, "중복된 이메일입니다.")).orElseGet(() -> DefaultRes.res(StatusCode.OK, "사용 가능 합니다."));
    }
}
