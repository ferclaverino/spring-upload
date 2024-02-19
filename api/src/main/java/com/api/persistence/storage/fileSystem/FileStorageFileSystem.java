package com.api.persistence.storage.fileSystem;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.api.persistence.model.StorageException;
import com.api.persistence.model.StorageFileSystemProperties;
import com.api.persistence.storage.FileStorage;

@Component
@Profile("!storage-exception")
public class FileStorageFileSystem implements FileStorage {
	private Path location;

	@Autowired
	public FileStorageFileSystem(StorageFileSystemProperties properties) {
		this.location = Paths.get(properties.location());
	}

	@Override
	public void save(MultipartFile file) {
		Path destinationFile = this.location.resolve(
				Paths.get(file.getOriginalFilename()))
				.normalize().toAbsolutePath();

		try (InputStream inputStream = file.getInputStream()) {
			Files.copy(inputStream, destinationFile,
					StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException exception) {
			throw new StorageException("Can't save file", exception);
		}
	}

}
