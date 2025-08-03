package wastecnologia.wapps.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; import jakarta.persistence.Table;
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


@Entity @Table(schema = "sindvamb")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class EmailHistory {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column
    private UUID userId;

    @Column(nullable = false)
    private Boolean isSuccess;

    @Column(nullable = false, columnDefinition = "text")
    private String reason;

    @Column(nullable = false, columnDefinition = "text")
    private String email;

    @Column(nullable = false, columnDefinition = "text")
    private String templateKey;

    @Column(nullable = false, columnDefinition = "text")
    private String data;

    @Column(nullable = false, columnDefinition = "text")
    private String ipAddress;

    @Column(nullable = false, columnDefinition = "text")
    private String messageId;

    @Column(nullable = false)
    private OffsetDateTime date;

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
