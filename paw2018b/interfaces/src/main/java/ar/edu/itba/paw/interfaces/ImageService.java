package ar.edu.itba.paw.interfaces;

import java.util.List;

import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.springframework.http.ResponseEntity;

import ar.edu.itba.paw.models.UploadFile;

public interface ImageService {
	
	public int create(List<FormDataBodyPart> bodyParts, long publicationid);
	
	public ResponseEntity<byte[]> loadImage(UploadFile image);

	public UploadFile findByIndexAndId(long id, int index);

	public UploadFile findByUploadId(long id);

	public List<UploadFile> findAllById(long id);

}
