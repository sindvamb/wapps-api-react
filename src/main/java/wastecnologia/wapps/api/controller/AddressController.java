package wastecnologia.wapps.api.controller;

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
import wastecnologia.wapps.api.domain.dto.AddressDTO;
import wastecnologia.wapps.api.service.AddressService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/addresses", produces = MediaType.APPLICATION_JSON_VALUE)
public class AddressController {

    private final AddressService addressService;

    public AddressController(final AddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllAddresses() {
        return ResponseEntity.ok(addressService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDTO> getAddress(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(addressService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createAddress(@RequestBody @Valid final AddressDTO addressDTO) {
        final UUID createdId = addressService.create(addressDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateAddress(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final AddressDTO addressDTO) {
        addressService.update(id, addressDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAddress(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = addressService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        addressService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
