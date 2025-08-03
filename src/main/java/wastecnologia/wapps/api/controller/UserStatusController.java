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
import wastecnologia.wapps.api.domain.dto.UserStatusDTO;
import wastecnologia.wapps.api.service.UserStatusService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/userStatuses", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserStatusController {

    private final UserStatusService userStatusService;

    public UserStatusController(final UserStatusService userStatusService) {
        this.userStatusService = userStatusService;
    }

    @GetMapping
    public ResponseEntity<List<UserStatusDTO>> getAllUserStatuses() {
        return ResponseEntity.ok(userStatusService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserStatusDTO> getUserStatus(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(userStatusService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createUserStatus(
            @RequestBody @Valid final UserStatusDTO userStatusDTO) {
        final UUID createdId = userStatusService.create(userStatusDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateUserStatus(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final UserStatusDTO userStatusDTO) {
        userStatusService.update(id, userStatusDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteUserStatus(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = userStatusService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        userStatusService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
