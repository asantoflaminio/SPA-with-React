package ar.edu.itba.paw.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.commons.io.IOUtils;
import org.glassfish.jersey.media.multipart.BodyPartEntity;
import org.glassfish.jersey.media.multipart.FormDataBodyPart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ar.edu.itba.paw.interfaces.ImageDao;
import ar.edu.itba.paw.interfaces.ImageService;
import ar.edu.itba.paw.models.UploadFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageDao imageDao;

	@Autowired
	private ServletContext servletContext;

	public static Integer MAX_IMAGES = 15;

	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public List<UploadFile> create(CommonsMultipartFile[] fileUpload, long publicationid) {
		List<UploadFile> uploadImages = new ArrayList<UploadFile>();
		final long limit = 20 * 1024 * 1024; // 20MB
		if (fileUpload != null && fileUpload.length > 0) {
			for (CommonsMultipartFile aFile : fileUpload) {
				if (aFile.getSize() < limit && aFile.getBytes().length > 0) {
					if (aFile.getContentType().equals("image/jpeg")) {
						uploadImages.add(imageDao.create(aFile.getBytes(), publicationid));
					}
				}
			}
		} else {
			LOGGER.debug("Failed to upload the images requested");
		}
		return uploadImages;
	}

	public void create(byte[] bytes, long publicationid) {
		imageDao.create(bytes, publicationid);
	}

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
			// return null;
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
