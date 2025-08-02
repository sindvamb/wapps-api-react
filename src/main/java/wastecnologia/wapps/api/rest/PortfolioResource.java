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
import wastecnologia.wapps.api.model.PortfolioDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.service.PortfolioService;
import wastecnologia.wapps.api.util.CustomCollectors;
import wastecnologia.wapps.api.util.ReferencedException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@RestController
@RequestMapping(value = "/api/portfolios", produces = MediaType.APPLICATION_JSON_VALUE)
public class PortfolioResource {

    private final PortfolioService portfolioService;
    private final CompanyRepository companyRepository;

    public PortfolioResource(final PortfolioService portfolioService,
            final CompanyRepository companyRepository) {
        this.portfolioService = portfolioService;
        this.companyRepository = companyRepository;
    }

    @GetMapping
    public ResponseEntity<List<PortfolioDTO>> getAllPortfolios() {
        return ResponseEntity.ok(portfolioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioDTO> getPortfolio(@PathVariable(name = "id") final UUID id) {
        return ResponseEntity.ok(portfolioService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<UUID> createPortfolio(
            @RequestBody @Valid final PortfolioDTO portfolioDTO) {
        final UUID createdId = portfolioService.create(portfolioDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UUID> updatePortfolio(@PathVariable(name = "id") final UUID id,
            @RequestBody @Valid final PortfolioDTO portfolioDTO) {
        portfolioService.update(id, portfolioDTO);
        return ResponseEntity.ok(id);
    }

    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deletePortfolio(@PathVariable(name = "id") final UUID id) {
        final ReferencedWarning referencedWarning = portfolioService.getReferencedWarning(id);
        if (referencedWarning != null) {
            throw new ReferencedException(referencedWarning);
        }
        portfolioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/companyValues")
    public ResponseEntity<Map<UUID, UUID>> getCompanyValues() {
        return ResponseEntity.ok(companyRepository.findAll(Sort.by("id"))
                .stream()
                .collect(CustomCollectors.toSortedMap(Company::getId, Company::getId)));
    }

}
