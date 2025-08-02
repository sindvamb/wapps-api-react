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
import wastecnologia.wapps.api.domain.Address;
import wastecnologia.wapps.api.model.ContactDTO;
import wastecnologia.wapps.api.repos.AddressRepository;
import wastecnologia.wapps.api.service.ContactService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/contacts", produces = MediaType.APPLICATION_JSON_VALUE)
public class ContactResource {

    private final ContactService contactService;
    private final AddressRepository addressRepository;

    public ContactResource(final ContactService contactService,
            final AddressRepository addressRepository) {
        this.contactService = contactService;
        this.addressRepository = addressRepository;
    }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> getAllContacts() {
        return ResponseEntity.ok(contactService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> getContact(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(contactService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createContact(@RequestBody @Valid final ContactDTO contactDTO) {
        final UUID createdId = contactService.create(contactDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateContact(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final ContactDTO contactDTO) {
        contactService.update(id, contactDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteContact(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = contactService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        contactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/addressValues")
    public ResponseEntity<Map<UUID, UUID>> getAddressValues() {
        return ResponseEntity.ok(addressRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Address::getId, Address::getId)));
    }

}
