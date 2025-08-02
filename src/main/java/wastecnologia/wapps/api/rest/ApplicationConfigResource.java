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
import wastecnologia.wapps.api.model.ApplicationConfigDTO;
import wastecnologia.wapps.api.service.ApplicationConfigService;


@RestController
@RequestMapping(value = "/api/applicationConfigs", produces = MediaType.APPLICATION_JSON_VALUE)
public class ApplicationConfigResource {

    private final ApplicationConfigService applicationConfigService;

    public ApplicationConfigResource(final ApplicationConfigService applicationConfigService) {
        this.applicationConfigService = applicationConfigService;
    }

    @GetMapping
    public ResponseEntity<List<ApplicationConfigDTO>> getAllApplicationConfigs() {
        return ResponseEntity.ok(applicationConfigService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationConfigDTO> getApplicationConfig(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(applicationConfigService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createApplicationConfig(
            @RequestBody @Valid final ApplicationConfigDTO applicationConfigDTO) {
        final UUID createdId = applicationConfigService.create(applicationConfigDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateApplicationConfig(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final ApplicationConfigDTO applicationConfigDTO) {
        applicationConfigService.update(id, applicationConfigDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteApplicationConfig(@PathVariable(name = "id") final UUID id) {
        applicationConfigService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
