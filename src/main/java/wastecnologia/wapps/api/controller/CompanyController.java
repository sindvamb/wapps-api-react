package wastecnologia.wapps.api.controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.dto.CompanyDTO;
import wastecnologia.wapps.api.repository.AddressRepository;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.service.CompanyService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/companies", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompanyController {

    private final CompanyService companyService;
    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;

    public CompanyController(final CompanyService companyService,
            final AddressRepository addressRepository,
            final CustomerRepository customerRepository) {
        this.companyService = companyService;
        this.addressRepository = addressRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        return ResponseEntity.ok(companyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompany(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(companyService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCompany(@RequestBody @Valid final CompanyDTO companyDTO) {
        final UUID createdId = companyService.create(companyDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateCompany(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final CompanyDTO companyDTO) {
        companyService.update(id, companyDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCompany(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = companyService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/addressValues")
    public ResponseEntity<Map<UUID, UUID>> getAddressValues() {
        return ResponseEntity.ok(addressRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Address::getId, Address::getId)));
    }

    @GetMapping("/customerValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerValues() {
        return ResponseEntity.ok(customerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Customer::getId, Customer::getId)));
    }

}
