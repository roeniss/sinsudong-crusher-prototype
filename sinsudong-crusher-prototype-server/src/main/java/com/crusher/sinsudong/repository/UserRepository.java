package com.crusher.sinsudong.repository;

import com.crusher.sinsudong.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created By yw on 2019-09-19.
 */

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndPassword(final String email, final String password);
    User findByUserIdx(int userIdx);   Optional<User> findByEmail(String email);
}