package com.api.persistence.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationProperties(prefix = "storage.file-system")
@ConfigurationPropertiesScan
public record StorageFileSystemProperties(String location) {
}