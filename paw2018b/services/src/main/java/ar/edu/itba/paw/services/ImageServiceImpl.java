package ar.edu.itba.paw.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.BodyPartEntity;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ImageDao;
import ar.edu.itba.paw.interfaces.ImageService;
import ar.edu.itba.paw.models.UploadFile;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageDao imageDao;

	@Autowired
	private ServletContext servletContext;

	public static Integer MAX_IMAGES = 15;

	@Override
	public int create(List<FormDataBodyPart> bodyParts, long publicationid) {
		byte[] bytes = null;
		int filesUploaded = 0;
		for (int i = 0; i < bodyParts.size(); i++) {
			BodyPartEntity bodyPartEntity = (BodyPartEntity) bodyParts.get(i).getEntity();
			try {
				bytes = IOUtils.toByteArray(bodyPartEntity.getInputStream());
				imageDao.create(bytes, publicationid);
				filesUploaded++;
			} catch (IOException e) {
				return filesUploaded;
			}
		}
		return filesUploaded;

	}

	@Override
	public ResponseEntity<byte[]> loadImage(UploadFile image) {

		try {
			if (image == null) {
				String relativeWebPath = "/resources/pics/default.jpg";
				InputStream input = servletContext.getResourceAsStream(relativeWebPath);
				byte[] fileContent = IOUtils.toByteArray(input);
				final HttpHeaders headers = new HttpHeaders();
				headers.setContentType(MediaType.IMAGE_JPEG);
				return new ResponseEntity<byte[]>(fileContent, headers, HttpStatus.OK);
			}

			final HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.IMAGE_JPEG);
			return new ResponseEntity<byte[]>(image.getData(), headers, HttpStatus.OK);

		} catch (Exception ex) {
			ex.printStackTrace();
			final HttpHeaders headers = new HttpHeaders();
			return new ResponseEntity<byte[]>(null, headers, HttpStatus.NOT_FOUND);
		}

	}

	@Override
	public UploadFile findByIndexAndId(long id, int index) {
		return imageDao.findByIndexAndId(id, index);
	}

	@Override
	public UploadFile findByUploadId(long id) {
		return imageDao.findByUploadId(id);
	}

	@Override
	public List<UploadFile> findAllById(long id) {
		return imageDao.findAllById(id);
	}

}
