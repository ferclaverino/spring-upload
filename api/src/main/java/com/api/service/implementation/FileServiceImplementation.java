package com.api.service.implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.persistence.storage.FileStorage;
import com.api.service.AuthenticationService;
import com.api.service.FileService;

@Service
@Profile("!unsupported-exception")
public class FileServiceImplementation implements FileService {

  Logger logger = LoggerFactory.getLogger(FileServiceImplementation.class);

  @Autowired
  private FileStorage fileStorage;

  @Autowired
  private AuthenticationService authenticationService;

  @Override
  public void save(MultipartFile file) {
    // Log when upload starts, finish and finish with error to understood what is
    // going on with uploads
    this.logInfo("starts", file);
    try {
      this.fileStorage.save(file);
      this.logInfo("finishs", file);
    } catch (RuntimeException exception) {
      this.logInfo("finishs", file, exception);
      throw exception;
    }
  }

  private void logInfo(String action, MultipartFile file) {
    String username = authenticationService.getAuthentication().getName();
    logger.info("User '{}' {} file upload: '{}' (size: {} kb).", username, action, file.getOriginalFilename(),
        file.getSize() / 1024);
  }

  private void logInfo(String action, MultipartFile file, RuntimeException exception) {
    String username = authenticationService.getAuthentication().getName();
    logger.info("User '{}' {} file upload with error: '{}', file upload: '{}' (size: {} kb).", username, action,
        exception.getMessage(),
        file.getOriginalFilename(), file.getSize() / 1024);
  }

}
