package com.api.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.api.persistence.storage.FileStorage;

@RestController
@RequestMapping("/files")
public class FileController {

	@Autowired
	private FileStorage fileStorage;

	@PostMapping("/upload")
	public ResponseEntity<Void> upload(@RequestParam("file") MultipartFile file) {
		this.fileStorage.save(file);
		return ResponseEntity.noContent().build();
	}

}
