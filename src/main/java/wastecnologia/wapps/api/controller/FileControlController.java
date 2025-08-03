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
import wastecnologia.wapps.api.domain.entity.Dependent;
import wastecnologia.wapps.api.domain.entity.Event;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.FileLayout;
import wastecnologia.wapps.api.domain.entity.Portfolio;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.FileControlDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.DependentRepository;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.EventRepository;
import wastecnologia.wapps.api.repository.FileLayoutRepository;
import wastecnologia.wapps.api.repository.PortfolioRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.service.FileControlService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/fileControls", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileControlController {

    private final FileControlService fileControlService;
    private final CompanyRepository companyRepository;
    private final DependentRepository dependentRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final EventRepository eventRepository;
    private final FileLayoutRepository fileLayoutRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public FileControlController(final FileControlService fileControlService,
            final CompanyRepository companyRepository,
            final DependentRepository dependentRepository,
            final EventCustomerRepository eventCustomerRepository,
            final EventRepository eventRepository, final FileLayoutRepository fileLayoutRepository,
            final PortfolioRepository portfolioRepository, final UserRepository userRepository) {
        this.fileControlService = fileControlService;
        this.companyRepository = companyRepository;
        this.dependentRepository = dependentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.eventRepository = eventRepository;
        this.fileLayoutRepository = fileLayoutRepository;
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<FileControlDTO>> getAllFileControls() {
        return ResponseEntity.ok(fileControlService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FileControlDTO> getFileControl(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(fileControlService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createFileControl(
            @RequestBody @Valid final FileControlDTO fileControlDTO) {
        final UUID createdId = fileControlService.create(fileControlDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updateFileControl(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final FileControlDTO fileControlDTO) {
        fileControlService.update(id, fileControlDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteFileControl(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = fileControlService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        fileControlService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

    @GetMapping("/dependentValues")
    public ResponseEntity<Map<UUID, UUID>> getDependentValues() {
        return ResponseEntity.ok(dependentRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Dependent::getId, Dependent::getId)));
    }

    @GetMapping("/eventCustomerValues")
    public ResponseEntity<Map<UUID, UUID>> getEventCustomerValues() {
        return ResponseEntity.ok(eventCustomerRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(EventCustomer::getId, EventCustomer::getId)));
    }

    @GetMapping("/eventValues")
    public ResponseEntity<Map<UUID, UUID>> getEventValues() {
        return ResponseEntity.ok(eventRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Event::getId, Event::getId)));
    }

    @GetMapping("/layoutValues")
    public ResponseEntity<Map<UUID, UUID>> getLayoutValues() {
        return ResponseEntity.ok(fileLayoutRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(FileLayout::getId, FileLayout::getId)));
    }

    @GetMapping("/portfolioValues")
    public ResponseEntity<Map<UUID, UUID>> getPortfolioValues() {
        return ResponseEntity.ok(portfolioRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Portfolio::getId, Portfolio::getId)));
    }

    @GetMapping("/userValues")
    public ResponseEntity<Map<UUID, UUID>> getUserValues() {
        return ResponseEntity.ok(userRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(User::getId, User::getId)));
    }

}
