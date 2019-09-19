package com.crusher.sinsudong.utils.auth;

import java.lang.annotation.*;

/**
 * Created By ds on 2019-08-16.
 */

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface Auth {
}