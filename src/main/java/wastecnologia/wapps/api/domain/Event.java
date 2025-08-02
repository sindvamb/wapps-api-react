package wastecnologia.wapps.api.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
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
public class Event {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false, columnDefinition = "text")
    private String name;

    @Column(nullable = false, columnDefinition = "text")
    private String placeRealization;

    @Column(columnDefinition = "text")
    private String address;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String eventType;

    @Column(nullable = false, columnDefinition = "text")
    private String city;

    @Column(nullable = false, columnDefinition = "text")
    private String uf;

    @Column(nullable = false, columnDefinition = "text")
    private String programing;

    @Column(nullable = false, columnDefinition = "text")
    private String assemblyInstructions;

    @Column
    private OffsetDateTime partyPaymentDate;

    @Column
    private OffsetDateTime partyDate;

    @Column
    private LocalTime timeStart;

    @Column
    private LocalTime timeEnd;

    @Column(precision = 10, scale = 2)
    private BigDecimal tentValue;

    @Column(precision = 10, scale = 2)
    private BigDecimal circulatingValue;

    @Column
    private UUID creatorId;

    @Column
    private UUID modifierId;

    @Column
    private UUID deleterId;

    @Column(nullable = false)
    private Boolean isDeleted;

    @Column
    private OffsetDateTime createdAt;

    @Column
    private OffsetDateTime updatedAt;

    @Column
    private OffsetDateTime deletedAt;

    @OneToMany(mappedBy = "event")
    private Set<EventCustomer> eventEventCustomers = new HashSet<>();

    @OneToMany(mappedBy = "event")
    private Set<FileControl> eventFileControls = new HashSet<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

}
