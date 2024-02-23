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

  private static final String EXCEPTION_MESSAGE = "An exception occured, which will cause a {} response";
  private Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

  // An storage exception maps to INTERNAL_SERVER_ERROR
  // and returns ErrorDTO as response
  @ExceptionHandler({ StorageException.class })
  protected ResponseEntity<Object> handleInternalServerError(StorageException ex, WebRequest request) {
    return handleExceptionInternal(ex, new ErrorDTO(ex), new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  // Other runtime exceptions map to INTERNAL_SERVER_ERROR
  // and returns ErrorDTO as response with a message.
  // Exception message is not returned to avoid exposing sensitive information
  @ExceptionHandler({ RuntimeException.class })
  public ResponseEntity<Object> handleAll(RuntimeException ex, WebRequest request) {
    return handleExceptionInternal(ex, new ErrorDTO("We are having unexpected issues"), new HttpHeaders(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  @SuppressWarnings("null")
  @Override
  protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable Object body, HttpHeaders headers,
      HttpStatusCode statusCode, WebRequest request) {
    // Log handled errors, so there is more information for diagnosis
    if (statusCode.is5xxServerError()) {
      logger.error(EXCEPTION_MESSAGE, statusCode, ex);
    } else if (statusCode.is4xxClientError()) {
      logger.warn(EXCEPTION_MESSAGE, statusCode, ex);
    }
    return super.handleExceptionInternal(ex, body, headers, statusCode, request);
  }
}
