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
import wastecnologia.wapps.api.domain.entity.Contact;
import wastecnologia.wapps.api.domain.dto.ContactRequestDTO;
import wastecnologia.wapps.api.repository.ContactRepository;
import wastecnologia.wapps.api.service.ContactRequestService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/contactRequests", produces = MediaType.APPLICATION_JSON_VALUE)
public class ContactRequestController {

    private final ContactRequestService contactRequestService;
    private final ContactRepository contactRepository;

    public ContactRequestController(final ContactRequestService contactRequestService,
            final ContactRepository contactRepository) {
        this.contactRequestService = contactRequestService;
        this.contactRepository = contactRepository;
    }

    @GetMapping
    public ResponseEntity<List<ContactRequestDTO>> getAllContactRequests() {
        return ResponseEntity.ok(contactRequestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactRequestDTO> getContactRequest(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(contactRequestService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createContactRequest(
            @RequestBody @Valid final ContactRequestDTO contactRequestDTO) {
        final UUID createdId = contactRequestService.create(contactRequestDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateContactRequest(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final ContactRequestDTO contactRequestDTO) {
        contactRequestService.update(id, contactRequestDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteContactRequest(@PathVariable(name = "id") final UUID id) {
        contactRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contactValues")
    public ResponseEntity<Map<UUID, UUID>> getContactValues() {
        return ResponseEntity.ok(contactRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Contact::getId, Contact::getId)));
    }

}
