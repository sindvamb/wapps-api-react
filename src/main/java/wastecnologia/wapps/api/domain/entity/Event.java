package wastecnologia.wapps.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; import jakarta.persistence.Table;
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


@Entity @Table(schema = "sindvamb")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Event {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String placeRealization;

    
    private String address;

    @Column(nullable = false)
    private String description;

    
    private String eventType;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String uf;

    @Column(nullable = false)
    private String programing;

    @Column(nullable = false)
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
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
