package com.crusher.sinsudong.model;

import com.crusher.sinsudong.domain.User;
import com.crusher.sinsudong.domain.UserCharacter;
import lombok.Data;

@Data
public class SignUpReq {
    private User user;
    private UserCharacter userCharacter;
}
