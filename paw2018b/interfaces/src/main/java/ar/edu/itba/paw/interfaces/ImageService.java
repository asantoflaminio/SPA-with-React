package ar.edu.itba.paw.interfaces;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import ar.edu.itba.paw.models.UploadFile;

public interface ImageService {

	public List<UploadFile> create(CommonsMultipartFile[] fileUpload, long publicationid);

	public UploadFile findByIndexAndId(long id, int index);

	public UploadFile findByUploadId(long id);

	public List<UploadFile> findAllById(long id);

	public ResponseEntity<byte[]> loadImage(UploadFile image);

}
