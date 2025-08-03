package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Company;
import wastecnologia.wapps.api.domain.entity.Customer;
import wastecnologia.wapps.api.domain.entity.CustomerOrder;
import wastecnologia.wapps.api.domain.entity.CustomerType;
import wastecnologia.wapps.api.domain.entity.Dependent;
import wastecnologia.wapps.api.domain.entity.EventCustomer;
import wastecnologia.wapps.api.domain.entity.PartnerUnit;
import wastecnologia.wapps.api.domain.entity.Ticket;
import wastecnologia.wapps.api.domain.entity.User;
import wastecnologia.wapps.api.domain.dto.CustomerDTO;
import wastecnologia.wapps.api.repository.CompanyRepository;
import wastecnologia.wapps.api.repository.CustomerOrderRepository;
import wastecnologia.wapps.api.repository.CustomerRepository;
import wastecnologia.wapps.api.repository.CustomerTypeRepository;
import wastecnologia.wapps.api.repository.DependentRepository;
import wastecnologia.wapps.api.repository.EventCustomerRepository;
import wastecnologia.wapps.api.repository.PartnerUnitRepository;
import wastecnologia.wapps.api.repository.TicketRepository;
import wastecnologia.wapps.api.repository.UserRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerTypeRepository customerTypeRepository;
    private final PartnerUnitRepository partnerUnitRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final CustomerOrderRepository customerOrderRepository;
    private final DependentRepository dependentRepository;
    private final EventCustomerRepository eventCustomerRepository;
    private final TicketRepository ticketRepository;

    public CustomerService(final CustomerRepository customerRepository,
            final CustomerTypeRepository customerTypeRepository,
            final PartnerUnitRepository partnerUnitRepository, final UserRepository userRepository,
            final CompanyRepository companyRepository,
            final CustomerOrderRepository customerOrderRepository,
            final DependentRepository dependentRepository,
            final EventCustomerRepository eventCustomerRepository,
            final TicketRepository ticketRepository) {
        this.customerRepository = customerRepository;
        this.customerTypeRepository = customerTypeRepository;
        this.partnerUnitRepository = partnerUnitRepository;
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
        this.customerOrderRepository = customerOrderRepository;
        this.dependentRepository = dependentRepository;
        this.eventCustomerRepository = eventCustomerRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<CustomerDTO> findAll() {
        final List<Customer> customers = customerRepository.findAll(Sort.by("id"));
        return customers.stream()
                .map(customer -> mapToDTO(customer, new CustomerDTO()))
                .toList();
    }

    public CustomerDTO get(final UUID id) {
        return customerRepository.findById(id)
                .map(customer -> mapToDTO(customer, new CustomerDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CustomerDTO customerDTO) {
        final Customer customer = new Customer();
        mapToEntity(customerDTO, customer);
        return customerRepository.save(customer).getId();
    }

    public void update(final UUID id, final CustomerDTO customerDTO) {
        final Customer customer = customerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(customerDTO, customer);
        customerRepository.save(customer);
    }

    public void delete(final UUID id) {
        customerRepository.deleteById(id);
    }

    private CustomerDTO mapToDTO(final Customer customer, final CustomerDTO customerDTO) {
        customerDTO.setId(customer.getId());
        customerDTO.setCreatorId(customer.getCreatorId());
        customerDTO.setModifierId(customer.getModifierId());
        customerDTO.setDeleterId(customer.getDeleterId());
        customerDTO.setIsDeleted(customer.getIsDeleted());
        customerDTO.setCreatedAt(customer.getCreatedAt());
        customerDTO.setUpdatedAt(customer.getUpdatedAt());
        customerDTO.setDeletedAt(customer.getDeletedAt());
        customerDTO.setCompanyId(customer.getCompanyId());
        customerDTO.setCustomerType(customer.getCustomerType() == null ? null : customer.getCustomerType().getId());
        customerDTO.setPartnerUnit(customer.getPartnerUnit() == null ? null : customer.getPartnerUnit().getId());
        customerDTO.setUser(customer.getUser() == null ? null : customer.getUser().getId());
        return customerDTO;
    }

    private Customer mapToEntity(final CustomerDTO customerDTO, final Customer customer) {
        customer.setCreatorId(customerDTO.getCreatorId());
        customer.setModifierId(customerDTO.getModifierId());
        customer.setDeleterId(customerDTO.getDeleterId());
        customer.setIsDeleted(customerDTO.getIsDeleted());
        customer.setCreatedAt(customerDTO.getCreatedAt());
        customer.setUpdatedAt(customerDTO.getUpdatedAt());
        customer.setDeletedAt(customerDTO.getDeletedAt());
        customer.setCompanyId(customerDTO.getCompanyId());
        final CustomerType customerType = customerDTO.getCustomerType() == null ? null : customerTypeRepository.findById(customerDTO.getCustomerType())
                .orElseThrow(() -> new NotFoundException("customerType not found"));
        customer.setCustomerType(customerType);
        final PartnerUnit partnerUnit = customerDTO.getPartnerUnit() == null ? null : partnerUnitRepository.findById(customerDTO.getPartnerUnit())
                .orElseThrow(() -> new NotFoundException("partnerUnit not found"));
        customer.setPartnerUnit(partnerUnit);
        final User user = customerDTO.getUser() == null ? null : userRepository.findById(customerDTO.getUser())
                .orElseThrow(() -> new NotFoundException("user not found"));
        customer.setUser(user);
        return customer;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final Customer customer = customerRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Company customerCompany = companyRepository.findFirstByCustomer(customer);
        if (customerCompany != null) {
            referencedWarning.setKey("customer.company.customer.referenced");
            referencedWarning.addParam(customerCompany.getId());
            return referencedWarning;
        }
        final CustomerOrder customerCustomerOrder = customerOrderRepository.findFirstByCustomer(customer);
        if (customerCustomerOrder != null) {
            referencedWarning.setKey("customer.customerOrder.customer.referenced");
            referencedWarning.addParam(customerCustomerOrder.getId());
            return referencedWarning;
        }
        final Dependent customerDependent = dependentRepository.findFirstByCustomer(customer);
        if (customerDependent != null) {
            referencedWarning.setKey("customer.dependent.customer.referenced");
            referencedWarning.addParam(customerDependent.getId());
            return referencedWarning;
        }
        final EventCustomer customerEventCustomer = eventCustomerRepository.findFirstByCustomer(customer);
        if (customerEventCustomer != null) {
            referencedWarning.setKey("customer.eventCustomer.customer.referenced");
            referencedWarning.addParam(customerEventCustomer.getId());
            return referencedWarning;
        }
        final Ticket customerTicket = ticketRepository.findFirstByCustomer(customer);
        if (customerTicket != null) {
            referencedWarning.setKey("customer.ticket.customer.referenced");
            referencedWarning.addParam(customerTicket.getId());
            return referencedWarning;
        }
        return null;
    }

}
