package com.api.service.implementation;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.api.service.AuthenticationService;

@Service
public class AuthenticationServiceSpring implements AuthenticationService {

  @Override
  public Authentication getAuthentication() {
    return SecurityContextHolder.getContext().getAuthentication();
  }

}