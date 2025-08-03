package wastecnologia.wapps.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; import jakarta.persistence.Table;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.OffsetDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity @Table(schema = "sindvamb") 
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class ContactRequest {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false, columnDefinition = "text")
    private String subject;

    @Column(nullable = false, columnDefinition = "text")
    private String profile;

    @Column(nullable = false, columnDefinition = "text")
    private String message;

    @Column(columnDefinition = "text")
    private String response;

    @Column(nullable = false)
    private Boolean hasViewd;

    @Column(nullable = false)
    private Boolean hasAnswered;

    @Column(nullable = false)
    private Boolean hasPendding;

    @Column
    private OffsetDateTime answeredDate;

    @Column(nullable = false)
    private OffsetDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id")
    private Contact contact;

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
