package com.crusher.sinsudong.api;

import com.crusher.sinsudong.domain.User;
import com.crusher.sinsudong.model.DefaultRes;
import com.crusher.sinsudong.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.crusher.sinsudong.model.DefaultRes.FAIL_DEFAULT_RES;

/**
 * Created By yw on 2019-09-19.
 */

@Slf4j
@RestController
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public ResponseEntity<DefaultRes> signUp(@RequestBody final User user) {
        try {
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/email/check")
    public ResponseEntity<DefaultRes> checkEmail(@RequestParam("email") final String email) {
        try {
            return new ResponseEntity<>(userService.validateEmail(email), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
