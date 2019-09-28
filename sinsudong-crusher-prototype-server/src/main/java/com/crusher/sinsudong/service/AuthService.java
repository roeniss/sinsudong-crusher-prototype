package com.crusher.sinsudong.service;

import com.crusher.sinsudong.domain.User;
import com.crusher.sinsudong.model.DefaultRes;
import com.crusher.sinsudong.model.LoginReq;
import com.crusher.sinsudong.model.LoginRes;
import com.crusher.sinsudong.repository.UserRepository;
import com.crusher.sinsudong.utils.AES256Util;
import com.crusher.sinsudong.utils.StatusCode;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(final UserRepository userRepository, final JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public DefaultRes login(final LoginReq loginReq) {
        try{
            AES256Util aes256Util = new AES256Util("SINSUDONG-SERVER-ENCRYPT");
            Optional<User> user = userRepository.findByEmailAndPassword(loginReq.getEmail(),
                    aes256Util.encrypt(loginReq.getPassword()));
            LoginRes loginRes = new LoginRes();
            if(user.isPresent()) {
                loginRes.setToken(jwtService.create(user.get().getUserIdx()));
                loginRes.setName(user.get().getName());
                return DefaultRes.res(StatusCode.CREATED, "로그인 성공", loginRes);
            }
            return DefaultRes.res(StatusCode.UNAUTHORIZED, "로그인 실패");
        }
        catch(Exception e){
            return DefaultRes.res(StatusCode.UNAUTHORIZED, "로그인 실패");
        }
    }

    public int authorization(final String jwt) {
        final int userIdx = jwtService.decode(jwt).getUser_idx();
        if(userIdx == -1) return -1;

        final Optional<User> user = userRepository.findById(userIdx);
        if(!user.isPresent()) return -1;

        return userIdx;
    }
}