package com.api.web.model;

public class ErrorDTO {
  private String message;
  private String localizedMessage;

  public ErrorDTO(RuntimeException exception) {
    this.message = exception.getMessage();
    this.localizedMessage = exception.getLocalizedMessage();
  }

  public String getMessage() {
    return this.message;
  }

  public String getLocalizedMessage() {
    return this.localizedMessage;
  }
}
