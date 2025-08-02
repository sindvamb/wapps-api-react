package wastecnologia.wapps.api.service;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import wastecnologia.wapps.api.domain.FileControl;
import wastecnologia.wapps.api.domain.Order;
import wastecnologia.wapps.api.domain.OrderFileControl;
import wastecnologia.wapps.api.model.OrderFileControlDTO;
import wastecnologia.wapps.api.repos.FileControlRepository;
import wastecnologia.wapps.api.repos.OrderFileControlRepository;
import wastecnologia.wapps.api.repos.OrderRepository;
import wastecnologia.wapps.api.util.NotFoundException;


@Service
public class OrderFileControlService {

    private final OrderFileControlRepository orderFileControlRepository;
    private final FileControlRepository fileControlRepository;
    private final OrderRepository orderRepository;

    public OrderFileControlService(final OrderFileControlRepository orderFileControlRepository,
            final FileControlRepository fileControlRepository,
            final OrderRepository orderRepository) {
        this.orderFileControlRepository = orderFileControlRepository;
        this.fileControlRepository = fileControlRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderFileControlDTO> findAll() {
        final List<OrderFileControl> orderFileControls = orderFileControlRepository.findAll(Sort.by("id"));
        return orderFileControls.stream()
                .map(orderFileControl -> mapToDTO(orderFileControl, new OrderFileControlDTO()))
                .toList();
    }

    public OrderFileControlDTO get(final UUID id) {
        return orderFileControlRepository.findById(id)
                .map(orderFileControl -> mapToDTO(orderFileControl, new OrderFileControlDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public UUID create(final OrderFileControlDTO orderFileControlDTO) {
        final OrderFileControl orderFileControl = new OrderFileControl();
        mapToEntity(orderFileControlDTO, orderFileControl);
        return orderFileControlRepository.save(orderFileControl).getId();
    }

    public void update(final UUID id, final OrderFileControlDTO orderFileControlDTO) {
        final OrderFileControl orderFileControl = orderFileControlRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(orderFileControlDTO, orderFileControl);
        orderFileControlRepository.save(orderFileControl);
    }

    public void delete(final UUID id) {
        orderFileControlRepository.deleteById(id);
    }

    private OrderFileControlDTO mapToDTO(final OrderFileControl orderFileControl,
            final OrderFileControlDTO orderFileControlDTO) {
        orderFileControlDTO.setId(orderFileControl.getId());
        orderFileControlDTO.setFileControl(orderFileControl.getFileControl() == null ? null : orderFileControl.getFileControl().getId());
        orderFileControlDTO.setOrder(orderFileControl.getOrder() == null ? null : orderFileControl.getOrder().getId());
        return orderFileControlDTO;
    }

    private OrderFileControl mapToEntity(final OrderFileControlDTO orderFileControlDTO,
            final OrderFileControl orderFileControl) {
        final FileControl fileControl = orderFileControlDTO.getFileControl() == null ? null : fileControlRepository.findById(orderFileControlDTO.getFileControl())
                .orElseThrow(() -> new NotFoundException("fileControl not found"));
        orderFileControl.setFileControl(fileControl);
        final Order order = orderFileControlDTO.getOrder() == null ? null : orderRepository.findById(orderFileControlDTO.getOrder())
                .orElseThrow(() -> new NotFoundException("order not found"));
        orderFileControl.setOrder(order);
        return orderFileControl;
    }

}
