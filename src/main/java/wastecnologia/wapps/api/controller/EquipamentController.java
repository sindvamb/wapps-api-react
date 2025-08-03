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
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.dto.EquipamentDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.service.EquipamentService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/equipaments", produces = MediaType.APPLICATION_JSON_VALUE)
public class EquipamentController {

    private final EquipamentService equipamentService;
    private final CompanyRepository companyRepository;

    public EquipamentController(final EquipamentService equipamentService,
            final CompanyRepository companyRepository) {
        this.equipamentService = equipamentService;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<EquipamentDTO>> getAllEquipaments() {
        return ResponseEntity.ok(equipamentService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EquipamentDTO> getEquipament(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(equipamentService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEquipament(
            @RequestBody @Valid final EquipamentDTO equipamentDTO) {
        final UUID createdId = equipamentService.create(equipamentDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEquipament(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EquipamentDTO equipamentDTO) {
        equipamentService.update(id, equipamentDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEquipament(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = equipamentService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        equipamentService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

}
