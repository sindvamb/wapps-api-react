package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.CustomerType;
import wastecnologia.wapps.api.domain.dto.CustomerTypeDTO;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.CustomerTypeRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class CustomerTypeService {

    private final CustomerTypeRepository customerTypeRepository;
    private final CustomerRepository customerRepository;

    public CustomerTypeService(final CustomerTypeRepository customerTypeRepository,
            final CustomerRepository customerRepository) {
        this.customerTypeRepository = customerTypeRepository;
        this.customerRepository = customerRepository;
    }

    public List<CustomerTypeDTO> findAll() {
        final List<CustomerType> customerTypes = customerTypeRepository.findAll(Sort.by("id"));
        return customerTypes.stream()
                .map(customerType -> mapToDTO(customerType, new CustomerTypeDTO()))
                .toList();
    }

    public CustomerTypeDTO get(final UUID id) {
        return customerTypeRepository.findById(id)
                .map(customerType -> mapToDTO(customerType, new CustomerTypeDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CustomerTypeDTO customerTypeDTO) {
        final CustomerType customerType = new CustomerType();
        mapToEntity(customerTypeDTO, customerType);
        return customerTypeRepository.save(customerType).getId();
    }

    public void update(final UUID id, final CustomerTypeDTO customerTypeDTO) {
        final CustomerType customerType = customerTypeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(customerTypeDTO, customerType);
        customerTypeRepository.save(customerType);
    }

    public void delete(final UUID id) {
        customerTypeRepository.deleteById(id);
    }

    private CustomerTypeDTO mapToDTO(final CustomerType customerType,
            final CustomerTypeDTO customerTypeDTO) {
        customerTypeDTO.setId(customerType.getId());
        customerTypeDTO.setCode(customerType.getCode());
        customerTypeDTO.setDescription(customerType.getDescription());
        return customerTypeDTO;
    }

    private CustomerType mapToEntity(final CustomerTypeDTO customerTypeDTO,
            final CustomerType customerType) {
        customerType.setCode(customerTypeDTO.getCode());
        customerType.setDescription(customerTypeDTO.getDescription());
        return customerType;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final CustomerType customerType = customerTypeRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Customer customerTypeCustomer = customerRepository.findFirstByCustomerType(customerType);
        if (customerTypeCustomer != null) {
            referencedWarning.setKey("customerType.customer.customerType.referenced");
            referencedWarning.addParam(customerTypeCustomer.getId());
            return referencedWarning;
        }
        return null;
    }

}
