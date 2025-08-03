package wastecnologia.wapps.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity; import jakarta.persistence.Table;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

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
public class Order {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String sigla;

    @Column(columnDefinition = "text")
    private String protocol;

    @Column
    private OffsetDateTime dueDate;

    @Column
    private Boolean enabled;

    @Column
    private Integer orderIndex;

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

    @OneToMany(mappedBy = "order")
    private Set<CustomerOrder> orderCustomerOrders = new HashSet<>();

    @OneToMany(mappedBy = "order")
    private Set<OrderEmail> orderOrderEmails = new HashSet<>();

    @OneToMany(mappedBy = "order")
    private Set<OrderFileControl> orderOrderFileControls = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_status_id", nullable = false)
    private OrderStatus orderStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_type_id", nullable = false)
    private OrderType orderType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_unit_id", nullable = false)
    private PartnerUnit partnerUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_area_id", nullable = false)
    private ProductArea productArea;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", nullable = false)
    private ProductCategory productCategory;

    @OneToMany(mappedBy = "order")
    private Set<OrderProperty> orderOrderProperties = new HashSet<>();

    @OneToMany(mappedBy = "order")
    private Set<OrderTracking> orderOrderTrackings = new HashSet<>();

    @OneToMany(mappedBy = "order")
    private Set<Ticket> orderTickets = new HashSet<>();

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
