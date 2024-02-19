package com.api.service.implementation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.persistence.storage.FileStorage;
import com.api.service.FileService;
import com.api.web.controller.ApiExceptionHandler;

@Service
@Profile("!unsupported-exception")
public class FileServiceImplementation implements FileService {

  Logger logger = LoggerFactory.getLogger(ApiExceptionHandler.class);

  @Autowired
  private FileStorage fileStorage;

  @Override
  public void save(MultipartFile file) {
    this.logInfo("starts", file);
    this.fileStorage.save(file);
    this.logInfo("finishs", file);

  }

  private void logInfo(String action, MultipartFile file) {
    logger.info("User {} file upload: '{}' (size: {} kb).", action, file.getOriginalFilename(), file.getSize() / 1024);
  }

}
