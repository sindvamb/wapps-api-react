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
import wastecnologia.wapps.api.domain.dto.EducationDegreeDTO;
import wastecnologia.wapps.api.service.EducationDegreeService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/educationDegrees", produces = MediaType.APPLICATION_JSON_VALUE)
public class EducationDegreeController {

    private final EducationDegreeService educationDegreeService;

    public EducationDegreeController(final EducationDegreeService educationDegreeService) {
        this.educationDegreeService = educationDegreeService;
    }

    @GetMapping
    public ResponseEntity<List<EducationDegreeDTO>> getAllEducationDegrees() {
        return ResponseEntity.ok(educationDegreeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EducationDegreeDTO> getEducationDegree(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(educationDegreeService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEducationDegree(
            @RequestBody @Valid final EducationDegreeDTO educationDegreeDTO) {
        final UUID createdId = educationDegreeService.create(educationDegreeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEducationDegree(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EducationDegreeDTO educationDegreeDTO) {
        educationDegreeService.update(id, educationDegreeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEducationDegree(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = educationDegreeService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        educationDegreeService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
