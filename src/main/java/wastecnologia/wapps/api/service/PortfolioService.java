package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.Portfolio;
import wastecnologia.wapps.api.domain.dto.PortfolioDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.repository.PortfolioRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final CompanyRepository companyRepository;
    private final FileControlRepository fileControlRepository;

    public PortfolioService(final PortfolioRepository portfolioRepository,
            final CompanyRepository companyRepository,
            final FileControlRepository fileControlRepository) {
        this.portfolioRepository = portfolioRepository;
        this.companyRepository = companyRepository;
        this.fileControlRepository = fileControlRepository;
    }

    public List<PortfolioDTO> findAll() {
        final List<Portfolio> portfolios = portfolioRepository.findAll(Sort.by("id"));
        return portfolios.stream()
                .map(portfolio -> mapToDTO(portfolio, new PortfolioDTO()))
                .toList();
    }

    public PortfolioDTO get(final UUID id) {
        return portfolioRepository.findById(id)
                .map(portfolio -> mapToDTO(portfolio, new PortfolioDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final PortfolioDTO portfolioDTO) {
        final Portfolio portfolio = new Portfolio();
        mapToEntity(portfolioDTO, portfolio);
        return portfolioRepository.save(portfolio).getId();
    }

    public void update(final UUID id, final PortfolioDTO portfolioDTO) {
        final Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(portfolioDTO, portfolio);
        portfolioRepository.save(portfolio);
    }

    public void delete(final UUID id) {
        portfolioRepository.deleteById(id);
    }

    private PortfolioDTO mapToDTO(final Portfolio portfolio, final PortfolioDTO portfolioDTO) {
        portfolioDTO.setId(portfolio.getId());
        portfolioDTO.setTitle(portfolio.getTitle());
        portfolioDTO.setFilePath(portfolio.getFilePath());
        portfolioDTO.setCustomerId(portfolio.getCustomerId());
        portfolioDTO.setCompany(portfolio.getCompany() == null ? null : portfolio.getCompany().getId());
        return portfolioDTO;
    }

    private Portfolio mapToEntity(final PortfolioDTO portfolioDTO, final Portfolio portfolio) {
        portfolio.setTitle(portfolioDTO.getTitle());
        portfolio.setFilePath(portfolioDTO.getFilePath());
        portfolio.setCustomerId(portfolioDTO.getCustomerId());
        final Company company = portfolioDTO.getCompany() == null ? null : companyRepository.findById(portfolioDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        portfolio.setCompany(company);
        return portfolio;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Portfolio portfolio = portfolioRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final FileControl portfolioFileControl = fileControlRepository.findFirstByPortfolio(portfolio);
        if (portfolioFileControl != null) {
            referencedWarning.setKey("portfolio.fileControl.portfolio.referenced");
            referencedWarning.addParam(portfolioFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
