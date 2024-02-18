package com.api.persistence.storage;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorage {
    void save(MultipartFile file);
}