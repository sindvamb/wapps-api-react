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
public class User {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @Column
    private Integer matricula;

    @Column(nullable = false)
    private String name;

    
    private String socialName;

    
    private String surname;

    
    private String gender;

    
    private String birthplace;

    
    private String civilStatus;

    
    private String fatherName;

    
    private String motherName;

    
    private String nationality;

    
    private String rg;

    
    private String ufIssuingBody;

    @Column(nullable = false)
    private String cpfCnpj;

    
    private String email;

    
    private String password;

    
    private String race;

    
    private String profession;

    
    private String cellPhone;

    
    private String homePhone;

    
    private String businessPhone;

    @Column(nullable = false)
    private Boolean hasSpecialNeeds;

    
    private String specialNeedsOther;

    @Column(nullable = false)
    private Boolean isSystem;

    @Column
    private Boolean isCustomer;

    
    private String securelyPhrase;

    @Column
    private Integer loginAttemps;

    @Column
    private Boolean passwordPolicyEnabled;

    @Column(nullable = false)
    private OffsetDateTime birthdate;

    @Column
    private OffsetDateTime lastLoginAt;

    @Column
    private OffsetDateTime lastPasswordChangedAt;

    @Column
    private UUID passwordResetToken;

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

    @OneToMany(mappedBy = "user")
    private Set<Audit> userAudits = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<Customer> userCustomers = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<FileControl> userFileControls = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<LoginHistory> userLoginHistories = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<PasswordHistory> userPasswordHistories = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<RegistrationRequest> userRegistrationRequests = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<SpecialNeeds> userSpecialNeedses = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "education_degree_id")
    private EducationDegree educationDegree;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_unit_id")
    private PartnerUnit partnerUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_status_id")
    private UserStatus userStatus;

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
