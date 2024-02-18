package com.api.web.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.api.persistence.model.StorageException;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({ StorageException.class })
  protected ResponseEntity<Object> handleInternalServerError(
      StorageException ex, WebRequest request) {
    return handleExceptionInternal(ex, ex.getMessage(),
        new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

}
