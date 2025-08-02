package wastecnologia.wapps.api.rest;

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
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Employee;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.model.EventEmployeeDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.EmployeeRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.service.EventEmployeeService;
import wastecnologia.wapps.api.util.CustomCollectors;


@RestController
@RequestMapping(value = "/api/eventEmployees", produces = MediaType.APPLICATION_JSON_VALUE)
public class EventEmployeeResource {

    private final EventEmployeeService eventEmployeeService;
    private final CompanyRepository companyRepository;
    private final EmployeeRepository employeeRepository;
    private final EventCustomerRepository eventCustomerRepository;

    public EventEmployeeResource(final EventEmployeeService eventEmployeeService,
            final CompanyRepository companyRepository, final EmployeeRepository employeeRepository,
            final EventCustomerRepository eventCustomerRepository) {
        this.eventEmployeeService = eventEmployeeService;
        this.companyRepository = companyRepository;
        this.employeeRepository = employeeRepository;
        this.eventCustomerRepository = eventCustomerRepository;
    }

    @GetMapping
    public ResponseEntity<List<EventEmployeeDTO>> getAllEventEmployees() {
        return ResponseEntity.ok(eventEmployeeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEmployeeDTO> getEventEmployee(
            @PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(eventEmployeeService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createEventEmployee(
            @RequestBody @Valid final EventEmployeeDTO eventEmployeeDTO) {
        final UUID createdId = eventEmployeeService.create(eventEmployeeDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateEventEmployee(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final EventEmployeeDTO eventEmployeeDTO) {
        eventEmployeeService.update(id, eventEmployeeDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteEventEmployee(@PathVariable(name = "id") final UUID id) {
        eventEmployeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/employeeValues")
    public ResponseEntity<Map<UUID, UUID>> getEmployeeValues() {
        return ResponseEntity.ok(employeeRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Employee::getId, Employee::getId)));
    }

    @GetMapping("/eventCustomerValues")
    public ResponseEntity<Map<UUID, UUID>> getEventCustomerValues() {
        return ResponseEntity.ok(eventCustomerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(EventCustomer::getId, EventCustomer::getId)));
    }

}
