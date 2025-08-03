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
public class Customer {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

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

    @Column
    private UUID companyId;

    @OneToMany(mappedBy = "customer")
    private Set<Company> customerCompanies = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_type_id")
    private CustomerType customerType;

    @OneToMany(mappedBy = "customer")
    private Set<CustomerOrder> customerCustomerOrders = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_unit_id")
    private PartnerUnit partnerUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "customer")
    private Set<Dependent> customerDependents = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    private Set<EventCustomer> customerEventCustomers = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    private Set<Ticket> customerTickets = new HashSet<>();

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
