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
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.RegistrationRequestDTO;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.service.RegistrationRequestService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/registrationRequests", produces = MediaType.APPLICATION_JSON_VALUE)
public class RegistrationRequestResource {

    private final RegistrationRequestService registrationRequestService;
    private final UserRepository userRepository;

    public RegistrationRequestResource(final RegistrationRequestService registrationRequestService,
            final UserRepository userRepository) {
        this.registrationRequestService = registrationRequestService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<RegistrationRequestDTO>> getAllRegistrationRequests() {
        return ResponseEntity.ok(registrationRequestService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RegistrationRequestDTO> getRegistrationRequest(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(registrationRequestService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createRegistrationRequest(
            @RequestBody @Valid final RegistrationRequestDTO registrationRequestDTO) {
        final UUID createdId = registrationRequestService.create(registrationRequestDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateRegistrationRequest(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final RegistrationRequestDTO registrationRequestDTO) {
        registrationRequestService.update(id, registrationRequestDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteRegistrationRequest(
            @PathVariable(name = "id") final UUID id) {
        registrationRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
