package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Company;
import wastecnologia.wapps.api.domain.Dependent;
import wastecnologia.wapps.api.domain.Event;
import wastecnologia.wapps.api.domain.EventCustomer;
import wastecnologia.wapps.api.domain.FileControl;
import wastecnologia.wapps.api.domain.FileLayout;
import wastecnologia.wapps.api.domain.OrderFileControl;
import wastecnologia.wapps.api.domain.Portfolio;
import wastecnologia.wapps.api.domain.User;
import wastecnologia.wapps.api.model.FileControlDTO;
import wastecnologia.wapps.api.repos.CompanyRepository;
import wastecnologia.wapps.api.repos.DependentRepository;
import wastecnologia.wapps.api.repos.EventCustomerRepository;
import wastecnologia.wapps.api.repos.EventRepository;
import wastecnologia.wapps.api.repos.FileControlRepository;
import wastecnologia.wapps.api.repos.FileLayoutRepository;
import wastecnologia.wapps.api.repos.OrderFileControlRepository;
import wastecnologia.wapps.api.repos.PortfolioRepository;
import wastecnologia.wapps.api.repos.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class FileControlService {

    private final FileControlRepository fileControlRepository;
    private final CompanyRepository companyRepository;
    private final DependentRepository dependentRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final EventRepository eventRepository;
    private final FileLayoutRepository fileLayoutRepository;
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final OrderFileControlRepository orderFileControlRepository;

    public FileControlService(final FileControlRepository fileControlRepository,
            final CompanyRepository companyRepository,
            final DependentRepository dependentRepository,
            final EventCustomerRepository eventCustomerRepository,
            final EventRepository eventRepository, final FileLayoutRepository fileLayoutRepository,
            final PortfolioRepository portfolioRepository, final UserRepository userRepository,
            final OrderFileControlRepository orderFileControlRepository) {
        this.fileControlRepository = fileControlRepository;
        this.companyRepository = companyRepository;
        this.dependentRepository = dependentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.eventRepository = eventRepository;
        this.fileLayoutRepository = fileLayoutRepository;
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
        this.orderFileControlRepository = orderFileControlRepository;
    }

    public List<FileControlDTO> findAll() {
        final List<FileControl> fileControls = fileControlRepository.findAll(Sort.by("id"));
        return fileControls.stream()
                .map(fileControl -> mapToDTO(fileControl, new FileControlDTO()))
                .toList();
    }

    public FileControlDTO get(final UUID id) {
        return fileControlRepository.findById(id)
                .map(fileControl -> mapToDTO(fileControl, new FileControlDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final FileControlDTO fileControlDTO) {
        final FileControl fileControl = new FileControl();
        mapToEntity(fileControlDTO, fileControl);
        return fileControlRepository.save(fileControl).getId();
    }

    public void update(final UUID id, final FileControlDTO fileControlDTO) {
        final FileControl fileControl = fileControlRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(fileControlDTO, fileControl);
        fileControlRepository.save(fileControl);
    }

    public void delete(final UUID id) {
        fileControlRepository.deleteById(id);
    }

    private FileControlDTO mapToDTO(final FileControl fileControl,
            final FileControlDTO fileControlDTO) {
        fileControlDTO.setId(fileControl.getId());
        fileControlDTO.setFileName(fileControl.getFileName());
        fileControlDTO.setFileSize(fileControl.getFileSize());
        fileControlDTO.setFileArray(fileControl.getFileArray());
        fileControlDTO.setTargetPath(fileControl.getTargetPath());
        fileControlDTO.setContentType(fileControl.getContentType());
        fileControlDTO.setDescription(fileControl.getDescription());
        fileControlDTO.setApproved(fileControl.getApproved());
        fileControlDTO.setCompany(fileControl.getCompany() == null ? null : fileControl.getCompany().getId());
        fileControlDTO.setDependent(fileControl.getDependent() == null ? null : fileControl.getDependent().getId());
        fileControlDTO.setEventCustomer(fileControl.getEventCustomer() == null ? null : fileControl.getEventCustomer().getId());
        fileControlDTO.setEvent(fileControl.getEvent() == null ? null : fileControl.getEvent().getId());
        fileControlDTO.setLayout(fileControl.getLayout() == null ? null : fileControl.getLayout().getId());
        fileControlDTO.setPortfolio(fileControl.getPortfolio() == null ? null : fileControl.getPortfolio().getId());
        fileControlDTO.setUser(fileControl.getUser() == null ? null : fileControl.getUser().getId());
        return fileControlDTO;
    }

    private FileControl mapToEntity(final FileControlDTO fileControlDTO,
            final FileControl fileControl) {
        fileControl.setFileName(fileControlDTO.getFileName());
        fileControl.setFileSize(fileControlDTO.getFileSize());
        fileControl.setFileArray(fileControlDTO.getFileArray());
        fileControl.setTargetPath(fileControlDTO.getTargetPath());
        fileControl.setContentType(fileControlDTO.getContentType());
        fileControl.setDescription(fileControlDTO.getDescription());
        fileControl.setApproved(fileControlDTO.getApproved());
        final Company company = fileControlDTO.getCompany() == null ? null : companyRepository.findById(fileControlDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        fileControl.setCompany(company);
        final Dependent dependent = fileControlDTO.getDependent() == null ? null : dependentRepository.findById(fileControlDTO.getDependent())
                .orElseThrow(() -> new NotFoundException("dependent not found"));
        fileControl.setDependent(dependent);
        final EventCustomer eventCustomer = fileControlDTO.getEventCustomer() == null ? null : eventCustomerRepository.findById(fileControlDTO.getEventCustomer())
                .orElseThrow(() -> new NotFoundException("eventCustomer not found"));
        fileControl.setEventCustomer(eventCustomer);
        final Event event = fileControlDTO.getEvent() == null ? null : eventRepository.findById(fileControlDTO.getEvent())
                .orElseThrow(() -> new NotFoundException("event not found"));
        fileControl.setEvent(event);
        final FileLayout layout = fileControlDTO.getLayout() == null ? null : fileLayoutRepository.findById(fileControlDTO.getLayout())
                .orElseThrow(() -> new NotFoundException("layout not found"));
        fileControl.setLayout(layout);
        final Portfolio portfolio = fileControlDTO.getPortfolio() == null ? null : portfolioRepository.findById(fileControlDTO.getPortfolio())
                .orElseThrow(() -> new NotFoundException("portfolio not found"));
        fileControl.setPortfolio(portfolio);
        final User user = fileControlDTO.getUser() == null ? null : userRepository.findById(fileControlDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        fileControl.setUser(user);
        return fileControl;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final FileControl fileControl = fileControlRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final OrderFileControl fileControlOrderFileControl = orderFileControlRepository.findFirstByFileControl(fileControl);
        if (fileControlOrderFileControl != null) {
            referencedWarning.setKey("fileControl.orderFileControl.fileControl.referenced");
            referencedWarning.addParam(fileControlOrderFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
