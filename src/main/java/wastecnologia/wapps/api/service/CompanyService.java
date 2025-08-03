package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Address;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.CompanyContact;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Employee;
import wastecnologia.wapps.api.domain.entity.Equipament;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.EventEmployee;
import wastecnologia.wapps.api.domain.entity.EventEquipament;
import wastecnologia.wapps.api.domain.entity.EventMenu;
import wastecnologia.wapps.api.domain.entity.EventMenuItem;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.entity.Menu;
import wastecnologia.wapps.api.domain.entity.Portfolio;
import wastecnologia.wapps.api.domain.dto.CompanyDTO;
import wastecnologia.wapps.api.repository.AddressRepository;
import wastecnologia.wapps.api.repository.CompanyContactRepository;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.EmployeeRepository;
import wastecnologia.wapps.api.repository.EquipamentRepository;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.EventEmployeeRepository;
import wastecnologia.wapps.api.repository.EventEquipamentRepository;
import wastecnologia.wapps.api.repository.EventMenuItemRepository;
import wastecnologia.wapps.api.repository.EventMenuRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.repository.MenuRepository;
import wastecnologia.wapps.api.repository.PortfolioRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final AddressRepository addressRepository;
    private final CustomerRepository customerRepository;
    private final CompanyContactRepository companyContactRepository;
    private final EmployeeRepository employeeRepository;
    private final EquipamentRepository equipamentRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final EventEmployeeRepository eventEmployeeRepository;
    private final EventEquipamentRepository eventEquipamentRepository;
    private final EventMenuRepository eventMenuRepository;
    private final EventMenuItemRepository eventMenuItemRepository;
    private final FileControlRepository fileControlRepository;
    private final MenuRepository menuRepository;
    private final PortfolioRepository portfolioRepository;

    public CompanyService(final CompanyRepository companyRepository,
            final AddressRepository addressRepository, final CustomerRepository customerRepository,
            final CompanyContactRepository companyContactRepository,
            final EmployeeRepository employeeRepository,
            final EquipamentRepository equipamentRepository,
            final EventCustomerRepository eventCustomerRepository,
            final EventEmployeeRepository eventEmployeeRepository,
            final EventEquipamentRepository eventEquipamentRepository,
            final EventMenuRepository eventMenuRepository,
            final EventMenuItemRepository eventMenuItemRepository,
            final FileControlRepository fileControlRepository, final MenuRepository menuRepository,
            final PortfolioRepository portfolioRepository) {
        this.companyRepository = companyRepository;
        this.addressRepository = addressRepository;
        this.customerRepository = customerRepository;
        this.companyContactRepository = companyContactRepository;
        this.employeeRepository = employeeRepository;
        this.equipamentRepository = equipamentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.eventEmployeeRepository = eventEmployeeRepository;
        this.eventEquipamentRepository = eventEquipamentRepository;
        this.eventMenuRepository = eventMenuRepository;
        this.eventMenuItemRepository = eventMenuItemRepository;
        this.fileControlRepository = fileControlRepository;
        this.menuRepository = menuRepository;
        this.portfolioRepository = portfolioRepository;
    }

    public List<CompanyDTO> findAll() {
        final List<Company> companies = companyRepository.findAll(Sort.by("id"));
        return companies.stream()
                .map(company -> mapToDTO(company, new CompanyDTO()))
                .toList();
    }

    public CompanyDTO get(final UUID id) {
        return companyRepository.findById(id)
                .map(company -> mapToDTO(company, new CompanyDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CompanyDTO companyDTO) {
        final Company company = new Company();
        mapToEntity(companyDTO, company);
        return companyRepository.save(company).getId();
    }

    public void update(final UUID id, final CompanyDTO companyDTO) {
        final Company company = companyRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(companyDTO, company);
        companyRepository.save(company);
    }

    public void delete(final UUID id) {
        companyRepository.deleteById(id);
    }

    private CompanyDTO mapToDTO(final Company company, final CompanyDTO companyDTO) {
        companyDTO.setId(company.getId());
        companyDTO.setFoundationDate(company.getFoundationDate());
        companyDTO.setCpfCnpj(company.getCpfCnpj());
        companyDTO.setSize(company.getSize());
        companyDTO.setCorporateName(company.getCorporateName());
        companyDTO.setStateRegistration(company.getStateRegistration());
        companyDTO.setMunicipalRegistration(company.getMunicipalRegistration());
        companyDTO.setMainCnaeCode(company.getMainCnaeCode());
        companyDTO.setMainCnaeDescription(company.getMainCnaeDescription());
        companyDTO.setLegalNatureCode(company.getLegalNatureCode());
        companyDTO.setLegalNatureDescription(company.getLegalNatureDescription());
        companyDTO.setStatus(company.getStatus());
        companyDTO.setHasGovBrRegistration(company.getHasGovBrRegistration());
        companyDTO.setHasDigitalCertificate(company.getHasDigitalCertificate());
        companyDTO.setTradeName(company.getTradeName());
        companyDTO.setHasLogo(company.getHasLogo());
        companyDTO.setHasVisualIdentity(company.getHasVisualIdentity());
        companyDTO.setInpiRegistration(company.getInpiRegistration());
        companyDTO.setBusinessLaw(company.getBusinessLaw());
        companyDTO.setEmployeesCount(company.getEmployeesCount());
        companyDTO.setYoungApprenticesCount(company.getYoungApprenticesCount());
        companyDTO.setUsesESocial(company.getUsesESocial());
        companyDTO.setSebraeTraining(company.getSebraeTraining());
        companyDTO.setSenacTraining(company.getSenacTraining());
        companyDTO.setAnvisaTraining(company.getAnvisaTraining());
        companyDTO.setCivilDefenseTraining(company.getCivilDefenseTraining());
        companyDTO.setWebsite(company.getWebsite());
        companyDTO.setEmail(company.getEmail());
        companyDTO.setCreatorId(company.getCreatorId());
        companyDTO.setModifierId(company.getModifierId());
        companyDTO.setDeleterId(company.getDeleterId());
        companyDTO.setIsDeleted(company.getIsDeleted());
        companyDTO.setCreatedAt(company.getCreatedAt());
        companyDTO.setUpdatedAt(company.getUpdatedAt());
        companyDTO.setDeletedAt(company.getDeletedAt());
        companyDTO.setPaymentDate(company.getPaymentDate());
        companyDTO.setAddress(company.getAddress() == null ? null : company.getAddress().getId());
        companyDTO.setCustomer(company.getCustomer() == null ? null : company.getCustomer().getId());
        return companyDTO;
    }

    private Company mapToEntity(final CompanyDTO companyDTO, final Company company) {
        company.setFoundationDate(companyDTO.getFoundationDate());
        company.setCpfCnpj(companyDTO.getCpfCnpj());
        company.setSize(companyDTO.getSize());
        company.setCorporateName(companyDTO.getCorporateName());
        company.setStateRegistration(companyDTO.getStateRegistration());
        company.setMunicipalRegistration(companyDTO.getMunicipalRegistration());
        company.setMainCnaeCode(companyDTO.getMainCnaeCode());
        company.setMainCnaeDescription(companyDTO.getMainCnaeDescription());
        company.setLegalNatureCode(companyDTO.getLegalNatureCode());
        company.setLegalNatureDescription(companyDTO.getLegalNatureDescription());
        company.setStatus(companyDTO.getStatus());
        company.setHasGovBrRegistration(companyDTO.getHasGovBrRegistration());
        company.setHasDigitalCertificate(companyDTO.getHasDigitalCertificate());
        company.setTradeName(companyDTO.getTradeName());
        company.setHasLogo(companyDTO.getHasLogo());
        company.setHasVisualIdentity(companyDTO.getHasVisualIdentity());
        company.setInpiRegistration(companyDTO.getInpiRegistration());
        company.setBusinessLaw(companyDTO.getBusinessLaw());
        company.setEmployeesCount(companyDTO.getEmployeesCount());
        company.setYoungApprenticesCount(companyDTO.getYoungApprenticesCount());
        company.setUsesESocial(companyDTO.getUsesESocial());
        company.setSebraeTraining(companyDTO.getSebraeTraining());
        company.setSenacTraining(companyDTO.getSenacTraining());
        company.setAnvisaTraining(companyDTO.getAnvisaTraining());
        company.setCivilDefenseTraining(companyDTO.getCivilDefenseTraining());
        company.setWebsite(companyDTO.getWebsite());
        company.setEmail(companyDTO.getEmail());
        company.setCreatorId(companyDTO.getCreatorId());
        company.setModifierId(companyDTO.getModifierId());
        company.setDeleterId(companyDTO.getDeleterId());
        company.setIsDeleted(companyDTO.getIsDeleted());
        company.setCreatedAt(companyDTO.getCreatedAt());
        company.setUpdatedAt(companyDTO.getUpdatedAt());
        company.setDeletedAt(companyDTO.getDeletedAt());
        company.setPaymentDate(companyDTO.getPaymentDate());
        final Address address = companyDTO.getAddress() == null ? null : addressRepository.findById(companyDTO.getAddress())
                .orElseThrow(() -> new NotFoundException("address not found"));
        company.setAddress(address);
        final Customer customer = companyDTO.getCustomer() == null ? null : customerRepository.findById(companyDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        company.setCustomer(customer);
        return company;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Company company = companyRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final CompanyContact companyCompanyContact = companyContactRepository.findFirstByCompany(company);
        if (companyCompanyContact != null) {
            referencedWarning.setKey("company.companyContact.company.referenced");
            referencedWarning.addParam(companyCompanyContact.getId());
            return referencedWarning;
        }
        final Employee companyEmployee = employeeRepository.findFirstByCompany(company);
        if (companyEmployee != null) {
            referencedWarning.setKey("company.employee.company.referenced");
            referencedWarning.addParam(companyEmployee.getId());
            return referencedWarning;
        }
        final Equipament companyEquipament = equipamentRepository.findFirstByCompany(company);
        if (companyEquipament != null) {
            referencedWarning.setKey("company.equipament.company.referenced");
            referencedWarning.addParam(companyEquipament.getId());
            return referencedWarning;
        }
        final EventCustomer companyEventCustomer = eventCustomerRepository.findFirstByCompany(company);
        if (companyEventCustomer != null) {
            referencedWarning.setKey("company.eventCustomer.company.referenced");
            referencedWarning.addParam(companyEventCustomer.getId());
            return referencedWarning;
        }
        final EventEmployee companyEventEmployee = eventEmployeeRepository.findFirstByCompany(company);
        if (companyEventEmployee != null) {
            referencedWarning.setKey("company.eventEmployee.company.referenced");
            referencedWarning.addParam(companyEventEmployee.getId());
            return referencedWarning;
        }
        final EventEquipament companyEventEquipament = eventEquipamentRepository.findFirstByCompany(company);
        if (companyEventEquipament != null) {
            referencedWarning.setKey("company.eventEquipament.company.referenced");
            referencedWarning.addParam(companyEventEquipament.getId());
            return referencedWarning;
        }
        final EventMenu companyEventMenu = eventMenuRepository.findFirstByCompany(company);
        if (companyEventMenu != null) {
            referencedWarning.setKey("company.eventMenu.company.referenced");
            referencedWarning.addParam(companyEventMenu.getId());
            return referencedWarning;
        }
        final EventMenuItem companyEventMenuItem = eventMenuItemRepository.findFirstByCompany(company);
        if (companyEventMenuItem != null) {
            referencedWarning.setKey("company.eventMenuItem.company.referenced");
            referencedWarning.addParam(companyEventMenuItem.getId());
            return referencedWarning;
        }
        final FileControl companyFileControl = fileControlRepository.findFirstByCompany(company);
        if (companyFileControl != null) {
            referencedWarning.setKey("company.fileControl.company.referenced");
            referencedWarning.addParam(companyFileControl.getId());
            return referencedWarning;
        }
        final Menu companyMenu = menuRepository.findFirstByCompany(company);
        if (companyMenu != null) {
            referencedWarning.setKey("company.menu.company.referenced");
            referencedWarning.addParam(companyMenu.getId());
            return referencedWarning;
        }
        final Portfolio companyPortfolio = portfolioRepository.findFirstByCompany(company);
        if (companyPortfolio != null) {
            referencedWarning.setKey("company.portfolio.company.referenced");
            referencedWarning.addParam(companyPortfolio.getId());
            return referencedWarning;
        }
        return null;
    }

}
