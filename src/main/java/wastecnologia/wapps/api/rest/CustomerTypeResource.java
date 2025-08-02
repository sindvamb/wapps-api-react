package wastecnologia.wapps.api.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
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
import wastecnologia.wapps.api.model.CustomerTypeDTO;
import wastecnologia.wapps.api.service.CustomerTypeService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/customerTypes", produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerTypeResource {

    private final CustomerTypeService customerTypeService;

    public CustomerTypeResource(final CustomerTypeService customerTypeService) {
        this.customerTypeService = customerTypeService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerTypeDTO>> getAllCustomerTypes() {
        return ResponseEntity.ok(customerTypeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerTypeDTO> getCustomerType(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(customerTypeService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCustomerType(
            @RequestBody @Valid final CustomerTypeDTO customerTypeDTO) {
        final UUID createdId = customerTypeService.create(customerTypeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateCustomerType(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final CustomerTypeDTO customerTypeDTO) {
        customerTypeService.update(id, customerTypeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCustomerType(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = customerTypeService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        customerTypeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
