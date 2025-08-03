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
import wastecnologia.wapps.api.domain.dto.PartnerDTO;
import wastecnologia.wapps.api.service.PartnerService;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/partners", produces = MediaType.APPLICATION_JSON_VALUE)
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(final PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @GetMapping
    public ResponseEntity<List<PartnerDTO>> getAllPartners() {
        return ResponseEntity.ok(partnerService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerDTO> getPartner(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(partnerService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createPartner(@RequestBody @Valid final PartnerDTO partnerDTO) {
        final UUID createdId = partnerService.create(partnerDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updatePartner(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final PartnerDTO partnerDTO) {
        partnerService.update(id, partnerDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePartner(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = partnerService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        partnerService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
