package wastecnologia.wapps.api.rest;

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
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.model.DependentDTO;
import wastecnologia.wapps.api.repos.CustomerRepository;
import wastecnologia.wapps.api.service.DependentService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/dependents", produces = MediaType.APPLICATION_JSON_VALUE)
public class DependentResource {

    private final DependentService dependentService;
    private final CustomerRepository customerRepository;

    public DependentResource(final DependentService dependentService,
            final CustomerRepository customerRepository) {
        this.dependentService = dependentService;
        this.customerRepository = customerRepository;
    }

    @GetMapping
    public ResponseEntity<List<DependentDTO>> getAllDependents() {
        return ResponseEntity.ok(dependentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DependentDTO> getDependent(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(dependentService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createDependent(
            @RequestBody @Valid final DependentDTO dependentDTO) {
        final UUID createdId = dependentService.create(dependentDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateDependent(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final DependentDTO dependentDTO) {
        dependentService.update(id, dependentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteDependent(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = dependentService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        dependentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/customerValues")
    public ResponseEntity<Map<UUID, UUID>> getCustomerValues() {
        return ResponseEntity.ok(customerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Customer::getId, Customer::getId)));
    }

}
