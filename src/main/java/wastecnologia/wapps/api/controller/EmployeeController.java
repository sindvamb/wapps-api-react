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
import wastecnologia.wapps.api.domain.dto.EmployeeDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.service.EmployeeService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/employees", produces = MediaType.APPLICATION_JSON_VALUE)
public class EmployeeController {

    private final EmployeeService employeeService;
    private final CompanyRepository companyRepository;

    public EmployeeController(final EmployeeService employeeService,
            final CompanyRepository companyRepository) {
        this.employeeService = employeeService;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(employeeService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEmployee(@RequestBody @Valid final EmployeeDTO employeeDTO) {
        final UUID createdId = employeeService.create(employeeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEmployee(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EmployeeDTO employeeDTO) {
        employeeService.update(id, employeeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEmployee(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = employeeService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

}
