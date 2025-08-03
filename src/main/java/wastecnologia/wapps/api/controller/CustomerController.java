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
import wastecnologia.wapps.api.domain.entity.CustomerType;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.CustomerDTO;
import wastecnologia.wapps.api.repository.CustomerTypeRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.service.CustomerService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/customers", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerTypeRepository customerTypeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final UserRepository userRepository;

    public CustomerController(final CustomerService customerService,
            final CustomerTypeRepository customerTypeRepository,
            final PartnerUnitRepository partnerUnitRepository,
            final UserRepository userRepository) {
        this.customerService = customerService;
        this.customerTypeRepository = customerTypeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        return ResponseEntity.ok(customerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(customerService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCustomer(@RequestBody @Valid final CustomerDTO customerDTO) {
        final UUID createdId = customerService.create(customerDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateCustomer(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final CustomerDTO customerDTO) {
        customerService.update(id, customerDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCustomer(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = customerService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        customerService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customerTypeValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerTypeValues() {
        return ResponseEntity.ok(customerTypeRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(CustomerType::getId, CustomerType::getId)));
    }

    @GetMapping("/partnerUnitValues")
    public ResponseEntity<Map<UUID, UUID>> getPartnerUnitValues() {
        return ResponseEntity.ok(partnerUnitRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(PartnerUnit::getId, PartnerUnit::getId)));
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
