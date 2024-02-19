package com.api.web.exception;

public class ErrorDTO {
  private String message;

  public ErrorDTO(RuntimeException exception) {
    this.message = exception.getMessage();
  }

  public ErrorDTO(String message) {
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

}
