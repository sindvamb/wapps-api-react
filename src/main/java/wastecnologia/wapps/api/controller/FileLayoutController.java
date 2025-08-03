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
import wastecnologia.wapps.api.domain.dto.FileLayoutDTO;
import wastecnologia.wapps.api.service.FileLayoutService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/fileLayouts", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileLayoutController {

    private final FileLayoutService fileLayoutService;

    public FileLayoutController(final FileLayoutService fileLayoutService) {
        this.fileLayoutService = fileLayoutService;
    }

    @GetMapping
    public ResponseEntity<List<FileLayoutDTO>> getAllFileLayouts() {
        return ResponseEntity.ok(fileLayoutService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileLayoutDTO> getFileLayout(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(fileLayoutService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createFileLayout(
            @RequestBody @Valid final FileLayoutDTO fileLayoutDTO) {
        final UUID createdId = fileLayoutService.create(fileLayoutDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateFileLayout(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final FileLayoutDTO fileLayoutDTO) {
        fileLayoutService.update(id, fileLayoutDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteFileLayout(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = fileLayoutService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        fileLayoutService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
