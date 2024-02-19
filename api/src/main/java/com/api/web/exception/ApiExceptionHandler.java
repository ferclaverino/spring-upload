package com.api.web.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.api.persistence.model.StorageException;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

  Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

  @ExceptionHandler({ StorageException.class })
  protected ResponseEntity<Object> handleInternalServerError(StorageException ex, WebRequest request) {
    return handleExceptionInternal(ex, new ErrorDTO(ex), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  @ExceptionHandler({ Exception.class })
  public ResponseEntity<Object> handleAll(Exception ex, WebRequest request) {
    return handleExceptionInternal(ex, new ErrorDTO("Sorry, we are having unexpected issues"), new HttpHeaders(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  @Override
  protected ResponseEntity<Object> handleExceptionInternal(
      Exception ex, @Nullable Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
    if (statusCode.is5xxServerError()) {
      logger.error("An exception occured, which will cause a {} response", statusCode, ex);
    } else if (statusCode.is4xxClientError()) {
      logger.warn("An exception occured, which will cause a {} response", statusCode, ex);
    } else {
      logger.warn("An exception occured, which will cause a {} response", statusCode, ex);
    }
    return super.handleExceptionInternal(ex, body, headers, statusCode, request);
  }
}
