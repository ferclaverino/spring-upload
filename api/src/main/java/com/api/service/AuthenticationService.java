package com.api.service;

import org.springframework.security.core.Authentication;

public interface AuthenticationService {
  Authentication getAuthentication();
}
