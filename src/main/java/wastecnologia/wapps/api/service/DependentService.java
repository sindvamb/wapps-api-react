package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.Dependent;
import wastecnologia.wapps.api.domain.entity.FileControl;
import wastecnologia.wapps.api.domain.dto.DependentDTO;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.DependentRepository;
import wastecnologia.wapps.api.repository.FileControlRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class DependentService {

    private final DependentRepository dependentRepository;
    private final CustomerRepository customerRepository;
    private final FileControlRepository fileControlRepository;

    public DependentService(final DependentRepository dependentRepository,
            final CustomerRepository customerRepository,
            final FileControlRepository fileControlRepository) {
        this.dependentRepository = dependentRepository;
        this.customerRepository = customerRepository;
        this.fileControlRepository = fileControlRepository;
    }

    public List<DependentDTO> findAll() {
        final List<Dependent> dependents = dependentRepository.findAll(Sort.by("id"));
        return dependents.stream()
                .map(dependent -> mapToDTO(dependent, new DependentDTO()))
                .toList();
    }

    public DependentDTO get(final UUID id) {
        return dependentRepository.findById(id)
                .map(dependent -> mapToDTO(dependent, new DependentDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final DependentDTO dependentDTO) {
        final Dependent dependent = new Dependent();
        mapToEntity(dependentDTO, dependent);
        return dependentRepository.save(dependent).getId();
    }

    public void update(final UUID id, final DependentDTO dependentDTO) {
        final Dependent dependent = dependentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(dependentDTO, dependent);
        dependentRepository.save(dependent);
    }

    public void delete(final UUID id) {
        dependentRepository.deleteById(id);
    }

    private DependentDTO mapToDTO(final Dependent dependent, final DependentDTO dependentDTO) {
        dependentDTO.setId(dependent.getId());
        dependentDTO.setName(dependent.getName());
        dependentDTO.setCpfCnpj(dependent.getCpfCnpj());
        dependentDTO.setEmail(dependent.getEmail());
        dependentDTO.setCellPhone(dependent.getCellPhone());
        dependentDTO.setType(dependent.getType());
        dependentDTO.setCustomer(dependent.getCustomer() == null ? null : dependent.getCustomer().getId());
        return dependentDTO;
    }

    private Dependent mapToEntity(final DependentDTO dependentDTO, final Dependent dependent) {
        dependent.setName(dependentDTO.getName());
        dependent.setCpfCnpj(dependentDTO.getCpfCnpj());
        dependent.setEmail(dependentDTO.getEmail());
        dependent.setCellPhone(dependentDTO.getCellPhone());
        dependent.setType(dependentDTO.getType());
        final Customer customer = dependentDTO.getCustomer() == null ? null : customerRepository.findById(dependentDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        dependent.setCustomer(customer);
        return dependent;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Dependent dependent = dependentRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final FileControl dependentFileControl = fileControlRepository.findFirstByDependent(dependent);
        if (dependentFileControl != null) {
            referencedWarning.setKey("dependent.fileControl.dependent.referenced");
            referencedWarning.addParam(dependentFileControl.getId());
            return referencedWarning;
        }
        return null;
    }

}
