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
import wastecnologia.wapps.api.domain.entity.Partner;
import wastecnologia.wapps.api.domain.dto.PartnerUnitDTO;
import wastecnologia.wapps.api.repository.PartnerRepository;
import wastecnologia.wapps.api.service.PartnerUnitService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/partnerUnits", produces = MediaType.APPLICATION_JSON_VALUE)
public class PartnerUnitController {

    private final PartnerUnitService partnerUnitService;
    private final PartnerRepository partnerRepository;

    public PartnerUnitController(final PartnerUnitService partnerUnitService,
            final PartnerRepository partnerRepository) {
        this.partnerUnitService = partnerUnitService;
        this.partnerRepository = partnerRepository;
    }

    @GetMapping
    public ResponseEntity<List<PartnerUnitDTO>> getAllPartnerUnits() {
        return ResponseEntity.ok(partnerUnitService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerUnitDTO> getPartnerUnit(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(partnerUnitService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createPartnerUnit(
            @RequestBody @Valid final PartnerUnitDTO partnerUnitDTO) {
        final UUID createdId = partnerUnitService.create(partnerUnitDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updatePartnerUnit(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final PartnerUnitDTO partnerUnitDTO) {
        partnerUnitService.update(id, partnerUnitDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePartnerUnit(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = partnerUnitService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        partnerUnitService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/partnerValues")
    public ResponseEntity<Map<UUID, UUID>> getPartnerValues() {
        return ResponseEntity.ok(partnerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Partner::getId, Partner::getId)));
    }

}
