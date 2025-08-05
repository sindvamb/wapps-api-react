package wastecnologia.wapps.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Entity @Table(schema = "sindvamb")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Address {

    @Id
    @Column(nullable = true, updatable = false)
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    
    private String zipCode;

    
    private String neighborhood;

    
    private String addressLine1;

    
    private String addressLine2;

    
    private String complement;

    @Column
    private Long number;

    
    private String city;

    
    private String district;

    
    private String uf;

    
    private String housing;

    @OneToMany(mappedBy = "address")
    private Set<Company> addressCompanies = new HashSet<>();

    @OneToMany(mappedBy = "address")
    private Set<Contact> addressContacts = new HashSet<>();

    @OneToMany(mappedBy = "address")
    private Set<User> addressUsers = new HashSet<>();

    @CreatedDate
    @Column(nullable = true, updatable = false)
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    @Column(nullable = true)
    private OffsetDateTime lastUpdated;

}
