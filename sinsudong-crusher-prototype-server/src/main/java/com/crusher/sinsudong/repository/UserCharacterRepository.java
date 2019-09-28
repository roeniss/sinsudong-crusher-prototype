package com.crusher.sinsudong.repository;

import com.crusher.sinsudong.domain.User;
import com.crusher.sinsudong.domain.UserCharacter;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created By yw on 2019-09-19.
 */

public interface UserCharacterRepository extends JpaRepository<UserCharacter, Integer> {
}
