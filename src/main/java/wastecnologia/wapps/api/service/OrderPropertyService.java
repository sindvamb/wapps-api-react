package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderProperty;
import wastecnologia.wapps.api.model.OrderPropertyDTO;
import wastecnologia.wapps.api.repos.OrderPropertyRepository;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class OrderPropertyService {

    private final OrderPropertyRepository orderPropertyRepository;
    private final OrderRepository orderRepository;

    public OrderPropertyService(final OrderPropertyRepository orderPropertyRepository,
            final OrderRepository orderRepository) {
        this.orderPropertyRepository = orderPropertyRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderPropertyDTO> findAll() {
        final List<OrderProperty> orderProperties = orderPropertyRepository.findAll(Sort.by("id"));
        return orderProperties.stream()
                .map(orderProperty -> mapToDTO(orderProperty, new OrderPropertyDTO()))
                .toList();
    }

    public OrderPropertyDTO get(final UUID id) {
        return orderPropertyRepository.findById(id)
                .map(orderProperty -> mapToDTO(orderProperty, new OrderPropertyDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderPropertyDTO orderPropertyDTO) {
        final OrderProperty orderProperty = new OrderProperty();
        mapToEntity(orderPropertyDTO, orderProperty);
        return orderPropertyRepository.save(orderProperty).getId();
    }

    public void update(final UUID id, final OrderPropertyDTO orderPropertyDTO) {
        final OrderProperty orderProperty = orderPropertyRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderPropertyDTO, orderProperty);
        orderPropertyRepository.save(orderProperty);
    }

    public void delete(final UUID id) {
        orderPropertyRepository.deleteById(id);
    }

    private OrderPropertyDTO mapToDTO(final OrderProperty orderProperty,
            final OrderPropertyDTO orderPropertyDTO) {
        orderPropertyDTO.setId(orderProperty.getId());
        orderPropertyDTO.setValue(orderProperty.getValue());
        orderPropertyDTO.setOrder(orderProperty.getOrder() == null ? null : orderProperty.getOrder().getId());
        return orderPropertyDTO;
    }

    private OrderProperty mapToEntity(final OrderPropertyDTO orderPropertyDTO,
            final OrderProperty orderProperty) {
        orderProperty.setValue(orderPropertyDTO.getValue());
        final Order order = orderPropertyDTO.getOrder() == null ? null : orderRepository.findById(orderPropertyDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderProperty.setOrder(order);
        return orderProperty;
    }

}
