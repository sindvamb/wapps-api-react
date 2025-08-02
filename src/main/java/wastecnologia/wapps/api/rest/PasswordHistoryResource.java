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
import wastecnologia.wapps.api.model.PasswordHistoryDTO;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.service.PasswordHistoryService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/passwordHistories", produces = MediaType.APPLICATION_JSON_VALUE)
public class PasswordHistoryResource {

    private final PasswordHistoryService passwordHistoryService;
    private final UserRepository userRepository;

    public PasswordHistoryResource(final PasswordHistoryService passwordHistoryService,
            final UserRepository userRepository) {
        this.passwordHistoryService = passwordHistoryService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<PasswordHistoryDTO>> getAllPasswordHistories() {
        return ResponseEntity.ok(passwordHistoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PasswordHistoryDTO> getPasswordHistory(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(passwordHistoryService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createPasswordHistory(
            @RequestBody @Valid final PasswordHistoryDTO passwordHistoryDTO) {
        final UUID createdId = passwordHistoryService.create(passwordHistoryDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updatePasswordHistory(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final PasswordHistoryDTO passwordHistoryDTO) {
        passwordHistoryService.update(id, passwordHistoryDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePasswordHistory(@PathVariable(name = "id") final UUID id) {
        passwordHistoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
