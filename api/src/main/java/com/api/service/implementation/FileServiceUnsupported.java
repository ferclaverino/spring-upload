package com.api.service.implementation;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.service.FileService;

@Service
@Profile("unsupported-exception")
public class FileServiceUnsupported implements FileService {

  @Override
  public void save(MultipartFile file) {
    throw new UnsupportedOperationException("Unimplemented method 'save'");
  }
}
