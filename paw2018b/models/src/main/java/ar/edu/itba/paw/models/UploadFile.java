package ar.edu.itba.paw.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name = "images")
public class UploadFile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "images_imageid_seq")
	@SequenceGenerator(sequenceName = "images_imagesid_seq", name = "images_imageid_seq", allocationSize = 1)
	@Column(name="imageid")
    private long imageid;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "publicationid", nullable = false)
    private Publication publication;
	
	@Lob
	@Column(name = "file_data")
    private byte[] data;
    
    public UploadFile() { }	
    
    public UploadFile(byte[] data) {
    	this.data = data;
    }
    
    public UploadFile(Integer imageid, byte[] data) {
    	this.imageid = imageid;
    	this.data = data;
    }	
    

    public long getimageid() {
        return imageid;
    }
 
    public void setimageid(long imageid) {
        this.imageid = imageid;
    }
 
    public Publication getPublication() {
        return publication;
    }
 
    public void setPublication(Publication publication) {
        this.publication = publication;
    }

    public byte[] getData() {
        return data;
    }
 
    public void setData(byte[] data) {
        this.data = data;
    }
}