package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Customer;
import wastecnologia.wapps.api.domain.CustomerOrder;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.model.CustomerOrderDTO;
import wastecnologia.wapps.api.repos.CustomerOrderRepository;
import wastecnologia.wapps.api.repos.CustomerRepository;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;

    public CustomerOrderService(final CustomerOrderRepository customerOrderRepository,
            final CustomerRepository customerRepository, final OrderRepository orderRepository) {
        this.customerOrderRepository = customerOrderRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
    }

    public List<CustomerOrderDTO> findAll() {
        final List<CustomerOrder> customerOrders = customerOrderRepository.findAll(Sort.by("id"));
        return customerOrders.stream()
                .map(customerOrder -> mapToDTO(customerOrder, new CustomerOrderDTO()))
                .toList();
    }

    public CustomerOrderDTO get(final UUID id) {
        return customerOrderRepository.findById(id)
                .map(customerOrder -> mapToDTO(customerOrder, new CustomerOrderDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final CustomerOrderDTO customerOrderDTO) {
        final CustomerOrder customerOrder = new CustomerOrder();
        mapToEntity(customerOrderDTO, customerOrder);
        return customerOrderRepository.save(customerOrder).getId();
    }

    public void update(final UUID id, final CustomerOrderDTO customerOrderDTO) {
        final CustomerOrder customerOrder = customerOrderRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(customerOrderDTO, customerOrder);
        customerOrderRepository.save(customerOrder);
    }

    public void delete(final UUID id) {
        customerOrderRepository.deleteById(id);
    }

    private CustomerOrderDTO mapToDTO(final CustomerOrder customerOrder,
            final CustomerOrderDTO customerOrderDTO) {
        customerOrderDTO.setId(customerOrder.getId());
        customerOrderDTO.setIsWapps(customerOrder.getIsWapps());
        customerOrderDTO.setIsPresidency(customerOrder.getIsPresidency());
        customerOrderDTO.setIsClient(customerOrder.getIsClient());
        customerOrderDTO.setIsDirector(customerOrder.getIsDirector());
        customerOrderDTO.setIsManager(customerOrder.getIsManager());
        customerOrderDTO.setCreatorId(customerOrder.getCreatorId());
        customerOrderDTO.setModifierId(customerOrder.getModifierId());
        customerOrderDTO.setDeleterId(customerOrder.getDeleterId());
        customerOrderDTO.setIsDeleted(customerOrder.getIsDeleted());
        customerOrderDTO.setCreatedAt(customerOrder.getCreatedAt());
        customerOrderDTO.setUpdatedAt(customerOrder.getUpdatedAt());
        customerOrderDTO.setDeletedAt(customerOrder.getDeletedAt());
        customerOrderDTO.setCustomer(customerOrder.getCustomer() == null ? null : customerOrder.getCustomer().getId());
        customerOrderDTO.setOrder(customerOrder.getOrder() == null ? null : customerOrder.getOrder().getId());
        return customerOrderDTO;
    }

    private CustomerOrder mapToEntity(final CustomerOrderDTO customerOrderDTO,
            final CustomerOrder customerOrder) {
        customerOrder.setIsWapps(customerOrderDTO.getIsWapps());
        customerOrder.setIsPresidency(customerOrderDTO.getIsPresidency());
        customerOrder.setIsClient(customerOrderDTO.getIsClient());
        customerOrder.setIsDirector(customerOrderDTO.getIsDirector());
        customerOrder.setIsManager(customerOrderDTO.getIsManager());
        customerOrder.setCreatorId(customerOrderDTO.getCreatorId());
        customerOrder.setModifierId(customerOrderDTO.getModifierId());
        customerOrder.setDeleterId(customerOrderDTO.getDeleterId());
        customerOrder.setIsDeleted(customerOrderDTO.getIsDeleted());
        customerOrder.setCreatedAt(customerOrderDTO.getCreatedAt());
        customerOrder.setUpdatedAt(customerOrderDTO.getUpdatedAt());
        customerOrder.setDeletedAt(customerOrderDTO.getDeletedAt());
        final Customer customer = customerOrderDTO.getCustomer() == null ? null : customerRepository.findById(customerOrderDTO.getCustomer())
                .orElseThrow(() -> new NotFoundException("customer not found"));
        customerOrder.setCustomer(customer);
        final Order order = customerOrderDTO.getOrder() == null ? null : orderRepository.findById(customerOrderDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        customerOrder.setOrder(order);
        return customerOrder;
    }

}
