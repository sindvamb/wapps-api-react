package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderStatus;
import wastecnologia.wapps.api.model.OrderStatusDTO;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.repos.OrderStatusRepository;
import wastecnologia.wapps.api.util.NotFoundException;
import wastecnologia.wapps.api.util.ReferencedWarning;


@Service
public class OrderStatusService {

    private final OrderStatusRepository orderStatusRepository;
    private final OrderRepository orderRepository;

    public OrderStatusService(final OrderStatusRepository orderStatusRepository,
            final OrderRepository orderRepository) {
        this.orderStatusRepository = orderStatusRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderStatusDTO> findAll() {
        final List<OrderStatus> orderStatuses = orderStatusRepository.findAll(Sort.by("id"));
        return orderStatuses.stream()
                .map(orderStatus -> mapToDTO(orderStatus, new OrderStatusDTO()))
                .toList();
    }

    public OrderStatusDTO get(final UUID id) {
        return orderStatusRepository.findById(id)
                .map(orderStatus -> mapToDTO(orderStatus, new OrderStatusDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderStatusDTO orderStatusDTO) {
        final OrderStatus orderStatus = new OrderStatus();
        mapToEntity(orderStatusDTO, orderStatus);
        return orderStatusRepository.save(orderStatus).getId();
    }

    public void update(final UUID id, final OrderStatusDTO orderStatusDTO) {
        final OrderStatus orderStatus = orderStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderStatusDTO, orderStatus);
        orderStatusRepository.save(orderStatus);
    }

    public void delete(final UUID id) {
        orderStatusRepository.deleteById(id);
    }

    private OrderStatusDTO mapToDTO(final OrderStatus orderStatus,
            final OrderStatusDTO orderStatusDTO) {
        orderStatusDTO.setId(orderStatus.getId());
        orderStatusDTO.setCode(orderStatus.getCode());
        orderStatusDTO.setDescription(orderStatus.getDescription());
        return orderStatusDTO;
    }

    private OrderStatus mapToEntity(final OrderStatusDTO orderStatusDTO,
            final OrderStatus orderStatus) {
        orderStatus.setCode(orderStatusDTO.getCode());
        orderStatus.setDescription(orderStatusDTO.getDescription());
        return orderStatus;
    }

    public ReferencedWarning getReferencedWarning(final UUID id) {
        final ReferencedWarning referencedWarning = new ReferencedWarning();
        final OrderStatus orderStatus = orderStatusRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        final Order orderStatusOrder = orderRepository.findFirstByOrderStatus(orderStatus);
        if (orderStatusOrder != null) {
            referencedWarning.setKey("orderStatus.order.orderStatus.referenced");
            referencedWarning.addParam(orderStatusOrder.getId());
            return referencedWarning;
        }
        return null;
    }

}
