package com.api.persistence.storage.fileSystem;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.api.persistence.model.StorageException;
import com.api.persistence.storage.FileStorage;

@Component
@Profile("storage-exception")
public class FileStorageWithException implements FileStorage {

	@Override
	public void save(MultipartFile file) {
		throw new StorageException("Can't save file, storage is out");
	}

}
