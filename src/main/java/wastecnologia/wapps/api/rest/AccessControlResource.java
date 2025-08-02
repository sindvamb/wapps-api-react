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
import wastecnologia.wapps.api.model.AccessControlDTO;
import wastecnologia.wapps.api.service.AccessControlService;


@RestController
@RequestMapping(value = "/api/accessControls", produces = MediaType.APPLICATION_JSON_VALUE)
public class AccessControlResource {

    private final AccessControlService accessControlService;

    public AccessControlResource(final AccessControlService accessControlService) {
        this.accessControlService = accessControlService;
    }

    @GetMapping
    public ResponseEntity<List<AccessControlDTO>> getAllAccessControls() {
        return ResponseEntity.ok(accessControlService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccessControlDTO> getAccessControl(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(accessControlService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createAccessControl(
            @RequestBody @Valid final AccessControlDTO accessControlDTO) {
        final UUID createdId = accessControlService.create(accessControlDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateAccessControl(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final AccessControlDTO accessControlDTO) {
        accessControlService.update(id, accessControlDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteAccessControl(@PathVariable(name = "id") final UUID id) {
        accessControlService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
