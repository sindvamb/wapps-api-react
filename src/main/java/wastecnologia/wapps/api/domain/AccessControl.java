package wastecnologia.wapps.api.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import java.time.OffsetDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class AccessControl {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column
    private UUID userId;

    @Column(columnDefinition = "text")
    private String userName;

    @Column
    private OffsetDateTime connectionTime;

    @Column
    private OffsetDateTime lastBeatTime;

    @Column
    private String dur;

    @Column(columnDefinition = "text")
    private String ip;

    @Column(columnDefinition = "text")
    private String city;

    @Column(columnDefinition = "text")
    private String os;

    @Column(columnDefinition = "text")
    private String device;

    @Column(columnDefinition = "text")
    private String browser;

    @Column(columnDefinition = "text")
    private String language;

    @Column(columnDefinition = "text")
    private String engine;

    @Column(columnDefinition = "text")
    private String requestUrl;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

}
