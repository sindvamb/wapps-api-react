package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.entity.Order;
import wastecnologia.wapps.api.domain.entity.OrderTracking;
import wastecnologia.wapps.api.domain.dto.OrderTrackingDTO;
import wastecnologia.wapps.api.repository.OrderRepository;
import wastecnologia.wapps.api.repository.OrderTrackingRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class OrderTrackingService {

    private final OrderTrackingRepository orderTrackingRepository;
    private final OrderRepository orderRepository;

    public OrderTrackingService(final OrderTrackingRepository orderTrackingRepository,
            final OrderRepository orderRepository) {
        this.orderTrackingRepository = orderTrackingRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderTrackingDTO> findAll() {
        final List<OrderTracking> orderTrackings = orderTrackingRepository.findAll(Sort.by("id"));
        return orderTrackings.stream()
                .map(orderTracking -> mapToDTO(orderTracking, new OrderTrackingDTO()))
                .toList();
    }

    public OrderTrackingDTO get(final UUID id) {
        return orderTrackingRepository.findById(id)
                .map(orderTracking -> mapToDTO(orderTracking, new OrderTrackingDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderTrackingDTO orderTrackingDTO) {
        final OrderTracking orderTracking = new OrderTracking();
        mapToEntity(orderTrackingDTO, orderTracking);
        return orderTrackingRepository.save(orderTracking).getId();
    }

    public void update(final UUID id, final OrderTrackingDTO orderTrackingDTO) {
        final OrderTracking orderTracking = orderTrackingRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderTrackingDTO, orderTracking);
        orderTrackingRepository.save(orderTracking);
    }

    public void delete(final UUID id) {
        orderTrackingRepository.deleteById(id);
    }

    private OrderTrackingDTO mapToDTO(final OrderTracking orderTracking,
            final OrderTrackingDTO orderTrackingDTO) {
        orderTrackingDTO.setId(orderTracking.getId());
        orderTrackingDTO.setTrackDate(orderTracking.getTrackDate());
        orderTrackingDTO.setHistory(orderTracking.getHistory());
        orderTrackingDTO.setOrder(orderTracking.getOrder() == null ? null : orderTracking.getOrder().getId());
        return orderTrackingDTO;
    }

    private OrderTracking mapToEntity(final OrderTrackingDTO orderTrackingDTO,
            final OrderTracking orderTracking) {
        orderTracking.setTrackDate(orderTrackingDTO.getTrackDate());
        orderTracking.setHistory(orderTrackingDTO.getHistory());
        final Order order = orderTrackingDTO.getOrder() == null ? null : orderRepository.findById(orderTrackingDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderTracking.setOrder(order);
        return orderTracking;
    }

}
