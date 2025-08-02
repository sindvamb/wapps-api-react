package wastecnologia.wapps.api.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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


@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Company {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column
    private OffsetDateTime foundationDate;

    @Column(nullable = false, columnDefinition = "text")
    private String cpfCnpj;

    @Column(nullable = false)
    private Integer size;

    @Column(nullable = false, columnDefinition = "text")
    private String corporateName;

    @Column(columnDefinition = "text")
    private String stateRegistration;

    @Column(columnDefinition = "text")
    private String municipalRegistration;

    @Column(columnDefinition = "text")
    private String mainCnaeCode;

    @Column(columnDefinition = "text")
    private String mainCnaeDescription;

    @Column(columnDefinition = "text")
    private String legalNatureCode;

    @Column(columnDefinition = "text")
    private String legalNatureDescription;

    @Column(nullable = false)
    private Integer status;

    @Column(nullable = false)
    private Boolean hasGovBrRegistration;

    @Column(nullable = false)
    private Boolean hasDigitalCertificate;

    @Column(columnDefinition = "text")
    private String tradeName;

    @Column(nullable = false)
    private Boolean hasLogo;

    @Column(nullable = false)
    private Boolean hasVisualIdentity;

    @Column(columnDefinition = "text")
    private String inpiRegistration;

    @Column(columnDefinition = "text")
    private String businessLaw;

    @Column
    private Integer employeesCount;

    @Column
    private Integer youngApprenticesCount;

    @Column(nullable = false)
    private Boolean usesESocial;

    @Column(columnDefinition = "text")
    private String sebraeTraining;

    @Column(columnDefinition = "text")
    private String senacTraining;

    @Column(columnDefinition = "text")
    private String anvisaTraining;

    @Column(columnDefinition = "text")
    private String civilDefenseTraining;

    @Column(columnDefinition = "text")
    private String website;

    @Column(columnDefinition = "text")
    private String email;

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
    private OffsetDateTime paymentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(mappedBy = "company")
    private Set<CompanyContact> companyCompanyContacts = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "company")
    private Set<Employee> companyEmployees = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Equipament> companyEquipaments = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<EventCustomer> companyEventCustomers = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<EventEmployee> companyEventEmployees = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<EventEquipament> companyEventEquipaments = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<EventMenu> companyEventMenus = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<EventMenuItem> companyEventMenuItems = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<FileControl> companyFileControls = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Menu> companyMenus = new HashSet<>();

    @OneToMany(mappedBy = "company")
    private Set<Portfolio> companyPortfolios = new HashSet<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = false)
    private OffsetDateTime lastUpdated;

}
