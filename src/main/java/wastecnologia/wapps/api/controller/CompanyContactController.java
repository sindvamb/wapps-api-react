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
import wastecnologia.wapps.api.domain.dto.CompanyContactDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.service.CompanyContactService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/companyContacts", produces = MediaType.APPLICATION_JSON_VALUE)
public class CompanyContactController {

    private final CompanyContactService companyContactService;
    private final CompanyRepository companyRepository;

    public CompanyContactController(final CompanyContactService companyContactService,
            final CompanyRepository companyRepository) {
        this.companyContactService = companyContactService;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<CompanyContactDTO>> getAllCompanyContacts() {
        return ResponseEntity.ok(companyContactService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyContactDTO> getCompanyContact(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(companyContactService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createCompanyContact(
            @RequestBody @Valid final CompanyContactDTO companyContactDTO) {
        final UUID createdId = companyContactService.create(companyContactDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateCompanyContact(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final CompanyContactDTO companyContactDTO) {
        companyContactService.update(id, companyContactDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteCompanyContact(@PathVariable(name = "id") final UUID id) {
        companyContactService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

}
