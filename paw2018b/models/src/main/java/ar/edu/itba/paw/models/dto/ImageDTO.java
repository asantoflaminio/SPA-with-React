package ar.edu.itba.paw.models.dto;

public class ImageDTO {
	private long publicationID;
	private int index;
	private byte[] data;
	
	public ImageDTO() {}

	public long getPublicationID() {
		return publicationID;
	}

	public void setPublicationID(long publicationID) {
		this.publicationID = publicationID;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
