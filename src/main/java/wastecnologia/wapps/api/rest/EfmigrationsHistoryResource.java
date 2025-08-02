package wastecnologia.wapps.api.rest;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
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
import wastecnologia.wapps.api.model.EfmigrationsHistoryDTO;
import wastecnologia.wapps.api.service.EfmigrationsHistoryService;


@RestController
@RequestMapping(value = "/api/efmigrationsHistories", produces = MediaType.APPLICATION_JSON_VALUE)
public class EfmigrationsHistoryResource {

    private final EfmigrationsHistoryService efmigrationsHistoryService;

    public EfmigrationsHistoryResource(
            final EfmigrationsHistoryService efmigrationsHistoryService) {
        this.efmigrationsHistoryService = efmigrationsHistoryService;
    }

    @GetMapping
    public ResponseEntity<List<EfmigrationsHistoryDTO>> getAllEfmigrationsHistories() {
        return ResponseEntity.ok(efmigrationsHistoryService.findAll());
    }

    @GetMapping("/{migrationId}")
    public ResponseEntity<EfmigrationsHistoryDTO> getEfmigrationsHistory(
            @PathVariable(name = "migrationId") final String migrationId) {
        return ResponseEntity.ok(efmigrationsHistoryService.get(migrationId));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<String> createEfmigrationsHistory(
            @RequestBody @Valid final EfmigrationsHistoryDTO efmigrationsHistoryDTO) {
        final String createdMigrationId = efmigrationsHistoryService.create(efmigrationsHistoryDTO);
        return new ResponseEntity<>('"' + createdMigrationId + '"', HttpStatus.CREATED);
    }

    @PutMapping("/{migrationId}")
    public ResponseEntity<String> updateEfmigrationsHistory(
            @PathVariable(name = "migrationId") final String migrationId,
            @RequestBody @Valid final EfmigrationsHistoryDTO efmigrationsHistoryDTO) {
        efmigrationsHistoryService.update(migrationId, efmigrationsHistoryDTO);
        return ResponseEntity.ok('"' + migrationId + '"');
    }

    @DeleteMapping("/{migrationId}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEfmigrationsHistory(
            @PathVariable(name = "migrationId") final String migrationId) {
        efmigrationsHistoryService.delete(migrationId);
        return ResponseEntity.noContent().build();
    }

}
