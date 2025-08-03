package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.CompanyContact;
import wastecnologia.wapps.api.domain.dto.CompanyContactDTO;
import wastecnologia.wapps.api.repository.CompanyContactRepository;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class CompanyContactService {

    private final CompanyContactRepository companyContactRepository;
    private final CompanyRepository companyRepository;

    public CompanyContactService(final CompanyContactRepository companyContactRepository,
            final CompanyRepository companyRepository) {
        this.companyContactRepository = companyContactRepository;
        this.companyRepository = companyRepository;
    }

    public List<CompanyContactDTO> findAll() {
        final List<CompanyContact> companyContacts = companyContactRepository.findAll(Sort.by("id"));
        return companyContacts.stream()
                .map(companyContact -> mapToDTO(companyContact, new CompanyContactDTO()))
                .toList();
    }

    public CompanyContactDTO get(final UUID id) {
        return companyContactRepository.findById(id)
                .map(companyContact -> mapToDTO(companyContact, new CompanyContactDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CompanyContactDTO companyContactDTO) {
        final CompanyContact companyContact = new CompanyContact();
        mapToEntity(companyContactDTO, companyContact);
        return companyContactRepository.save(companyContact).getId();
    }

    public void update(final UUID id, final CompanyContactDTO companyContactDTO) {
        final CompanyContact companyContact = companyContactRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(companyContactDTO, companyContact);
        companyContactRepository.save(companyContact);
    }

    public void delete(final UUID id) {
        companyContactRepository.deleteById(id);
    }

    private CompanyContactDTO mapToDTO(final CompanyContact companyContact,
            final CompanyContactDTO companyContactDTO) {
        companyContactDTO.setId(companyContact.getId());
        companyContactDTO.setArea(companyContact.getArea());
        companyContactDTO.setName(companyContact.getName());
        companyContactDTO.setRole(companyContact.getRole());
        companyContactDTO.setCorporateEmail(companyContact.getCorporateEmail());
        companyContactDTO.setPhone(companyContact.getPhone());
        companyContactDTO.setCorporateCellPhone(companyContact.getCorporateCellPhone());
        companyContactDTO.setPersonalCellPhone(companyContact.getPersonalCellPhone());
        companyContactDTO.setCompany(companyContact.getCompany() == null ? null : companyContact.getCompany().getId());
        return companyContactDTO;
    }

    private CompanyContact mapToEntity(final CompanyContactDTO companyContactDTO,
            final CompanyContact companyContact) {
        companyContact.setArea(companyContactDTO.getArea());
        companyContact.setName(companyContactDTO.getName());
        companyContact.setRole(companyContactDTO.getRole());
        companyContact.setCorporateEmail(companyContactDTO.getCorporateEmail());
        companyContact.setPhone(companyContactDTO.getPhone());
        companyContact.setCorporateCellPhone(companyContactDTO.getCorporateCellPhone());
        companyContact.setPersonalCellPhone(companyContactDTO.getPersonalCellPhone());
        final Company company = companyContactDTO.getCompany() == null ? null : companyRepository.findById(companyContactDTO.getCompany())
                .orElseThrow(() -> new NotFoundException("company not found"));
        companyContact.setCompany(company);
        return companyContact;
    }

}
